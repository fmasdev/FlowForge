// src/modules/workflow-edge/dto/create-workflow-edge.dto.ts

import { IsString } from "class-validator";

export class CreateWorkflowEdgeDto {
  @IsString()
  workflowId!: string;

  @IsString()
  sourceNodeId?: string;

  @IsString()
  targetNodeId?: string;
  
  @IsString()
  label?: string;
}