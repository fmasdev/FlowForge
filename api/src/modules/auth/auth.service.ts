import { User } from '@/modules/user/entities/user.entity';
import { UserService } from '@/modules/user/user.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

export interface SignInType {
  access_token: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(email: string, password: string): Promise<SignInType> {
    const user: User | null = await this.userService.findOne(email);
    if (!user)
      throw new UnauthorizedException('Invalid email password association');

    const isValid = await bcrypt.compare(password, user.passwordHash);
    if (!isValid)
      throw new UnauthorizedException('Invalid email password association');

    const payload = {
      sub: user.id,
      user: user,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
