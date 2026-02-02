// src/common/database/factories/workflow-node.factory.ts

import { v4 as uuidv4 } from 'uuid';
import { ConditionNodeConfigDto } from "@/modules/workflow-node/dto/condition-node-config.dto";
import { DelayNodeConfigDto } from "@/modules/workflow-node/dto/delay-node-config.dto";
import { HttpNodeConfigDto } from "@/modules/workflow-node/dto/http-node-config.dto";
import { WorkflowNode } from "@/modules/workflow-node/entities/workflow-node.entity";
import { Workflow } from "@/modules/workflow/entities/workflow.entity";
import { WorkflowNodeType } from '@/modules/workflow-node/enums/workflow-node-type.enum';

export class WorkflowNodeFactory {
  static createHttpNode(workflow: Workflow): Partial<WorkflowNode> {
    const config: HttpNodeConfigDto = {
      url: 'https://jsonplaceholder.typicode.com/todos/1',
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    };

    return {
      type: WorkflowNodeType.HTTP,
      workflow,
      config,
      positionX: Math.floor(Math.random() * 100),
      positionY: Math.floor(Math.random() * 100),
    };
  }

  static createConditionNode(
    workflow: Workflow,
    trueNodeId?: string,
    falseNodeId?: string,
  ): Partial<WorkflowNode> {
    const config: ConditionNodeConfigDto = {
      expression: 'value > 10',
      trueNodeId: trueNodeId ?? uuidv4(),
      falseNodeId: falseNodeId ?? uuidv4(),
      variables: ['value'],
    };

    return {
      type: WorkflowNodeType.CONDITION,
      workflow,
      config,
      positionX: Math.floor(Math.random() * 100), 
      positionY: Math.floor(Math.random() * 100),
    };
  }

  static createDelayNode(workflow: Workflow): Partial<WorkflowNode> {
    const config: DelayNodeConfigDto = {
      durationMs: 5000,
      jitterMs: 1000,
    };

    return {
      type: WorkflowNodeType.DELAY,
      workflow,
      config,
      positionX: Math.floor(Math.random() * 100),
      positionY: Math.floor(Math.random() * 100),
    };
  }
}