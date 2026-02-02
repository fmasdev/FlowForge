// src/modules/worlflow-node/dto/create-workflow-node.dto.ts

import { ConditionNodeConfigDto } from "@/modules/workflow-node/dto/condition-node-config.dto";
import { DelayNodeConfigDto } from "@/modules/workflow-node/dto/delay-node-config.dto";
import { HttpNodeConfigDto } from "@/modules/workflow-node/dto/http-node-config.dto";
import { WorkflowNodeType } from "@/modules/workflow-node/enums/workflow-node-type.enum";
import { Transform } from "class-transformer";
import { IsEnum, IsNumber, ValidateNested } from "class-validator";

export class CreateWorkflowNodeDto {
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
  config!: HttpNodeConfigDto | ConditionNodeConfigDto | DelayNodeConfigDto;

  @IsNumber()
  positionX!: number;

  @IsNumber()
  positionY!: number;
}
