import { Module } from '@nestjs/common';
import { ExecutionLogService } from './execution-log.service';
import { ExecutionLogGateway } from './execution-log.gateway';

@Module({
  providers: [ExecutionLogGateway, ExecutionLogService],
})
export class ExecutionLogModule {}
