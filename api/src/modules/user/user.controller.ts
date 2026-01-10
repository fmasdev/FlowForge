import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  ClassSerializerInterceptor,
  UseGuards,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdatePasswordDto } from '@/modules/user/dto/update-password.dto';
import { UpdateEmailDto } from '@/modules/user/dto/update-email.dto';
import { RolesGuard } from '@/common/guards/roles.guard';
import { JwtAuthGuard } from '@/modules/auth/auth.guard';
import { User } from '@/modules/user/entities/user.entity';
import { Request } from 'express';
import { AuthUserType } from '@/common/types/auth-user.type';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('user')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.userService.create(createUserDto);
  }

  @Get()
  async findAll(): Promise<User[]> {
    return await this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User | null> {
    return await this.userService.findOneById(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return await this.userService.update(id, updateUserDto);
  }

  @Patch('/password')
  async updatePassword(
    @Body() updatePasswordDto: UpdatePasswordDto,
    @Req() req: Request,
  ): Promise<User> {
    if (!req.user) {
      throw new UnauthorizedException('User not authenticated');
    }
    const user = req.user as AuthUserType;
    return await this.userService.updatePassword(user.id, updatePasswordDto);
  }

  @Patch('/email')
  async updateEmail(
    @Body() updateEmailDto: UpdateEmailDto,
    @Req() req: Request,
  ): Promise<User> {
    if (!req.user) {
      throw new UnauthorizedException('User not authenticated');
    }
    const user = req.user as AuthUserType;
    return await this.userService.updateEmail(user.id, updateEmailDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Req() req: Request) {
    if (!req.user) {
      throw new UnauthorizedException('User not authenticated');
    }
    const actor = req.user as AuthUserType;
    return await this.userService.remove(id, actor);
  }
}
