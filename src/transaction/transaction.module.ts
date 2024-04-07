import { Module } from '@nestjs/common';
import { CustomerModule } from 'src/customer/customer.module';
import { AccountModule } from 'src/account/account.module';
import { CurrencyModule } from 'src/currency/currency.module';
import { TransactionController } from './transaction.controller';
import { TransactionGetService } from './transaction-get.service';
import { TransactionCreateService } from './transaction-create.service';
import { TransactionTypeService } from './transaction-type.service';

@Module({
  imports: [CustomerModule, AccountModule, CurrencyModule],
  controllers: [TransactionController],
  providers: [
    TransactionGetService,
    TransactionCreateService,
    TransactionTypeService,
  ],
})
export class TransactionModule {}
