import {
  AfterLoad,
  BaseEntity,
  Check,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Customer } from './customer.entity';
import { AccountType } from './account-type.entity';
import { Currency } from './currency.entity';

@Entity()
@Check('CHK_ENOUGH_ACCOUNT_BALANCE', 'balance >= 0')
export class Account extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'numeric', precision: 20, scale: 2, default: 0 })
  balance: number;

  @ManyToOne(() => Currency, { nullable: false, onDelete: 'RESTRICT' })
  currency: Currency;

  @ManyToOne(() => AccountType, { nullable: false, onDelete: 'RESTRICT' })
  accountType: AccountType;

  @ManyToOne(() => Customer, { nullable: false, onDelete: 'RESTRICT' })
  customer: Customer;

  @AfterLoad()
  onAfterLoad() {
    this.balance !== undefined && (this.balance = +this.balance);
  }
}
