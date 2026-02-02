// src/modules/worlflow-node/entities/workflow-node.entity.ts

import { BaseEntity } from '@/common/entities/base.entity';
import { WorkflowNodeType } from '@/modules/workflow-node/enums/workflow-node-type.enum';
import { Workflow } from '@/modules/workflow/entities/workflow.entity';

import { Column, Entity, ManyToOne } from 'typeorm';

@Entity('workflow_nodes')
export class WorkflowNode extends BaseEntity {
  @ManyToOne(() => Workflow, (workflow) => workflow.nodes, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  workflow!: Workflow;

  @Column({ type: 'enum', enum: WorkflowNodeType, default: WorkflowNodeType.HTTP })
  type!: WorkflowNodeType;

  @Column({ type: 'jsonb' })
  config!: Record<string, unknown>;

  @Column()
  positionX!: number;

  @Column()
  positionY!: number;
}