import { Match } from '@/modules/user/validators/match.validator';
import {
  IsEmail,
  IsOptional,
  IsString,
  MinLength,
  ValidateIf,
} from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(6)
  password!: string;

  @IsString()
  @MinLength(6)
  @Match('password', { message: 'Passwords must match' })
  confirmPassword!: string;

  @IsString()
  firstname!: string;

  @IsString()
  lastname!: string;

  @IsOptional()
  @ValidateIf((_, value) => value !== null)
  @IsString()
  role!: string | null;
}
