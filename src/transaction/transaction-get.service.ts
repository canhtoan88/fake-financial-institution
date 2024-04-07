import { Injectable, NotFoundException } from '@nestjs/common';
import { AccountGetService } from 'src/account/account-get.service';
import { Transaction } from 'src/entities/transaction.entity';
import { GetTransactionsByAccountDto } from './dtos/transaction-get.dto';

@Injectable()
export class TransactionGetService {
  constructor(private accountGetServcie: AccountGetService) {}
  async getById(id: number): Promise<Transaction> {
    const transaction = await Transaction.findOne({ where: { id } });
    if (!transaction) {
      throw new NotFoundException(Transaction.name + ' does not exist');
    }

    return transaction;
  }

  async getByAccount(getTransactionsByAccountDto: GetTransactionsByAccountDto) {
    const { accountId, transactionPersonType } = getTransactionsByAccountDto;
    const account = await this.accountGetServcie.getById(accountId);

    return Transaction.find({
      where: { [`${transactionPersonType}Account`]: { id: account.id } },
    });
  }
}
