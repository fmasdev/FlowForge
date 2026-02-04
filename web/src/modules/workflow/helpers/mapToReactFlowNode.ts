// src/modules/workflow/helpers/mapToReactFlowNode.ts

import { WorkflowNode, WorkflowNodeData } from "@/modules/workflow/types/Workflow.types";
import { Node } from "@xyflow/react";


const baseStyle = {
  maxWidth: 120,
  backgroundColor: '#1f2937',
  color: '#f9fafb',
  padding: '8px 8px',
  borderRadius: '0.5rem',
  border: '2px solid #4b5563',
  fontWeight: '500',
  textAlign: 'center',
};

const selectedStyle = {
  border: '2px solid #3b82f6',
  boxShadow: '0 0 0 4px rgba(59, 130, 246, 0.35)',
};

export function mapToReactFlowNode(workflowNodes: WorkflowNode[]): Node<WorkflowNodeData>[] {
  const spacing = 150;

  return workflowNodes.map((workflowNode, i) => ({
    id: workflowNode.id,
    type: 'default',
    data: {
      label: workflowNode.label ? `${workflowNode.label} (${workflowNode.type})` : workflowNode.type,
      originalNode: workflowNode
    },
    position: {
      x: workflowNode.positionX || i * spacing,
      y: workflowNode.positionY * 2,
    },
    elementsSelectable: true,
    draggable: true,
    style: {
      maxWidth: 120,
      backgroundColor: '#1f2937',
      color: '#f9fafb',
      padding: '8px 8px',
      borderRadius: '0.5rem',
      border: '2px solid #4b5563',
      fontWeight: '500',
      textAlign: 'center'
    }
  }));
}