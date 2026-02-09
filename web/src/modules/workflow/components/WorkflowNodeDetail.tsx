// src/modules/workflow/components/WorkflowNodeDetail.tsx

import { WorkflowNodeType } from "@/modules/workflow/enums/workflow-node-type.enum";
import { WorkflowNodeConditionConfig, WorkflowNodeData, WorkflowNodeDelayConfig, WorkflowNodeHttpConfig } from "@/modules/workflow/types/Workflow.types";
import React, { JSX } from "react";

export const WorkflowNodeDetail: React.FC<WorkflowNodeData> = ( node: WorkflowNodeData): JSX.Element => {

  console.log(node.originalNode.config)
  switch (node.originalNode.type) {
    case WorkflowNodeType.HTTP:
      const httpConfig = node.originalNode.config as WorkflowNodeHttpConfig;
      return (
        <div>
          <div>
            {node.originalNode.label}
          </div>
          <div
            className="whitespace-nowrap"
            title={`${httpConfig.method} ${httpConfig.url}`}>
            {`${httpConfig.method} ${httpConfig.url}`}
          </div>
        </div>
      );
    case WorkflowNodeType.CONDITION:
      const conditionConfig = node.originalNode.config as WorkflowNodeConditionConfig;
      return (
        <div>
          <div>
            {node.originalNode.label}
          </div>
          <div>
            {conditionConfig.expression}
          </div>
        </div>
      )
    case WorkflowNodeType.DELAY: 
      const delayConfig = node.originalNode.config as WorkflowNodeDelayConfig;
      return (
        <div>
          <div>
              {node.originalNode.label}
          </div>
          <div>Duration : {delayConfig.durationMs}</div>
          <div>Duration : {delayConfig.jitterMs}</div>
        </div>
      )
    case WorkflowNodeType.EMAIL:
      return (
        <div>
          <div>
            {node.originalNode.label}
          </div>
        </div>
      )
    case WorkflowNodeType.WEBHOOK:
    case WorkflowNodeType.SCRIPT:
      return (
        <div>
          <div>
            {node.originalNode.label}
          </div>
        </div>
      )
    
  }
} 