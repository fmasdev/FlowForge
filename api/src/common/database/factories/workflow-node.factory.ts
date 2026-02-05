// src/common/database/factories/workflow-node.factory.ts

import { v4 as uuidv4 } from 'uuid';
import { faker } from '@faker-js/faker';
import { Workflow } from "@/modules/workflow/entities/workflow.entity";
import { WorkflowNode } from "@/modules/workflow-node/entities/workflow-node.entity";
import { WorkflowNodeType } from '@/modules/workflow-node/enums/workflow-node-type.enum';
import { HttpNodeConfigDto } from '@/modules/workflow-node/dto/node-config/http-node-config.dto';
import { ConditionNodeConfigDto } from '@/modules/workflow-node/dto/node-config/condition-node-config.dto';
import { DelayNodeConfigDto } from '@/modules/workflow-node/dto/node-config/delay-node-config.dto';
import { EmailNodeConfigDto } from '@/modules/workflow-node/dto/node-config/email-node-config.dto';
import { ScriptNodeConfigDto } from '@/modules/workflow-node/dto/node-config/script-node-config.dto';

export class WorkflowNodeFactory {
  static createHttpNode(workflow: Workflow): Partial<WorkflowNode> {
    const config: HttpNodeConfigDto = {
      url: 'https://jsonplaceholder.typicode.com/todos/1',
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    };

    return {
      label: 'HTTP request',
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
      label: 'Condition',
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
      label: 'Delay',
      type: WorkflowNodeType.DELAY,
      workflow,
      config,
      positionX: Math.floor(Math.random() * 100),
      positionY: Math.floor(Math.random() * 100),
    };
  }

  static createEmailNode(workflow: Workflow): Partial<WorkflowNode> {
    const config: EmailNodeConfigDto = {
      to: faker.internet.email(),
      subject: faker.lorem.words(2),
      text: faker.lorem.sentence(),
    };

    return {
      label: 'Email',
      type: WorkflowNodeType.EMAIL,
      workflow,
      config,
      positionX: Math.floor(Math.random() * 100),
      positionY: Math.floor(Math.random() * 100),
    };
  }

  static createScriptNode(workflow: Workflow): Partial<WorkflowNode> {
    const config: ScriptNodeConfigDto = {
      language: 'js',
      code: 'console.log("Hello world")',
    };
    return {
      label: 'Script',
      type: WorkflowNodeType.SCRIPT,
      workflow,
      config: config,
      positionX: Math.floor(Math.random() * 100),
      positionY: Math.floor(Math.random() * 100),
    };
  }
}