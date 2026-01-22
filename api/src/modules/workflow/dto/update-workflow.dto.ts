// src/modules/workflow/dto/update-workflow.dto.ts

import { PartialType } from '@nestjs/mapped-types';
import { CreateWorkflowDto } from './create-workflow.dto';
import { IsString } from 'class-validator';

export class UpdateWorkflowDto extends PartialType(CreateWorkflowDto) {
  @IsString()
  id!: string;
}
