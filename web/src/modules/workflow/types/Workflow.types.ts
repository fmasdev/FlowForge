// src/modules/workflow/types/WorkflowNode.types.ts

import { WorkflowEdgeType } from "@/modules/workflow/enums/workflow-edge-type.enum";
import { WorkflowNodeScriptLanguageType } from "@/modules/workflow/enums/workflow-node-script-language-type.enum";
import { WorkflowNodeType } from "@/modules/workflow/enums/workflow-node-type.enum";
import { WorkflowNodeRequestType } from "@/modules/workflow/enums/workfow-node-request-type.enum";
import { Workflow } from "@/modules/workflows/types/Workflows.types";
import { Node, NodeProps, Edge } from "@xyflow/react";

export interface WorkflowHeaderProps {
  workflow: Workflow
  actions?: React.ReactNode;
}

export interface WorkflowCanvasProps {
  workflowNodes?: WorkflowNode[];
  workflowEdges?: WorkflowEdge[];
  workflowId: string;
  onNodeSelect: (node: Node<WorkflowNodeData> | null) => void;
  onEdgeSelect: (node: Edge<WorkflowEdgeData> | null) => void;
}

// ====================
// NODE
// ====================

export interface WorkflowNodeProps extends NodeProps {
  data: WorkflowNodeData;
  selected: boolean;
};

export interface WorkflowNode {
  id: string;
  type: WorkflowNodeType;
  config: WorkflowNodeConditionConfig
    | WorkflowNodeDelayConfig
    | WorkflowNodeHttpConfig
    | WorkflowNodeEmailConfig
    | WorkflowNodeWebhookConfig
    | WorkflowNodeScriptConfig;
  positionX: number;
  positionY: number;
  label?: string;
}

export interface WorkflowNodeData extends Record<string, unknown> {
  label: string;
  originalNode: WorkflowNode
  _type: 'node';
}

export interface WorkflowNodeDetailProps {
  node: WorkflowNodeData
}

// ====================
// NODE CONFIG
// ====================

export interface WorkflowNodeHttpConfig {
  url: string;
  method: WorkflowNodeRequestType;
  headers?: Record<string, string>;
  body?: Record<string, string>;
}

export interface WorkflowNodeDelayConfig {
  durationMs: number;
  jitterMs?: number;
}

export interface WorkflowNodeConditionConfig {
  expression: string;
  trueNodeId: string;
  falseNodeId: string;
  variables?: string[];
}

export interface WorkflowNodeEmailConfig {
  to: string;
  subject: string;
  text: string;
}

export interface WorkflowNodeWebhookConfig {
  uri: string;
  method: WorkflowNodeRequestType;
  headers: Record<string, string>;
  body: Record<string, unknown>;
}

export interface WorkflowNodeScriptConfig {
  language: WorkflowNodeScriptLanguageType;
  code: string;
}

// ====================
// EDGE
// ====================

export interface WorkflowEdge {
  id: string;
  source: WorkflowNode;
  target: WorkflowNode;
  label: string;
  type: WorkflowEdgeType;
}

export interface WorkflowEdgeData extends Record<string, unknown> {
  label?: string;
  originalEdge: WorkflowEdge
  selected?: boolean
  _type: 'edge';
}

export interface WorkflowSidebarProps {
  selectedNode: WorkflowNodeData | null;
  selectedEdge: WorkflowEdgeData | null
}