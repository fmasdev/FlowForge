import { Match } from '@/modules/user/validators/match.validator';
import { IsString, MinLength } from 'class-validator';

export class UpdatePasswordDto {
  @IsString()
  @MinLength(6)
  currentPassword!: string;

  @IsString()
  @MinLength(6)
  newPassword!: string;

  @IsString()
  @MinLength(6)
  @Match('newPassword', { message: 'Passwords must match' })
  confirmNewPassword!: string;
}
