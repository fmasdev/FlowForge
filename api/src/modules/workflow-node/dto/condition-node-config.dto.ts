// src/modules/worlflow-node/dto/condition-node-config.dto.ts

import { IsOptional, IsString, IsUUID } from "class-validator";

export class ConditionNodeConfigDto {
  
  @IsString()
  expression!: string;

  @IsUUID()
  trueNodeId!: string;

  @IsUUID()
  falseNodeId!: string;

  @IsOptional()
  @IsString({ each: true })
  variables?: string[];
}