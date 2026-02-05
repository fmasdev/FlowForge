// src/modules/worlflow-node/dto/create-workflow-node.dto.ts

import { ConditionNodeConfigDto } from "@/modules/workflow-node/dto/node-config/condition-node-config.dto";
import { DelayNodeConfigDto } from "@/modules/workflow-node/dto/node-config/delay-node-config.dto";
import { EmailNodeConfigDto } from "@/modules/workflow-node/dto/node-config/email-node-config.dto";
import { HttpNodeConfigDto } from "@/modules/workflow-node/dto/node-config/http-node-config.dto";
import { ScriptNodeConfigDto } from "@/modules/workflow-node/dto/node-config/script-node-config.dto";
import { WebhookNodeConfigDto } from "@/modules/workflow-node/dto/node-config/webhook-node-config.dto";
import { WorkflowNodeType } from "@/modules/workflow-node/enums/workflow-node-type.enum";
import { Transform } from "class-transformer";
import { IsEnum, IsNumber, IsString, ValidateNested } from "class-validator";

export class CreateWorkflowNodeDto {

  @IsString()
  workflowId!: string;

  @IsEnum(WorkflowNodeType, {
    message: `type must be one of ${Object.values(WorkflowNodeType).join(', ')}`,
  })
  type!: WorkflowNodeType;

  @ValidateNested()
  @Transform(({ obj }) => {
    switch (obj.type) {
      case WorkflowNodeType.HTTP:
        return Object.assign(new HttpNodeConfigDto(), obj.config);
      case WorkflowNodeType.CONDITION:
        return Object.assign(new ConditionNodeConfigDto(), obj.config);
      case WorkflowNodeType.DELAY:
        return Object.assign(new DelayNodeConfigDto(), obj.config);
      default:
        return obj.config;
    }
  })
  config!: HttpNodeConfigDto
    | ConditionNodeConfigDto
    | DelayNodeConfigDto 
    | ScriptNodeConfigDto
    | EmailNodeConfigDto
    | ScriptNodeConfigDto
    | WebhookNodeConfigDto;

  @IsNumber()
  positionX!: number;

  @IsNumber()
  positionY!: number;
}
