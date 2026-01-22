// src/modules/workflow/dto/workflow-response.dto.ts

export class WorkflowResponseDto {
  id!: string;
  name!: string;
  description?: string;
  createdBy!: {
    id: string;
    firstname: string;
    lastname: string;
    email: string;
  };
}