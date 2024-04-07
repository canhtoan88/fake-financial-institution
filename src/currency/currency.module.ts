import { Module } from '@nestjs/common';
import { CurrencyController } from './currency.controller';
import { CurrencyGetService } from './currency-get.service';
import { CurrencyCreateService } from './currency-create.service';

@Module({
  controllers: [CurrencyController],
  providers: [CurrencyGetService, CurrencyCreateService],
  exports: [CurrencyGetService],
})
export class CurrencyModule {}
