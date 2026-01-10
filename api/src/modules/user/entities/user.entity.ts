import { Entity, Column } from 'typeorm';
import { Exclude } from 'class-transformer';
import { Role } from '@/common/enums/role.enum';
import { BaseEntity } from '@/common/entities/base.entity';

@Entity('users')
export class User extends BaseEntity {
  @Column({ unique: true })
  email!: string;

  @Exclude()
  @Column({ name: 'password_hash' })
  passwordHash!: string;

  @Column()
  firstname!: string;

  @Column()
  lastname!: string;

  @Column({ type: 'enum', enum: Role, default: Role.USER })
  role!: string;
}
