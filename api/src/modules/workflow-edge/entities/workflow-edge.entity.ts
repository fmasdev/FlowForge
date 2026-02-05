// src/modules/workflow-edge/entities/workflow-edge.entity.ts

import { BaseEntity } from "@/common/entities/base.entity";
import { WorkflowEdgeType } from "@/modules/workflow-edge/enums/workflow-edge-type.enum";
import { WorkflowNode } from "@/modules/workflow-node/entities/workflow-node.entity";
import { Workflow } from "@/modules/workflow/entities/workflow.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";


@Entity('workflow_edges')
export class WorkflowEdge extends BaseEntity {
  
  @ManyToOne(() => Workflow, (workflow) => workflow.edges, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'workflow_id' })
  workflow!: Workflow;

  @ManyToOne(() => WorkflowNode, { eager: true, onDelete: 'CASCADE' })
  source!: WorkflowNode;

  @ManyToOne(() => WorkflowNode, { eager: true, onDelete: 'CASCADE' })
  target!: WorkflowNode

  @Column({ type: 'varchar', length: 50, nullable: true })
  label?: string;

  @Column({ type: 'enum', enum: WorkflowEdgeType, default: WorkflowEdgeType.WORKFLOW })
  type!: WorkflowEdgeType;
}