import { Transform } from 'class-transformer';
import { IsEnum, IsInt, IsPositive } from 'class-validator';
import { TRANSACTION_PERSON_TYPE } from 'src/libs/enum';

export class GetTransactionsByAccountDto {
  @IsEnum(TRANSACTION_PERSON_TYPE)
  transactionPersonType: TRANSACTION_PERSON_TYPE;

  @IsPositive()
  @IsInt()
  @Transform(({ value }) => value && +value)
  accountId: number;
}
