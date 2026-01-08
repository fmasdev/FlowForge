import { IsEmail, IsString, MinLength } from 'class-validator';

export class UpdateEmailDto {
  @IsEmail()
  oldEmail: string;

  @IsEmail()
  newEmail: string;

  @IsString()
  @MinLength(6)
  password: string;
}
