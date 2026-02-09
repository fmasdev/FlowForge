// src/modules/workflow/components/workflow/Workflow.tsx

'use client';

import { JSX, useEffect, useState } from "react";
import { ItemApiResponse, NormalizedError } from "@/services/api/api.types";
import { useTranslation } from "react-i18next";
import { Edge, Node } from "@xyflow/react";
import { WorkflowSidebar } from "@/modules/workflow/components/WorkflowSidebar";
import { useToast } from "@/components/toast/ToastProvider";
import { WorkflowHeader } from "@/modules/workflow/components/WorkflowHeader";
import { WorkflowCanvas } from "@/modules/workflow/components/WorkflowCanvas";
import { workflowService } from "@/modules/workflows/workflow.service";
import { WorkflowEdgeData, WorkflowNodeData } from "@/modules/workflow/types/Workflow.types";
import { Workflow, WorkflowProps } from "@/modules/workflows/types/Workflows.types";

export const WorkflowLayout: React.FC<WorkflowProps> = ({id}): JSX.Element => {
  const { t } = useTranslation('workflow');
  const { toastify } = useToast();

  const [workflow, setWorkflow] = useState<Workflow | null>(null);
  const [selectedElement, setSelectedElement] = useState<Node<WorkflowNodeData> | Edge<WorkflowEdgeData> | null>(null);  

  const fetchWorkflow = async () => {
    try {
      const res: ItemApiResponse<Workflow> = await workflowService.fetchOne(id);
      setWorkflow(res.data);
    } catch (err) {
      const error = err as NormalizedError;
      if (!error.isInfraError) {
        toastify('error', t(error.code, error.context));
      }
    }
  }

  useEffect(() => {
    fetchWorkflow()
  }, [])

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
              selectedElt={selectedElement?.data}
            ></WorkflowSidebar>
          
            <WorkflowCanvas
              workflowNodes={workflow.nodes}
              workflowEdges={workflow?.edges}
              workflowId={workflow.id!}
              onElementSelect={setSelectedElement}
            />
          </div>
          
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </>
  )
};

