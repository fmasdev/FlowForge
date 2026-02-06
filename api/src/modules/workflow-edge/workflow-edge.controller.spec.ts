import { Test, TestingModule } from '@nestjs/testing';
import { WorkflowEdgeController } from './workflow-edge.controller';

describe('WorkflowEdgeController', () => {
  let controller: WorkflowEdgeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WorkflowEdgeController],
    }).compile();

    controller = module.get<WorkflowEdgeController>(WorkflowEdgeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
