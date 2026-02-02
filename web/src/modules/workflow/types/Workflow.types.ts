// src/modules/workflow/types/Workflow.types.ts

export interface Workflow {
  id?: string;
  name: string;
  description: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  createdBy: CreatedBy;
}

export interface WorkflowCardProps {
  workflow: Workflow
  onEdit: (() => void)
  onDelete: (() => void)
}

export interface WorkflowSearchParams {
  page?: number;
  search?: string;
}

export interface WorkflowModalProps {
  isOpen: boolean;
  action: 'add'| 'edit' | 'delete';
  form: WorkflowFormData;
  onChange: (form: WorkflowFormData) => void;
  onSubmit: () => void;
  onDelete: () => void;
  onClose: () => void;
}

export interface WorkflowFormData {
  id?: string,
  name: string;
  description: string;
  isActive: boolean;
} 

export interface WorkflowFormProps {
  form: WorkflowFormData ;
  onChange: (f: WorkflowFormData) => void;
}

export interface CreatedBy {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
}