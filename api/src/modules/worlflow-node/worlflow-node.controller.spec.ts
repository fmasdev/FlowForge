import { Test, TestingModule } from '@nestjs/testing';
import { WorlflowNodeController } from './worlflow-node.controller';

describe('WorlflowNodeController', () => {
  let controller: WorlflowNodeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WorlflowNodeController],
    }).compile();

    controller = module.get<WorlflowNodeController>(WorlflowNodeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
