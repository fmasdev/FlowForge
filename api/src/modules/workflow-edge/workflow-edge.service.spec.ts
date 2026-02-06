import { Test, TestingModule } from '@nestjs/testing';
import { WorkflowEdgeService } from './workflow-edge.service';

describe('WorkflowEdgeService', () => {
  let service: WorkflowEdgeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WorkflowEdgeService],
    }).compile();

    service = module.get<WorkflowEdgeService>(WorkflowEdgeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
