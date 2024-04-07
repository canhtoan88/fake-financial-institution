import { Injectable, NotFoundException } from '@nestjs/common';
import { AccountType } from 'src/entities/account-type.entity';
import { CreateAccountTypeDto } from './dtos/account-type-create.dto';

@Injectable()
export class AccountTypeService {
  getAll() {
    return AccountType.find();
  }

  async getById(id: number) {
    const accountType = await AccountType.findOne({ where: { id } });
    if (!accountType) {
      throw new NotFoundException(AccountType.name + ' does not exist');
    }

    return accountType;
  }

  async create(
    createAccountTypeDto: CreateAccountTypeDto,
  ): Promise<AccountType> {
    const { name } = createAccountTypeDto;

    const exists = await AccountType.exists({ where: { name } });
    if (exists) {
      throw new Error(AccountType.name + ' already exists');
    }

    return AccountType.save(AccountType.create({ name }));
  }
}
