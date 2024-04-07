import { Injectable, NotFoundException } from '@nestjs/common';
import { Currency } from 'src/entities/currency.entity';

@Injectable()
export class CurrencyGetService {
  getAll() {
    return Currency.find();
  }

  async getById(id: number) {
    const currency = await Currency.findOne({ where: { id } });
    if (!currency) {
      throw new NotFoundException(Currency.name + ' does not exist');
    }

    return currency;
  }
}
