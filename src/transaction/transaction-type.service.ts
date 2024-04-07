import { Injectable, NotFoundException } from '@nestjs/common';
import { TransactionType } from 'src/entities/transaction-type.entity';
import { CreateTransactionTypeDto } from './dtos/transaction-type-create.dto';

@Injectable()
export class TransactionTypeService {
  getAll() {
    return TransactionType.find();
  }

  async getById(id: number) {
    const entry = await TransactionType.findOne({ where: { id } });
    if (!entry) {
      throw new NotFoundException(TransactionType.name + ' does not exist');
    }

    return entry;
  }

  async create(
    createAccountTypeDto: CreateTransactionTypeDto,
  ): Promise<TransactionType> {
    const { name } = createAccountTypeDto;

    const exists = await TransactionType.exists({ where: { name } });
    if (exists) {
      throw new Error(TransactionType.name + ' already exists');
    }

    return TransactionType.save(TransactionType.create({ name }));
  }
}
