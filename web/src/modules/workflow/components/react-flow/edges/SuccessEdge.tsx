// src/modules/workflow/components/react-flow/edges/SuccessEdge.tsx

import { JSX } from "react";
import { BaseEdge, EdgeLabelRenderer, EdgeProps, getBezierPath } from "@xyflow/react";

export const SuccessEdge: React.FC<EdgeProps> = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  selected,
  label
}): JSX.Element => {
  const [path, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition
  });
  
  return (
    <>
      <BaseEdge
        id={id}
        path={path}
        markerEnd="url(#arrowclosed)"
        style={{
          stroke: '#22c55e',
          strokeWidth: selected ? 3 : 2,
        }}
      />
      {label && (
        <EdgeLabelRenderer>
          <div
            className="bg-green-500 px-1 py-1 rounded text-white text-xs absolute -translate-x-1/2 -translate-y-1/2 nodrag nopan"
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