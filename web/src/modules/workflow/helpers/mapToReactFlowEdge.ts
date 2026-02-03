// src/modules/workflow/helpers/mapToReactFlowEdge.ts

import { WorkflowEdge, WorkflowEdgeData } from "@/modules/workflow/types/Workflow.types";
import { Edge } from "@xyflow/react";

export function mapToReactFlowEdges(workflowEdges: WorkflowEdge[]): Edge<WorkflowEdgeData>[] {
  return workflowEdges.map(workflowEdge => ({
    id: workflowEdge.id,
    source: workflowEdge.source.id,
    target: workflowEdge.target.id,
    type: 'smoothstep',
    data: {
      label: workflowEdge.label,
      originalEdge: workflowEdge
    },
  }))
}