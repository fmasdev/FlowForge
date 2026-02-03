// src/modules/workflow/components/workflow-canvas/WorkflowCanvas.tsx

import { JSX, useCallback } from "react";
import { applyNodeChanges, Edge, Node, NodeChange, ReactFlow, useEdgesState, useNodesState } from '@xyflow/react';
import { WorkflowCanvasProps, WorkflowEdgeData,  WorkflowNodeData } from "@/modules/workflow/types/Workflow.types";
import { mapToReactFlowNode } from "@/modules/workflow/helpers/mapToReactFlowNode";
import { mapToReactFlowEdges } from "@/modules/workflow/helpers/mapToReactFlowEdge";

export const WorkflowCanvas: React.FC<WorkflowCanvasProps> = ({
  workflowNodes,
  workflowEdges,
  onNodeChange,
  onNodeDelete,
  onNodeSelect 
}: WorkflowCanvasProps): JSX.Element => {

  const rfNodes: Node<WorkflowNodeData>[] = workflowNodes ? mapToReactFlowNode(workflowNodes) : [];
  const rfEdges: Edge<WorkflowEdgeData>[] = workflowEdges ? mapToReactFlowEdges(workflowEdges) : [];
  
  const [nodes, setNodes] = useNodesState(rfNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(rfEdges);

  const handleNodesChange = useCallback(
    (changes: NodeChange[]) => {
      setNodes((nds) => applyNodeChanges(changes, nds) as Node<WorkflowNodeData>[]);

      changes.forEach(change => {
        if (change.type === 'position' && !change.dragging) {
          onNodeChange(change)
        } else if (change.type === 'remove') {
          onNodeDelete(change.id)
          console.log('remove', change.id);
        } else if (change.type === 'select') {
          onNodeSelect(change.id)
        }
    })
  }, [])
  
  return (
    <div className="flex-1 relative overflow-hidden">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        fitView
        nodesDraggable
        onNodesChange={handleNodesChange}
        />
      {/* 
      <ul> todo:
        <li>manage zoom/plan</li>
        <li>visual interaction only</li>
      </ul> */}
    </div>
  );
};