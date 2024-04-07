import { Injectable } from '@nestjs/common';
import { CreateCurrencyDto } from './dtos/currency.create.dto';
import { Currency } from 'src/entities/currency.entity';

@Injectable()
export class CurrencyCreateService {
  async create(createCurrencyDto: CreateCurrencyDto): Promise<Currency> {
    const { name, shortName, symbol } = createCurrencyDto;

    const exists = await Currency.exists({ where: { name } });
    if (exists) {
      throw new Error(Currency.name + ' already exists');
    }

    return Currency.save(Currency.create({ name, shortName, symbol }));
  }
}
