import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcryptjs';
import { User } from '@/modules/user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { UpdatePasswordDto } from '@/modules/user/dto/update-password.dto';
import { UpdateResult } from 'typeorm/browser';
import { UpdateEmailDto } from '@/modules/user/dto/update-email.dto';
import { Role } from '@/common/enums/role.enum';
import { CreateUserCli } from '@/cli/commands/create-user.command';
import { AuthUserType } from '@/common/types/auth-user.type';
import { DriverErrorType } from '@/common/types/error.typs';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(userinput: CreateUserDto | CreateUserCli): Promise<User> {
    try {
      const hashedPassword = await bcrypt.hash(
        userinput.password,
        Number(process.env.SALT_OR_ROUNDS),
      );

      const user = this.userRepository.create({
        email: userinput.email,
        passwordHash: hashedPassword,
        firstname: userinput.firstname,
        lastname: userinput.lastname,
      });

      if (userinput.role) {
        user.role = userinput.role;
      }

      return await this.userRepository.save(user);
    } catch (error) {
      if (error instanceof QueryFailedError) {
        const driverError = error.driverError as DriverErrorType;
        if (driverError?.code === '23505') {
          throw new ConflictException('Email already exists');
        }
      }

      throw error;
    }
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findByEmail(email: string) {
    return await this.userRepository.findOne({
      where: {
        email: email,
      },
    });
  }

  async findOneById(id: string): Promise<User | null> {
    return await this.userRepository.findOneBy({ id: id });
  }

  async update(id: string, dto: UpdateUserDto): Promise<User> {
    const user: User | null = await this.userRepository.findOne({
      where: { id: id },
    });

    if (!user)
      throw new NotFoundException(`Cannot find user where id is #${id}`);

    user.firstname = dto.firstname;
    user.lastname = dto.lastname;

    return await this.userRepository.save(user);
  }

  async remove(id: string, actor: AuthUserType): Promise<User | UpdateResult> {
    if (actor.role === Role.ADMIN) {
      const user: User | null = await this.userRepository.findOneBy({
        id: id,
      });

      if (!user)
        throw new NotFoundException(`Cannot find user where id is #${id}`);

      return await this.userRepository.remove(user);
    } else if (actor.role === Role.USER) {
      const user: User | null = await this.userRepository.findOneBy({
        id: actor.id,
      });
      if (!user)
        throw new NotFoundException(`Cannot find user where id is #${id}`);

      return await this.userRepository.softDelete(user);
    } else {
      throw new ForbiddenException('Insufficient permissions');
    }
  }

  async updatePassword(id: string, dto: UpdatePasswordDto): Promise<User> {
    const user: User | null = await this.userRepository.findOneBy({
      id: id,
    });

    if (!user)
      throw new NotFoundException(`Cannot find user where id is #${id}`);

    const passwordValid = await bcrypt.compare(
      dto.currentPassword,
      user.passwordHash,
    );
    if (!passwordValid) throw new UnauthorizedException('Invalid password');

    user.passwordHash = await bcrypt.hash(
      dto.newPassword,
      Number(process.env.SALT_OR_ROUNDS),
    );
    return this.userRepository.save(user);
  }

  async updateEmail(id: string, dto: UpdateEmailDto): Promise<User> {
    const user: User | null = await this.userRepository.findOneBy({
      id: id,
    });

    if (!user)
      throw new NotFoundException(`Cannot find user where id is #${id}`);
    if (user.email !== dto.oldEmail)
      throw new BadRequestException('Current email does not match');

    const passwordValid = await bcrypt.compare(dto.password, user.passwordHash);
    if (!passwordValid) throw new UnauthorizedException('Invalid password');

    const emailExists = await this.userRepository.findOneBy({
      email: dto.newEmail,
    });
    if (emailExists) throw new ConflictException('Email already in use');

    user.email = dto.newEmail;
    return await this.userRepository.save(user);
  }
}
