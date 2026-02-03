import { Module } from '@nestjs/common';
import { WorkflowEdgeController } from './workflow-edge.controller';
import { WorkflowEdgeService } from './workflow-edge.service';

@Module({
  controllers: [WorkflowEdgeController],
  providers: [WorkflowEdgeService]
})
export class WorkflowEdgeModule {}
