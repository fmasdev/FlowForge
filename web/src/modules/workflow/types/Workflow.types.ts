// src/modules/workflow/types/WorkflowNode.types.ts

import { WorkflowEdgeType } from "@/modules/workflow/enums/workflow-edge-type.enum";
import { WorkflowNodeType } from "@/modules/workflow/enums/workflow-node-type.enum";
import { WorkflowEdgeData } from "@/modules/workflows/types/Workflows.types";
import { Node, NodeProps, Edge } from "@xyflow/react";

export interface WorkflowNodeProps extends NodeProps {
  data: WorkflowNodeData;
  selected: boolean;
};

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
  type: WorkflowNodeType;
  config: WorkflowNodeConditionConfig | WorkflowNodeDelayConfig | WorkflowNodeHttpConfig | WorkflowNodeEmailConfig | WorkflowNodeWebhookConfig;
  positionX: number;
  positionY: number;
  label?: string;
}
export interface WorkflowEdge {
  id: string;
  source: WorkflowNode;
  target: WorkflowNode;
  label: string;
  type: WorkflowEdgeType;
}

export interface WorkflowCanvasProps {
  workflowNodes?: WorkflowNode[];
  workflowEdges?: WorkflowEdge[];
  workflowId: string;
  onElementSelect: (node: Node<WorkflowNodeData> | Edge<WorkflowEdgeData> | null) => void;
}

export interface WorkflowNodeData extends Record<string, unknown> {
  label: string;
  originalNode: WorkflowNode
  _type: 'node';
}


export interface WorkflowEdgeData extends Record<string, unknown> {
  label?: string;
  originalEdge: WorkflowEdge
  selected?: boolean
  _type: 'edge';
}

export interface WorkflowSidebarProps {
  selectedElt: WorkflowNodeData | WorkflowEdgeData | null;
}