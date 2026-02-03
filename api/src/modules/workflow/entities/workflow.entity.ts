// src/modules/workflow/entities/workflow.entity.ts

import { Entity, Column, ManyToOne, JoinColumn, OneToMany, Unique} from "typeorm";
import { BaseEntity } from '@/common/entities/base.entity';
import { User } from "@/modules/user/entities/user.entity";
import { WorkflowNode } from "@/modules/workflow-node/entities/workflow-node.entity";
import { WorkflowEdge } from "@/modules/workflow-edge/entities/workflow-edge.entity";

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

  @OneToMany(() => WorkflowNode, (workflowNode) => workflowNode.workflow, {
    cascade: true,
  })
  nodes!: WorkflowNode[];

  @OneToMany(() => WorkflowEdge, (workflowEdge) => workflowEdge.workflow, {
    cascade: true,
  })
  edges!: WorkflowEdge[];
}
