import { IsEmail, IsNotEmpty } from 'class-validator';

export class ConnexionDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}
