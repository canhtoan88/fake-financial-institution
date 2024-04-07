import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { CurrencyCreateService } from './currency-create.service';
import { CurrencyGetService } from './currency-get.service';
import { CreateCurrencyDto } from './dtos/currency.create.dto';

@Controller('currency')
export class CurrencyController {
  constructor(
    private currencyGetService: CurrencyGetService,
    private currencyCreateService: CurrencyCreateService,
  ) {}

  @Get()
  getAllCurrency() {
    return this.currencyGetService.getAll();
  }

  @Get(':id')
  getDetailCurrency(@Param('id', ParseIntPipe) id: number) {
    return this.currencyGetService.getById(id);
  }

  @Post()
  createCurrency(@Body() createCurrencyDto: CreateCurrencyDto) {
    return this.currencyCreateService.create(createCurrencyDto);
  }
}
