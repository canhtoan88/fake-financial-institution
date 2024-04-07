import { IsInt, IsNumber, IsPositive, Min } from 'class-validator';

export class CreateAccountDto {
  @IsPositive()
  @IsInt()
  customerId: number;

  @IsPositive()
  @IsInt()
  currencyId: number;

  @IsPositive()
  @IsInt()
  accountTypeId: number;

  @IsNumber()
  @Min(0)
  balance: number;
}
