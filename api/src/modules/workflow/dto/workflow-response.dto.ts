// src/modules/workflow/dto/workflow-response.dto.ts

import { WorkflowEdge } from "@/modules/workflow-edge/entities/workflow-edge.entity";
import { WorkflowNode } from "@/modules/workflow-node/entities/workflow-node.entity";
import { UserPublicDto } from "@/modules/workflow/dto/user-public.dto";

export class WorkflowResponseDto {
  id!: string;
  name!: string;
  description?: string;
  createdBy!: UserPublicDto;
  nodes?: WorkflowNode[];
  edges?: WorkflowEdge[];
}