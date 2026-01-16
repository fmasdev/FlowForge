import { Match } from '@/modules/user/validators/match.validator';
import {
  IsEmail,
  IsOptional,
  IsString,
  Matches,
  MinLength,
  ValidateIf,
} from 'class-validator';

export class RegisterDto {
  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(8)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/, {
    message: 'Password must contain at least 8 chars, 1 uppercase, 1 lowercase and 1 number',
  })
  password!: string;

  @IsString()
  @MinLength(8)
  @Match('password', { 
    message: 'Passwords must match' 
  })
  confirmPassword!: string;

  @IsString()
  @MinLength(2)
  firstname!: string;

  @IsString()
  @MinLength(2)
  lastname!: string;
}