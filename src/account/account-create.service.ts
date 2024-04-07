import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAccountDto } from './dtos/account-create.dto';
import { CustomerGetService } from 'src/customer/customer-get.service';
import { AccountTypeService } from './account-type.service';
import { CurrencyGetService } from 'src/currency/currency-get.service';
import { Account } from 'src/entities/account.entity';

@Injectable()
export class AccountCreateService {
  constructor(
    private customerGetService: CustomerGetService,
    private accountTypeService: AccountTypeService,
    private currencyGetService: CurrencyGetService,
  ) {}

  async create(createAccountDto: CreateAccountDto) {
    const { accountTypeId, balance, currencyId, customerId } = createAccountDto;

    const customer = await this.customerGetService.getById(customerId);
    const accountType = await this.accountTypeService.getById(accountTypeId);
    const currency = await this.currencyGetService.getById(currencyId);

    const exists = await Account.exists({
      where: {
        customer: { id: customerId },
        accountType: { id: accountTypeId },
        currency: { id: currencyId },
      },
    });

    if (exists) {
      throw new BadRequestException('Account already exists');
    }

    return Account.save(
      Account.create({ customer, accountType, currency, balance }),
    );
  }
}
