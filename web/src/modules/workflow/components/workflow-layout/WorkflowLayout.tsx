// src/modules/workflow/components/workflow/Workflow.tsx

'use client';

import { JSX, useEffect, useState } from "react";
import { workflowService } from "@/modules/workflow/workflow.service";
import { WorkflowHeader } from "@/modules/workflow/components/workflow-header/WorkflowHeader";
import { Workflow, WorkflowEdgeData, WorkflowNodeData, WorkflowProps } from "@/modules/workflow/types/Workflow.types";
import { ItemApiResponse } from "@/services/api/api.types";
import { useTranslation } from "react-i18next";
import { WorkflowCanvas } from "@/modules/workflow/components/workflow-canvas/WorkflowCanvas";
import { WorkflowSidebar } from "@/modules/workflow/components/workflow-sidebar/WorkflowSidebar";
import { Edge, Node } from "@xyflow/react";

export const WorkflowLayout: React.FC<WorkflowProps> = ({id}): JSX.Element => {
  const { t } = useTranslation('workflow');

  const [workflow, setWorkflow] = useState<Workflow | null>(null);
  const [selectedNode, setSelectedNode] = useState<Node<WorkflowNodeData> | null>(null);  
  const [selectedEdge, setSelectedEdge] = useState<Edge<WorkflowEdgeData> | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const fetchWorkflow = async () => {
    try {
      const res: ItemApiResponse<Workflow> = await workflowService.fetchOne(id);
      setWorkflow(res.data);
    } catch (err) {
      const error = err instanceof Error
        ? err
        : new Error('Unknown error');

      setError(error);
    }
  }

  useEffect(() => {
    fetchWorkflow()
  }, [])

  const handleNodeSelect = (node: Node<WorkflowNodeData> | null) => {
    setSelectedNode(node);
  }

  const handleEdgeSelect = (edge: Edge<WorkflowEdgeData> | null) => {
    setSelectedEdge(edge);
  }

  return (
    <>
      {!!workflow ? (
        <div className="flex gap-2 h-screen flex-col">
          <WorkflowHeader
              workflow={workflow}
              actions={
                <>
                  <button className="rounded-md bg-blue-600 px-3 py-1.5 text-sm text-white hover:bg-blue-500">
                    {t('action.execute')}
                  </button>
                  <button className="rounded-md border border-white/10 px-3 py-1.5 text-sm text-gray-300 hover:bg-white/5">
                    {t('action.modify')}
                  </button>
                </>
              }
          ></WorkflowHeader>
          
          <div className="flex flex-1 overflow-hidden">
            <WorkflowSidebar
              nodeDetail={selectedNode}
              edgeDetail={selectedEdge}
            ></WorkflowSidebar>
          
            <WorkflowCanvas
              workflowNodes={workflow.nodes}
              workflowEdges={workflow?.edges}
              workflowId={workflow.id!}
              onNodeSelect={handleNodeSelect}
              onEdgeSelect={handleEdgeSelect}
              onError={() =>setError(error)}
            />
          </div>
          
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </>
  )
    
};

