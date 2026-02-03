// src/modules/workflow/components/workflow-canvas/WorkflowCanvas.tsx

import { JSX } from "react";

export interface WorkflowCanvasProps {}

export const WorkflowCanvas: React.FC<WorkflowCanvasProps> = ({

}: WorkflowCanvasProps): JSX.Element => {
  return (
    <div>
      <div>WorkflowCanvas</div>
      <hr />
      
      <ul> todo:
        <li>display nodes</li>
        <li>display edges</li>
        <li>manage zoom/plan</li>
        <li>visual interaction only</li>
      </ul>
    </div>
  );
};