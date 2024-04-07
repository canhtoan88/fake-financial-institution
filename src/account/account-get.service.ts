import { Injectable, NotFoundException } from '@nestjs/common';
import { Account } from 'src/entities/account.entity';

@Injectable()
export class AccountGetService {
  async getById(id: number, entryName = Account.name): Promise<Account> {
    const account = await Account.findOne({
      where: { id },
      relations: { accountType: true },
    });
    if (!account) {
      throw new NotFoundException(entryName + ' does not exist');
    }

    return account;
  }

  async getAccountBalance(id: number): Promise<{ balance: number }> {
    const account = await this.getById(id);

    return { balance: account.balance };
  }
}
