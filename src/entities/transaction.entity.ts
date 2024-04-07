import {
  AfterLoad,
  BaseEntity,
  Check,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TransactionType } from './transaction-type.entity';
import { Account } from './account.entity';
import { Currency } from './currency.entity';
import { TRANSACTION_STATUS } from 'src/libs/enum';

@Entity()
@Check('CHK_POSITIVE_TRANSACTION_AMOUNT', 'amount > 0')
export class Transaction extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => TransactionType, { nullable: false, onDelete: 'RESTRICT' })
  transactionType: TransactionType;

  @ManyToOne(() => Account, { nullable: false, onDelete: 'RESTRICT' })
  remitterAccount: Account;

  @ManyToOne(() => Account, { nullable: false, onDelete: 'RESTRICT' })
  recipientAccount: Account;

  @Column({
    type: 'enum',
    enum: TRANSACTION_STATUS,
    default: TRANSACTION_STATUS.PENDING,
  })
  status: TRANSACTION_STATUS;

  @Column({ type: 'numeric', precision: 20, scale: 2 })
  amount: number;

  @Column({ type: 'numeric', precision: 10, scale: 2, default: 0 })
  fee: number;

  @ManyToOne(() => Currency, { nullable: false, onDelete: 'RESTRICT' })
  currency: Currency;

  @Column({ type: 'varchar', default: '' })
  content: string;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;

  @AfterLoad()
  onAfterLoad() {
    this.amount !== undefined && (this.amount = +this.amount);
    this.fee !== undefined && (this.fee = +this.fee);
  }
}
