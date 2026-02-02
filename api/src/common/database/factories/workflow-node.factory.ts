// src/common/database/factories/workflow-node.factory.ts

import { WorkflowNode } from "@/modules/workflow-node/entities/workflow-node.entity";
import { WorkflowNodeType } from "@/modules/workflow-node/enums/workflow-node-type.enum";
import { Workflow } from "@/modules/workflow/entities/workflow.entity";

export class WorkflowNodeFactory {
  static createHttpNode(workflow: Workflow): Partial<WorkflowNode> {
    return {
      type: WorkflowNodeType.HTTP,
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
      type: WorkflowNodeType.CONDITION,
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
      type: WorkflowNodeType.DELAY,
      workflow,
      positionX: Math.floor(Math.random() * 800),
      positionY: Math.floor(Math.random() * 600),
      config: {
        delayMs: 2000,
      },
    };
  }
}