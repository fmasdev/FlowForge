import { Test, TestingModule } from '@nestjs/testing';
import { WorkflowNodeController } from './workflow-node.controller';

describe('WorkflowNodeController', () => {
  let controller: WorkflowNodeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WorkflowNodeController],
    }).compile();

    controller = module.get<WorkflowNodeController>(WorkflowNodeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
