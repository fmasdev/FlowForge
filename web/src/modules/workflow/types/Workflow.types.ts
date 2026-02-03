// src/modules/workflow/types/Workflow.types.ts

import { NodeChange } from "@xyflow/react";

export interface Workflow {
  id?: string;
  name: string;
  description: string;
  lastExecution?: string;
  nodes?: WorkflowNode[];
  edges?: WorkflowEdge[];
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

export interface WorkflowProps {
  id: string
}

export interface WorkflowNodeConditionConfig {
  expression: string;
  trueNodeId: string;
  falseNodeId: string;
  variables?: string[];
}

export interface WorkflowNodeDelayConfig {
  durationMs: number;
  jitterMs?: number;
}

export interface WorkflowNodeHttpConfig {
  url: string;
  method: string;
  headers?: any;
  body?: any;
}
export interface WorkflowNode {
  id: string;
  type: string;
  config: WorkflowNodeConditionConfig | WorkflowNodeDelayConfig | WorkflowNodeHttpConfig;
  positionX: number;
  positionY: number;
}
export interface WorkflowEdge {
  id: string;
  source: WorkflowNode;
  target: WorkflowNode;
  label: string;
}

export interface WorkflowCanvasProps {
  workflowNodes?: WorkflowNode[];
  workflowEdges?: WorkflowEdge[];
  onNodeChange: (changes: NodeChange) => void;
  onNodeDelete: (nodeId: string) => void;
  onNodeSelect: (nodeId: string) => void;
}

export interface WorkflowNodeData extends Record<string, unknown> {
  label: string;
  originalNode?: WorkflowNode
}

export interface WorkflowEdgeData extends Record<string, unknown> {
  label?: string;
  originalEdge?: WorkflowEdge
}
