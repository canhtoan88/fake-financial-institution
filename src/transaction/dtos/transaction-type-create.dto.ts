import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTransactionTypeDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
