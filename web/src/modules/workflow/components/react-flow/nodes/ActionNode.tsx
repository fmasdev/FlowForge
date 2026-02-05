// src/modules/workflow/components/react-flow/nodes/WorkflowNode.tsx

import { WorkflowNodeProps } from "@/modules/workflow/types/Workflow.types";
import { Handle, Position } from "@xyflow/react";



export function ActionNode({ data, selected }: WorkflowNodeProps) {
  return (
    <div className={`text-gray-50 p-2 rounded-md flex flex-col items-center justify-center gap-2
        ${selected ? 'bg-gray-600 border-4 border-cyan-500' : 'bg-gray-800 border-2 border-blue-500'}`}
    >
      {data.label}
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}