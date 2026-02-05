// src/modules/workflow/components/react-flow/nodes/ConditionNode.tsx

import { WorkflowNodeProps } from "@/modules/workflow/types/Workflow.types";
import { Handle, Position } from "@xyflow/react";

export function ConditionNode({ data, selected }: WorkflowNodeProps) {
  return (
    <div className={`
        text-gray-50 p-2 rounded-md flex flex-col items-center justify-center gap-2
        ${selected ? 'bg-gray-600 border-4 border-stale-500' : 'bg-gray-800 border-2 border-stale-500'}`}
    >
      <strong>{data.label}</strong>

      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Left} id="false" style={{
          background: 'red',
          width: 6,
          height: 6,
          borderRadius: '50%',
        }} />
      <Handle type="source" position={Position.Right} id="true" style={{
          background: 'green',
          width: 6,
          height: 6,
          borderRadius: '50%',
        }}/>
    </div>
  );
}