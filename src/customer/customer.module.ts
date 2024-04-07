import { Module } from '@nestjs/common';
import { CustomerController } from './customer.controller';
import { CustomerGetService } from './customer-get.service';
import { CustomerCreateService } from './customer-create.service';

@Module({
  controllers: [CustomerController],
  providers: [CustomerGetService, CustomerCreateService],
  exports: [CustomerGetService],
})
export class CustomerModule {}
