// src/modules/workflow/helpers/mapToReactFlowEdge.ts

import { WorkflowEdgeType } from "@/modules/workflow/enums/workflow-edge-type.enum";
import { WorkflowEdge, WorkflowEdgeData } from "@/modules/workflow/types/Workflow.types";
import { Edge } from "@xyflow/react";

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
      label: workflowEdge.label,
      originalEdge: workflowEdge,
      selected: false,
    },
    label: workflowEdge.label
  }))
}