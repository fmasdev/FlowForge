// src/modules/workflow-node/workflow-node.service.ts

import { WorkflowNode } from '@/modules/workflow-node/entities/workflow-node.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class WorkflowNodeService {
  create(workflowNode: WorkflowNode) {
    return 'This action adds a new worlflowNode';
  }
}
