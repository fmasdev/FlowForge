// src/modules/workflow/components/workflow-canvas/WorkflowCanvas.tsx

'use client';

import { JSX, useCallback } from "react";
import { applyNodeChanges, Edge, Node, NodeChange, NodeMouseHandler, NodePositionChange, NodeRemoveChange, ReactFlow, useEdgesState, useNodesInitialized, useNodesState } from '@xyflow/react';
import { WorkflowCanvasProps, WorkflowEdgeData,  WorkflowNodeData } from "@/modules/workflow/types/Workflow.types";
import { mapToReactFlowNode } from "@/modules/workflow/helpers/mapToReactFlowNode";
import { mapToReactFlowEdges } from "@/modules/workflow/helpers/mapToReactFlowEdge";
import { workflowNodeService } from "@/modules/workflow/workflow-node.service";

export const WorkflowCanvas: React.FC<WorkflowCanvasProps> = ({
  workflowNodes,
  workflowEdges,
  workflowId,
  onNodeSelect
}: WorkflowCanvasProps): JSX.Element => {

  const rfNodes: Node<WorkflowNodeData>[] = workflowNodes ? mapToReactFlowNode(workflowNodes) : [];
  const rfEdges: Edge<WorkflowEdgeData>[] = workflowEdges ? mapToReactFlowEdges(workflowEdges) : [];
  const [nodes, setNodes] = useNodesState(rfNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(rfEdges);

  const handleNodesChange = useCallback(
    (changes: NodeChange[]) => {
      let nodeId = null;
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
            console.error(err)
          }
        });
        
        updatedNodes.forEach(updatedNode => {
          nodeId = updatedNode.id
        })

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
  
  const onKeyDown = useCallback((event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Delete' || event.key === 'Backspace') {
      setNodes((nodes) => {
        const notDeletedNodes = nodes.filter((node) => !node.selected)
        const deletedNodes = nodes.filter((node) => node.selected)
        deletedNodes.forEach((node) => {
          try {
            workflowNodeService.remove(workflowId, node.id);
          } catch (err) {
            console.error(err)
          }
        });
      
        return notDeletedNodes;
      });
      setEdges((eds) => eds.filter((e) => !e.selected));
    }
  }, []);

  const onSelectionChange = useCallback(
    ({ nodes, edges }: { nodes: Node<WorkflowNodeData>[]; edges: Edge<WorkflowEdgeData>[] }) => {
      onNodeSelect(nodes.length ? nodes[0] : null);
      if (edges.length) {
        console.log('selected edges', edges);
      }
    },
    []
  );

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
        onSelectionChange={onSelectionChange}
        selectNodesOnDrag={false}
      />
    </div>
  );
};