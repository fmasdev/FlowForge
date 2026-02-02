// src/modules/worlflow-node/entities/workflow-node.entity.ts

import { BaseEntity } from '@/common/entities/base.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { ConditionNodeConfigDto } from '@/modules/workflow-node/dto/condition-node-config.dto';
import { DelayNodeConfigDto } from '@/modules/workflow-node/dto/delay-node-config.dto';
import { HttpNodeConfigDto } from '@/modules/workflow-node/dto/http-node-config.dto';
import { WorkflowNodeType } from '@/modules/workflow-node/enums/workflow-node-type.enum';
import { Workflow } from '@/modules/workflow/entities/workflow.entity';

@Entity('workflow_nodes')
export class WorkflowNode extends BaseEntity {
  @ManyToOne(() => Workflow, (workflow) => workflow.nodes, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'workflow_id' })
  workflow!: Workflow;

  @Column({ type: 'enum', enum: WorkflowNodeType, default: WorkflowNodeType.HTTP })
  type!: WorkflowNodeType;

  @Column({ type: 'jsonb' })
  config!: HttpNodeConfigDto | ConditionNodeConfigDto | DelayNodeConfigDto;

  @Column()
  positionX!: number;

  @Column()
  positionY!: number;
}