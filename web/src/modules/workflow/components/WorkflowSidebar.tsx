// src/modules/workflow/components/workflow-sidebar/WorkflowSidebar.tsx

import React, { JSX } from "react"
import { Sidebar } from "@/components/sidebar/Sidebar"
import { useTranslation } from "react-i18next";
import { WorkflowEdgeData, WorkflowNodeData, WorkflowSidebarProps } from "@/modules/workflow/types/Workflow.types";
import { WorkflowNodeDetail } from "@/modules/workflow/components/WorkflowNodeDetail";


export const WorkflowSidebar: React.FC<WorkflowSidebarProps> = ({
  selectedNode,
  selectedEdge,
}): JSX.Element => {
  const { t } = useTranslation('workflow');

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
        {!!selectedNode && (
          <div>
            <div>Node detail</div>
            <p>{selectedNode.label}</p>
            <div>
              <WorkflowNodeDetail
                node={selectedNode}
              />
            </div>
          </div>
        )}
        {!!selectedEdge && (
          <div>
            <div>Edge detail</div>
            {/* <div>{selectedEdge?.data?.label}</div> */}
          </div>
        )}
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