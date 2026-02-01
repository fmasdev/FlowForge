// src/modules/workflow/entities/workflow.entity.ts

import { Entity, Column, ManyToOne, JoinColumn, Unique } from "typeorm";
import { BaseEntity } from '@/common/entities/base.entity';
import { User } from "@/modules/user/entities/user.entity";

@Entity('workflows')
@Unique(['name'])
export class Workflow extends BaseEntity {
  @Column()
  name!: string;

  @Column({ nullable: true, type: 'text' })
  description?: string;

  @Column({ name: 'last_execution', type: 'timestamp', nullable: true })
  lastExecution?: Date;

  @ManyToOne(() => User, (user) => user.workflows, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'created_by' })
  createdBy!: User;
}
