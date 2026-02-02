import { Workflow } from '@/modules/workflow/entities/workflow.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class WorlflowNodeService {



  create(workflow: Workflow) {
    return 'This action adds a new worlflowNode';
  }
}
