// src/modules/workflow/components/react-flow/nodes/StartNode.tsx

import { WorkflowNodeProps } from "@/modules/workflow/types/Workflow.types";
import { Handle, Position } from "@xyflow/react";

export function HttpNode({ data, selected }: WorkflowNodeProps) {
  return (
    <div className={`text-gray-50 p-2 rounded-xl flex flex-col items-center justify-center gap-2
      ${selected ? 'bg-gray-600 border-4 border-green-400' : 'bg-gray-800 border-2 border-green-600'}`}
    >
      {data.label ?? 'Start'}

      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}