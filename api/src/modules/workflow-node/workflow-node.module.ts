import { Module } from '@nestjs/common';
import { WorkflowNodeController } from './workflow-node.controller';
import { WorkflowNodeService } from './workflow-node.service';

@Module({
  controllers: [WorkflowNodeController],
  providers: [WorkflowNodeService]
})
export class WorkflowNodeModule {}
