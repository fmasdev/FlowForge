// src/modules/workflow/components/WorkflowNodeDetail.tsx

import { WorkflowNodeType } from "@/modules/workflow/enums/workflow-node-type.enum";
import { WorkflowNodeConditionConfig, WorkflowNodeData, WorkflowNodeDelayConfig, WorkflowNodeDetailProps, WorkflowNodeEmailConfig, WorkflowNodeHttpConfig, WorkflowNodeScriptConfig, WorkflowNodeWebhookConfig } from "@/modules/workflow/types/Workflow.types";
import React, { JSX } from "react";

export const WorkflowNodeDetail: React.FC<WorkflowNodeDetailProps> = ({
  node,
}: WorkflowNodeDetailProps): JSX.Element => {

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
            title={`${httpConfig.method} ${httpConfig.url}`}
          >
            {`${httpConfig.method} ${httpConfig.url}`}
          </div>
          {!!httpConfig.headers && (
            <div>
              Headers:
              <pre>{ JSON.stringify(httpConfig.headers, null, 2)}</pre>
            </div>
          )}
          {!!httpConfig.body && (
            <div>
              Body:
              <pre>{ JSON.stringify(httpConfig.body, null, 2)}</pre>
            </div>
          )}
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
      );
    
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
      );
    
    case WorkflowNodeType.EMAIL:
      const emailConfig = node.originalNode.config as WorkflowNodeEmailConfig;
      return (
        <div>
          <div>
            {node.originalNode.label}
          </div>
          <div>{emailConfig.to}</div>
          <div>{emailConfig.subject}</div>
          <div>{emailConfig.text}</div>
        </div>
      );
    
    case WorkflowNodeType.WEBHOOK:
      const webhookConfig = node.originalNode.config as WorkflowNodeWebhookConfig;
      return (
        <div>
          <div>
            {node.originalNode.label}
          </div>
          <div>
            {webhookConfig.uri}
            {webhookConfig.method}
            {!!webhookConfig.headers && (
              <div>
                Headers:
                <pre>
                  {JSON.stringify(webhookConfig.headers, null, 2)}
                </pre>
              </div>
            )}
            {!!webhookConfig.body && (
              <div>
                Headers:
                <pre>
                  {JSON.stringify(webhookConfig.body, null, 2)}
                </pre>
              </div>
            )}
          </div>
        </div>
      );
    
    case WorkflowNodeType.SCRIPT:
      const scriptConfig = node.originalNode.config as WorkflowNodeScriptConfig;
      return (
        <div>
          <div>
            {node.originalNode.label}
          </div>
          <div>
            {scriptConfig.language}
          </div>
          <div>
            {scriptConfig.code}
          </div>
        </div>
      );
  }
} 