import { Module } from '@nestjs/common';
import { WorkflowNodeController } from './workflow-node.controller';
import { WorkflowNodeService } from './workflow-node.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkflowNode } from '@/modules/workflow-node/entities/workflow-node.entity';
import { WorkflowModule } from '@/modules/workflow/workflow.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([WorkflowNode]),
    WorkflowModule
  ],
  controllers: [WorkflowNodeController],
  providers: [WorkflowNodeService]
})
export class WorkflowNodeModule {}
