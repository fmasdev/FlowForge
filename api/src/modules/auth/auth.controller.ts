import { User } from '@/common/decorators/user.decorator';
import { JwtAuthGuard } from '@/modules/auth/auth.guard';
import { AuthService, JwtUserPayload } from '@/modules/auth/auth.service';
import { LoginDto } from '@/modules/auth/dto/login.dto';
import { RegisterDto } from '@/modules/auth/dto/register.dto';
import { UserService } from '@/modules/user/user.service';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private readonly userService: UserService,
  ) { }

  @Post('register')
  async create(@Body() registerDto: RegisterDto): Promise<{message: string}> {
    await this.userService.create(registerDto)
    return { message: 'User created successfully' };
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async logIn(
    @Res({ passthrough: true }) res: Response,
    @Body() loginDto: LoginDto,
  ): Promise<{ message: string }> {
    const token = await this.authService.login(
      loginDto.email,
      loginDto.password,
    );

    res.cookie('access_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      maxAge: 1000 * 60 * 60 * 24, // 1 day
      path: '/',
    });

    return {
      message: 'Logged successfully',
    };
  }

  @Post('logout')
  async logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('access_token', {
      path: '/',
    });

    return { message: 'Logged out successfully' };
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getMe(@User() user: JwtUserPayload) {
    return user;
  }
}
