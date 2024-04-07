import {
  IsInt,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Min,
} from 'class-validator';

export class CreateTransactionDto {
  @IsPositive()
  @IsInt()
  transactionTypeId: number;

  @IsPositive()
  @IsInt()
  customerId: number;

  @IsPositive()
  @IsInt()
  remitterAccountId: number;

  @IsPositive()
  @IsInt()
  recipientAccountId: number;

  @IsPositive()
  @IsInt()
  currencyId: number;

  @IsNumber()
  @Min(0)
  amount: number;

  @IsString()
  @IsOptional()
  content: string;
}
