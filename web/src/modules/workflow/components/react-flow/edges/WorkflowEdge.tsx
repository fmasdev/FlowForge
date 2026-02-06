// src/modules/workflow/components/react-flow/edges/WorkflowEdge.tsx

import { JSX } from "react";
import { BaseEdge, EdgeLabelRenderer, EdgeProps, getStraightPath } from "@xyflow/react";

export const WorkflowEdge: React.FC<EdgeProps> = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  selected,
  label
}): JSX.Element => {
  const [path, labelX, labelY] = getStraightPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });

  return (
    <>
      <BaseEdge
        id={id}
        path={path}
        markerEnd="url(#arrowclosed)"
        style={{
          stroke: '#9ca3af',
          strokeWidth: selected ? 3 : 2,
        }}
      />
      {label && (
        <EdgeLabelRenderer>  
          <div
            className="bg-gray-600 px-1 py-1 rounded text-white text-xs absolute -translate-x-1/2 -translate-y-1/2 nodrag nopan"
            style={{
              left: labelX,
              top: labelY,
            }}
          >
            {label}
          </div>
        </EdgeLabelRenderer>
      )}
    </>
  );
}