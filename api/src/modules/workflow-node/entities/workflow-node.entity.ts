// src/modules/worlflow-node/entities/workflow-node.entity.ts

import { BaseEntity } from '@/common/entities/base.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { ConditionNodeConfigDto } from '@/modules/workflow-node/dto/node-config/condition-node-config.dto';
import { DelayNodeConfigDto } from '@/modules/workflow-node/dto/node-config/delay-node-config.dto';
import { HttpNodeConfigDto } from '@/modules/workflow-node/dto/node-config/http-node-config.dto';
import { WorkflowNodeType } from '@/modules/workflow-node/enums/workflow-node-type.enum';
import { Workflow } from '@/modules/workflow/entities/workflow.entity';
import { ScriptNodeConfigDto } from '@/modules/workflow-node/dto/node-config/script-node-config.dto';
import { EmailNodeConfigDto } from '@/modules/workflow-node/dto/node-config/email-node-config.dto';
import { WebhookNodeConfigDto } from '@/modules/workflow-node/dto/node-config/webhook-node-config.dto';

@Entity('workflow_nodes')
export class WorkflowNode extends BaseEntity {
  @Column({ type: 'varchar', length: 50 })
  label!: string;

  @Column({ type: 'varchar', length: 150, nullable: true })
  description?: string;

  @ManyToOne(() => Workflow, (workflow) => workflow.nodes, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'workflow_id' })
  workflow!: Workflow;

  @Column({
    type: 'enum',
    enum: WorkflowNodeType,
    default: WorkflowNodeType.HTTP,
  })
  type!: WorkflowNodeType;

  @Column({ type: 'jsonb' })
  config!:
    | HttpNodeConfigDto
    | ConditionNodeConfigDto
    | DelayNodeConfigDto
    | ScriptNodeConfigDto
    | EmailNodeConfigDto
    | ScriptNodeConfigDto
    | WebhookNodeConfigDto;

  @Column({ type: 'float8', default: 0 })
  positionX!: number;

  @Column({ type: 'float8', default: 0 })
  positionY!: number;
}