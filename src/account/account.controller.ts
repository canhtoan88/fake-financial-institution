import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { AccountGetService } from './account-get.service';
import { AccountCreateService } from './account-create.service';
import { AccountTypeService } from './account-type.service';
import { CreateAccountTypeDto } from './dtos/account-type-create.dto';
import { CreateAccountDto } from './dtos/account-create.dto';

@Controller('account')
export class AccountController {
  constructor(
    private accountGetService: AccountGetService,
    private accountCreateService: AccountCreateService,
    private accountTypeService: AccountTypeService,
  ) {}
  @Get('type')
  getAccountTypes() {
    return this.accountTypeService.getAll();
  }

  @Get('type/:id')
  getAccountType(@Param('id', ParseIntPipe) id: number) {
    return this.accountTypeService.getById(id);
  }

  @Get(':id')
  getAccount(@Param('id', ParseIntPipe) id: number) {
    return this.accountGetService.getById(id);
  }

  @Get(':id/balance')
  getAccountBalance(@Param('id', ParseIntPipe) id: number) {
    return this.accountGetService.getAccountBalance(id);
  }

  @Post()
  createAccount(@Body() createAccountDto: CreateAccountDto) {
    return this.accountCreateService.create(createAccountDto);
  }

  @Post('type')
  createAccountType(@Body() createCurrencyDto: CreateAccountTypeDto) {
    return this.accountTypeService.create(createCurrencyDto);
  }
}
