// src/modules/workflow/dto/create-workflow.dto.ts

import { IsOptional, IsString } from "class-validator";

export class CreateWorkflowDto { 
  @IsString()
  name!: string;

  @IsOptional()
  @IsString()
  description?: string;
}
