// src/modules/workflow/helpers/mapToReactFlowEdge.ts

import { Edge } from "@xyflow/react";
import { WorkflowEdgeType } from "@/modules/workflow/enums/workflow-edge-type.enum";
import type {
  WorkflowEdge,
  WorkflowEdgeData
} from "@/modules/workflow/types/Workflow.types";

export function mapToReactFlowEdges(workflowEdges: WorkflowEdge[]): Edge<WorkflowEdgeData>[] {
  return workflowEdges.map(workflowEdge => ({
    id: `${workflowEdge.id}__${workflowEdge.source.id}__${workflowEdge.target.id}`,
    source: workflowEdge.source.id,
    target: workflowEdge.target.id,
    sourceHandle: [WorkflowEdgeType.SUCCESS, WorkflowEdgeType.ERROR].includes(workflowEdge.type)
      ? workflowEdge.type
      : undefined,
    selectable: true,
    type: workflowEdge.type,
    data: {
      _type: 'edge',
      label: workflowEdge.label,
      originalEdge: workflowEdge,
      selected: false,
    },
    label: workflowEdge.label
  }))
}