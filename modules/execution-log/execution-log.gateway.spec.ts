import { Test, TestingModule } from '@nestjs/testing';
import { ExecutionLogGateway } from './execution-log.gateway';
import { ExecutionLogService } from './execution-log.service';

describe('ExecutionLogGateway', () => {
  let gateway: ExecutionLogGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExecutionLogGateway, ExecutionLogService],
    }).compile();

    gateway = module.get<ExecutionLogGateway>(ExecutionLogGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
