// src/modules/workflow/dto/create-workflow.dto.ts

import { IsBoolean, IsOptional, IsString } from "class-validator";

export class CreateWorkflowDto { 
  @IsString()
  name!: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsBoolean()
  isActive!: boolean;
}
