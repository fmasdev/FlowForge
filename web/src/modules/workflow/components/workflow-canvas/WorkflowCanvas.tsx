// src/modules/workflow/components/workflow-canvas/WorkflowCanvas.tsx

'use client';

import { JSX, useCallback } from "react";
import { applyEdgeChanges, applyNodeChanges, Edge, EdgeChange, Node, NodeChange, NodePositionChange, NodeRemoveChange, ReactFlow, useEdgesState, useNodesState } from '@xyflow/react';
import { WorkflowCanvasProps, WorkflowEdgeData,  WorkflowNodeData } from "@/modules/workflow/types/Workflow.types";
import { mapToReactFlowNode } from "@/modules/workflow/helpers/mapToReactFlowNode";
import { mapToReactFlowEdges } from "@/modules/workflow/helpers/mapToReactFlowEdge";
import { workflowNodeService } from "@/modules/workflow/workflow-node.service";
import { ActionNode } from "@/modules/workflow/components/react-flow/nodes/ActionNode";
import { ConditionNode } from "@/modules/workflow/components/react-flow/nodes/ConditionNode";
import { HttpNode } from "@/modules/workflow/components/react-flow/nodes/HttpNode";
import { WorkflowEdge } from "@/modules/workflow/components/react-flow/edges/WorkflowEdge";
import { SuccessEdge } from "@/modules/workflow/components/react-flow/edges/SuccessEdge";
import { ErrorEdge } from "@/modules/workflow/components/react-flow/edges/ErrorEdge";
import { ArrowClosedEdgeMarker } from "@/modules/workflow/components/react-flow/edge-markers/ArrowClosedEdgeMarker";
import { no } from "zod/v4/locales";
import { workflowEdgeService } from "@/modules/workflow/workflow-edge.service";
import { set } from "zod";

export const WorkflowCanvas: React.FC<WorkflowCanvasProps> = ({
  workflowNodes,
  workflowEdges,
  workflowId,
  onNodeSelect,
  onEdgeSelect,
  onError,
}): JSX.Element => {

  const rfNodes: Node<WorkflowNodeData>[] = workflowNodes ? mapToReactFlowNode(workflowNodes) : [];
  const rfEdges: Edge<WorkflowEdgeData>[] = workflowEdges ? mapToReactFlowEdges(workflowEdges) : [];

  const [nodes, setNodes] = useNodesState(rfNodes);
  const [edges, setEdges] = useEdgesState(rfEdges);

  const nodeTypes = {
    trigger: HttpNode,
    action: ActionNode,
    condition: ConditionNode,
  };

  const edgeTypes = {
    workflow: WorkflowEdge,
    success: SuccessEdge,
    error: ErrorEdge,
  };
  
  // Handle selection
  const handleSelectionChange = useCallback(
    ({ nodes, edges }: { nodes: Node<WorkflowNodeData>[], edges: Edge<WorkflowEdgeData>[] }) => {
      onNodeSelect(nodes[0] ?? null);
      onEdgeSelect(edges[0] ?? null);
    },
    [onNodeSelect, onEdgeSelect]
  );

  // Handle node changes
  const handleNodesChange = useCallback(
    (changes: NodeChange[]) => {
      setNodes((nds) => {
        const updatedNodes = applyNodeChanges(changes, nds) as Node<WorkflowNodeData>[];

        // Filter position changes for PATCH backend
        const positionChanges = changes.filter(
          (c): c is NodePositionChange => c.type === 'position' && c.dragging === false
        );
        
        const movedNodes = updatedNodes.filter((node) =>
          positionChanges.some((c) => c.id === node.id)
        );

        movedNodes.forEach((node) => {
          try {
            workflowNodeService.update(workflowId, node.id, {
              type: 'position',
              position: {
                x: node.position.x,
                y: node.position.y,
              }
            });
          } catch (err) {
            const error = err instanceof Error
              ? err
              : new Error('Unknown error');

            onError(error);
          }
        });
        
        // Filter remove changes for DELETE backend
        const removeChanges = changes.filter(
          (c): c is NodeRemoveChange => c.type === 'remove'
        );

        removeChanges.forEach((c) => {
          workflowNodeService.remove(workflowId, c.id);
        });

        return updatedNodes;
      });
    }, []);
  
  // Handle edge changes
  const handleEdgeChange = useCallback(
    (changes: EdgeChange<Edge<WorkflowEdgeData>>[]) => {
      setEdges((eds) => applyEdgeChanges(changes, eds));
  }, [])
  
  const onKeyDown = useCallback((event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Delete' || event.key === 'Backspace') {
      setNodes((nodes) => {
        const notDeletedNodes = nodes.filter((node) => !node.selected);
        const deletedNodes = nodes.filter((node) => node.selected);
        deletedNodes.forEach((node) => {
          try {
            workflowNodeService.remove(workflowId, node.id);
          } catch (err) {
            const error = err instanceof Error
              ? err
              : new Error('Unknown error');

            onError(error);
          }
        });
      
        return notDeletedNodes;
      });
      setEdges((edges) => {
        const notDeletedEdges = edges.filter((edge) => !edge.selected);
        const deletedEdges = edges.filter((edge) => edge.selected);
        deletedEdges.forEach((edge) => {
          try {
            throw new Error('Not implemented')
            // workflowEdgeService.remove(workflowId, edge.id);
          } catch (err: unknown) {
            const error = err instanceof Error
              ? err
              : new Error('Unknown error');

            onError(error);
          }
        });
        return notDeletedEdges;
      });
    }
  }, []);

  

  

  



  return (
    <div
      className="flex-1 relative overflow-hidden"
      onKeyDown={onKeyDown}
      tabIndex={0}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodesDraggable
        onNodesChange={handleNodesChange}
        onEdgesChange={handleEdgeChange}
        onSelectionChange={handleSelectionChange}
        selectNodesOnDrag={false}
        elementsSelectable={true}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
      >
        <ArrowClosedEdgeMarker />
      </ReactFlow>
    </div>
  );
};