// src/modules/workflow/entities/workflow.entity.ts

import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { BaseEntity } from '@/common/entities/base.entity';
import { User } from "@/modules/user/entities/user.entity";
import { WorkflowNode } from "@/modules/workflow-node/entities/workflow-node.entity";

@Entity('workflow')
export class Workflow extends BaseEntity {
  @Column()
  name!: string;

  @Column({ nullable: true, type: 'text' })
  description?: string;

  @Column({ name: 'is_active', type: 'boolean', default: true })
  isActive?: boolean;

  @ManyToOne(() => User, (user) => user.workflows, {
    nullable: false,
    onDelete: 'CASCADE'
  })
  @JoinColumn({ name: 'created_by' })
  createdBy!: User;

  @OneToMany(() => WorkflowNode, (workflowNode) => workflowNode.workflow)
  nodes!: WorkflowNode[]
}
