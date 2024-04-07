import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dtos/customer-create.dto';
import { Customer } from 'src/entities/customer.entity';

@Injectable()
export class CustomerCreateService {
  async create(createCustomerDto: CreateCustomerDto) {
    const { email, fullName, phone, username, password } = createCustomerDto;

    const exists = await Customer.findOne({
      where: [{ email }, { phone }, { username }],
    });

    if (exists) {
      if (exists.email === email) {
        throw new BadRequestException(`Email '${email}' already exists`);
      }
      if (exists.phone === phone) {
        throw new BadRequestException(`Phone '${phone}' already exists`);
      }
      throw new BadRequestException(`Username '${username}' already exists`);
    }

    return Customer.save(
      Customer.create({ email, fullName, phone, username, password }),
    );
  }
}
