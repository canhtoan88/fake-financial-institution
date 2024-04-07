import {
  BaseEntity,
  BeforeInsert,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Currency extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  shortName: string;

  @Column({ type: 'varchar' })
  symbol: string;

  @BeforeInsert()
  onBeforeInsert() {
    !this.shortName && (this.shortName = this.name);
  }
}
