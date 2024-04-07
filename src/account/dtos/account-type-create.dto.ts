import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAccountTypeDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
