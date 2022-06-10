import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class InscriptionDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;
}
