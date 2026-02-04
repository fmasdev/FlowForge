// src/modules/workflow/components/workflow-sidebar/WorkflowSidebar.tsx

import { JSX } from "react"
import { Sidebar } from "@/components/sidebar/Sidebar"
import { useTranslation } from "react-i18next";
import { Node } from "@xyflow/react";
import { WorkflowNodeData } from "@/modules/workflow/types/Workflow.types";

export interface WorkflowSidebarProps {
  nodeDetail: Node<WorkflowNodeData> | null
}

export const WorkflowSidebar = ({
  nodeDetail,
}: WorkflowSidebarProps): JSX.Element => {
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
        {nodeDetail && (
          <div>
            <div>Node detail</div>
            <p>{nodeDetail?.data?.label}</p>
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