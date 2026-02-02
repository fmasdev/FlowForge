// src/common/database/factories/workflow-node.factory.ts

import { Workflow } from "@/modules/workflow/entities/workflow.entity";
import { WorkflowNode } from "@/modules/worlflow-node/entities/workflow-node.entity";

export class WorkflowNodeFactory {
  static createHttpNode(workflow: Workflow): Partial<WorkflowNode> {
    return {
      type: 'http',
      workflow,
      positionX: Math.floor(Math.random() * 800),
      positionY: Math.floor(Math.random() * 600),
      config: {
        url: 'https://example.com',
        method: 'GET',
        headers: {},
        body: '',
      },
    };
  }

  static createConditionNode(workflow: Workflow): Partial<WorkflowNode> {
    return {
      type: 'condition',
      workflow,
      positionX: Math.floor(Math.random() * 800),
      positionY: Math.floor(Math.random() * 600),
      config: {
        operator: 'equals',
        left: 'status',
        right: 'success',
      },
    };
  }

  static createDelayNode(
    workflow: Workflow,
  ): Partial<WorkflowNode> {
    return {
      type: 'delay',
      workflow,
      positionX: Math.floor(Math.random() * 800),
      positionY: Math.floor(Math.random() * 600),
      config: {
        delayMs: 2000,
      },
    };
  }
}