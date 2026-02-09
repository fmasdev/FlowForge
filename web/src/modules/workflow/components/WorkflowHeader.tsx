// src/modules/workflow/components/workflow-header/WorkflowHeader.tsx

import { JSX } from "react"
import { useTranslation } from "react-i18next";
import { Workflow } from "@/modules/workflow/types/Workflow.types";

export interface WorkflowHeaderProps {
  workflow: Workflow
  actions?: React.ReactNode;
}

export const WorkflowHeader: React.FC<WorkflowHeaderProps> = ({
  workflow,
  actions,
}: WorkflowHeaderProps): JSX.Element => {
  const { t } = useTranslation('workflow')

  return (
    <header className="flex flex-col gap-4 pt-4 border-b border-white/10 pb-2">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h1 className="truncate text-2xl font-semibold text-white">
            {workflow.name}
          </h1>

          {workflow.description && (
            <p className="mt-1 max-w-3xl text-sm text-gray-400">
              {workflow.description}
            </p>
          )}
        </div>

        {actions && (
          <div className="flex shrink-0 items-center gap-2">
            {actions}
          </div>
        )}
      </div>
    </header>
  );
};