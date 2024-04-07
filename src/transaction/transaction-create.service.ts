import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CustomerGetService } from 'src/customer/customer-get.service';
import { AccountGetService } from 'src/account/account-get.service';
import { TransactionTypeService } from './transaction-type.service';
import { CurrencyGetService } from 'src/currency/currency-get.service';
import { CreateTransactionDto } from './dtos/transaction-create.dto';
import { Transaction } from 'src/entities/transaction.entity';
import { DataSource } from 'typeorm';
import { Account } from 'src/entities/account.entity';
import { TRANSACTION_STATUS } from 'src/libs/enum';

@Injectable()
export class TransactionCreateService {
  constructor(
    private dataSource: DataSource,
    private customerGetService: CustomerGetService,
    private accountGetServcie: AccountGetService,
    private transactionTypeService: TransactionTypeService,
    private currencyGetService: CurrencyGetService,
  ) {}
  async create(createTransactionDto: CreateTransactionDto) {
    const {
      amount,
      content,
      currencyId,
      customerId,
      recipientAccountId,
      remitterAccountId,
      transactionTypeId,
    } = createTransactionDto;

    if (recipientAccountId === remitterAccountId) {
      throw new BadRequestException(
        'Receiver and sender accounts cannot be the same',
      );
    }

    const customer = await this.customerGetService.getById(customerId);
    const remitterAccount = customer.accounts.find(
      ({ id }) => id === remitterAccountId,
    );
    if (!remitterAccount) {
      throw new NotFoundException('Sender account does not exists');
    }

    // Check to ensure there is enough amount in the transferor's account
    if (remitterAccount.balance < amount) {
      throw new BadRequestException('Insufficient amount');
    }

    const recipientAccount = await this.accountGetServcie.getById(
      recipientAccountId,
      'ReceiverAccount',
    );

    const transactionType =
      await this.transactionTypeService.getById(transactionTypeId);
    const currency = await this.currencyGetService.getById(currencyId);

    const transaction = Transaction.create({
      amount,
      content,
      recipientAccount,
      remitterAccount,
      transactionType,
      currency,
    });
    await transaction.save();

    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await queryRunner.manager
        .createQueryBuilder()
        .update(Account)
        .set({ balance: () => 'balance - ' + amount })
        .where({ id: remitterAccount.id })
        .execute();

      await queryRunner.manager
        .createQueryBuilder()
        .update(Account)
        .set({ balance: () => 'balance + ' + amount })
        .where({ id: recipientAccount.id })
        .execute();

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      await Transaction.update(
        { id: transaction.id },
        { status: TRANSACTION_STATUS.CANCELLED },
      );

      if (error.message.includes('check constraint "CHK_ENOUGH_BALANCE"')) {
        throw new BadRequestException('Insufficient amount');
      }

      throw new BadRequestException({
        statusCode: 400,
        message: error.message,
        detail: error.detail,
      });
    } finally {
      await queryRunner.release();
    }

    transaction.status = TRANSACTION_STATUS.SUCCESSFUL;
    await Transaction.update(
      { id: transaction.id },
      { status: transaction.status },
    );

    return transaction;
  }
}
