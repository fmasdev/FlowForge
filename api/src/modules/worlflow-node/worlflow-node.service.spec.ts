import { Test, TestingModule } from '@nestjs/testing';
import { WorlflowNodeService } from './worlflow-node.service';

describe('WorlflowNodeService', () => {
  let service: WorlflowNodeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WorlflowNodeService],
    }).compile();

    service = module.get<WorlflowNodeService>(WorlflowNodeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
