import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { CustomerCreateService } from './customer-create.service';
import { CreateCustomerDto } from './dtos/customer-create.dto';
import { CustomerGetService } from './customer-get.service';

@Controller('customer')
export class CustomerController {
  constructor(
    private customerGetService: CustomerGetService,
    private customerCreateService: CustomerCreateService,
  ) {}

  @Get()
  getCustomers() {
    return this.customerGetService.getAll();
  }

  @Get(':id')
  getCustomer(@Param('id', ParseIntPipe) id: number) {
    return this.customerGetService.getById(id);
  }

  @Post()
  createCustomer(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customerCreateService.create(createCustomerDto);
  }
}
