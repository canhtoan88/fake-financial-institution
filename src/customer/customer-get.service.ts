import { Injectable, NotFoundException } from '@nestjs/common';
import { Customer } from 'src/entities/customer.entity';

@Injectable()
export class CustomerGetService {
  getAll() {
    return Customer.find();
  }

  async getById(id: number) {
    const customer = await Customer.findOne({
      where: { id },
      relations: { accounts: { accountType: true } },
    });
    if (!customer) {
      throw new NotFoundException(Customer.name + ' does not exist');
    }

    return customer;
  }
}
