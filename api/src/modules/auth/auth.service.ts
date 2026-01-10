import { User } from '@/modules/user/entities/user.entity';
import { UserService } from '@/modules/user/user.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

export interface JwtUserPayload {
  sub: string;
  email: string;
  role: string;
  firstname: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) { }

  async login(email: string, password: string) {

    const user: User | null = await this.userService.findByEmail(email);

    if (!user)
      throw new UnauthorizedException('Invalid email password association');

    const isValid = await bcrypt.compare(password, user.passwordHash);
    if (!isValid)
      throw new UnauthorizedException('Invalid email password association');

    const payload: JwtUserPayload = {
      sub: user.id,
      email: user.email,
      role: user.role,
      firstname: user.firstname
    };

    return await this.jwtService.signAsync(payload);
  }
}
