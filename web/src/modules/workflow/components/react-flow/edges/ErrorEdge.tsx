// src/modules/workflow/components/react-flow/edges/ErrorEdge.tsx

import { JSX } from "react";
import { BaseEdge, EdgeLabelRenderer, EdgeProps, getBezierPath } from "@xyflow/react";

export const ErrorEdge: React.FC<EdgeProps> = ({
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
          stroke: '#ef4444',
          color: '#ef4444',
          strokeWidth: selected ? 3 : 2,
          strokeDasharray: '6 4',
        }}
      />
      
      {label && (
        <EdgeLabelRenderer>  
          <div
            className="bg-red-500 px-1 py-1 rounded text-white text-xs absolute -translate-x-1/2 -translate-y-1/2 nodrag nopan"
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