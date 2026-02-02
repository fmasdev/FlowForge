import { Module } from '@nestjs/common';
import { WorlflowNodeController } from './worlflow-node.controller';
import { WorlflowNodeService } from './worlflow-node.service';

@Module({
  controllers: [WorlflowNodeController],
  providers: [WorlflowNodeService]
})
export class WorlflowNodeModule {}
