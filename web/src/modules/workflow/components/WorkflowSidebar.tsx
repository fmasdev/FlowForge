// src/modules/workflow/components/workflow-sidebar/WorkflowSidebar.tsx

import React, { JSX } from "react"
import { Sidebar } from "@/components/sidebar/Sidebar"
import { useTranslation } from "react-i18next";
import { WorkflowEdgeData, WorkflowNodeData, WorkflowSidebarProps } from "@/modules/workflow/types/Workflow.types";


export const WorkflowSidebar: React.FC<WorkflowSidebarProps> = ({
  selectedElt
}): JSX.Element => {
  const { t } = useTranslation('workflow');
  console.log(('selectedElt'));
  console.log(selectedElt);
  const isWorkflowNodeSelected = (
    el: WorkflowNodeData | WorkflowEdgeData | null
  ): el is WorkflowNodeData => el?._type === 'node';
  
  const isEdgeSelected = (
    el: WorkflowNodeData | WorkflowEdgeData | null
  ): el is WorkflowEdgeData => el?._type === 'edge';


  return (
    <Sidebar
      title="WorkflowSidebar"
      width="sm"
      footer={
        <button className="w-full rounded bg-indigo-600 px-3 py-2 text-sm font-medium">
          {t('action.relaunch')}
        </button>
      }
    >
      <>
        {isWorkflowNodeSelected(selectedElt) && (
          <div>
            <div>Node detail</div>
            <p>{selectedElt?.label}</p>
            <div>
              {/* <WorkflowNodeDetail
                node={selectedElt}
              /> */}
            </div>
          </div>
        )}
        {/* {(selectedElt && selectedElt._type === 'edge') && (
          <div>
            <div>Edge detail</div>
            <div>{edgeDetail?.data?.label}</div>
          </div>
        )} */}
        {/* <div>todo</div>
        <ul>
          <li>selected node detail</li>
          <li>params</li>
          <li>logs</li>
          <li>errors</li>
        </ul> */}
      </>
    </Sidebar>

  )
}