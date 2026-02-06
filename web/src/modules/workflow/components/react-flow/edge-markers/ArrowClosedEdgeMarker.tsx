// src/modules/workflow/components/react-flow/edge-markers/ArrowClosedEdgeMarker.tsx

import { JSX } from "react";

export const ArrowClosedEdgeMarker: React.FC<{ height?: number; width?: number }> = ({
  height = 6,
  width = 6,
}): JSX.Element => {
  return (
    <svg style={{ position: 'absolute', width: 0, height: 0 }}>
      <defs>
        <marker
          id="arrowclosed"
          markerWidth={width}
          markerHeight={height}
          viewBox="0 0 24 24"
          refX="12"
          refY="12"
          orient="auto"
          markerUnits="strokeWidth"
        >
          <path d="M0,0 L0,24 L24,12 z" fill="context-stroke" />
        </marker>
      </defs>
    </svg>
  );
}
