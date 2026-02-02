// src/modules/workflow/components/workflow/Workflow.tsx

'use client';

import { JSX, useEffect, useState, useTransition } from "react";
import { workflowService } from "@/modules/workflow/workflow.service";
import { WorkflowHeader } from "@/modules/workflow/components/workflow-header/WorkflowHeader";
import { Workflow } from "@/modules/workflow/types/Workflow.types";
import { ItemApiResponse } from "@/services/api/api.types";
import { useTranslation } from "react-i18next";
import { WorkflowCanvas } from "@/modules/workflow/components/workflow-canvas/WorkflowCanvas";
import { WorkflowSidebar } from "@/modules/workflow/components/workflow-sidebar/WorkflowSidebar";

export interface WorkflowProps {
  id: string
}

export const WorkflowLayout = ({id}: WorkflowProps): JSX.Element => {
  const { t } = useTranslation('workflow');

  const [workflow, setWorkflow] = useState<Workflow | null>(null);

  const fetchWorkflow = async () => {
    try {
      const res: ItemApiResponse<Workflow> = await workflowService.fetchOne(id);
      setWorkflow(res.data);
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    fetchWorkflow()
  }, [])
  
  return (
    <>
      {!!workflow ? (
        <div className="flex gap-2 min-h-screen">
          <WorkflowSidebar></WorkflowSidebar>
          <div className="w-full px-4">
        
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
        

            <WorkflowCanvas></WorkflowCanvas>
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </>
  )
    
};

