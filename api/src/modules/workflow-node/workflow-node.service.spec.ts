import { Test, TestingModule } from '@nestjs/testing';
import { WorkflowNodeService } from './workflow-node.service';

describe('WorkflowNodeService', () => {
  let service: WorkflowNodeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WorkflowNodeService],
    }).compile();

    service = module.get<WorkflowNodeService>(WorkflowNodeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
