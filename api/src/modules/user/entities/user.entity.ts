import { Entity, Column, OneToMany } from 'typeorm';
import { Exclude } from 'class-transformer';
import { Role } from '@/common/enums/role.enum';
import { BaseEntity } from '@/common/entities/base.entity';
import { Workflow } from '@/modules/workflow/entities/workflow.entity';

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

  @OneToMany(() => Workflow, (workflow) => workflow.createdBy)
  workflows!: Workflow[];
}
