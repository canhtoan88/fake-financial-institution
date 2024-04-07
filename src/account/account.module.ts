import { Module } from '@nestjs/common';
import { CurrencyModule } from 'src/currency/currency.module';
import { CustomerModule } from 'src/customer/customer.module';
import { AccountController } from './account.controller';
import { AccountGetService } from './account-get.service';
import { AccountCreateService } from './account-create.service';
import { AccountTypeService } from './account-type.service';

@Module({
  imports: [CustomerModule, CurrencyModule],
  controllers: [AccountController],
  providers: [AccountGetService, AccountCreateService, AccountTypeService],
  exports: [AccountGetService],
})
export class AccountModule {}
