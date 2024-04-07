import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { TransactionGetService } from './transaction-get.service';
import { TransactionCreateService } from './transaction-create.service';
import { TransactionTypeService } from './transaction-type.service';
import { CreateTransactionTypeDto } from './dtos/transaction-type-create.dto';
import { CreateTransactionDto } from './dtos/transaction-create.dto';
import { GetTransactionsByAccountDto } from './dtos/transaction-get.dto';

@Controller('transaction')
export class TransactionController {
  constructor(
    private accountGetService: TransactionGetService,
    private accountCreateService: TransactionCreateService,
    private accountTypeService: TransactionTypeService,
  ) {}
  @Get('type')
  getTransactionTypes() {
    return this.accountTypeService.getAll();
  }

  @Get('type/:id')
  getTransactionType(@Param('id', ParseIntPipe) id: number) {
    return this.accountTypeService.getById(id);
  }

  @Get(':id')
  getTransaction(@Param('id', ParseIntPipe) id: number) {
    return this.accountGetService.getById(id);
  }

  @Get('account/:accountId/type/:transactionPersonType')
  getTransactionByAccount(
    @Param() getTransactionsByAccountDto: GetTransactionsByAccountDto,
  ) {
    return this.accountGetService.getByAccount(getTransactionsByAccountDto);
  }

  @Post()
  createTransaction(@Body() createTransactionDto: CreateTransactionDto) {
    return this.accountCreateService.create(createTransactionDto);
  }

  @Post('type')
  createTransactionType(@Body() createCurrencyDto: CreateTransactionTypeDto) {
    return this.accountTypeService.create(createCurrencyDto);
  }
}
