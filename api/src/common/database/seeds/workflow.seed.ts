// src/common/database/seeds/workflow.seed.ts

import { DataSource } from 'typeorm';
import { Workflow } from '@/modules/workflow/entities/workflow.entity';
import { WorkflowFactory } from '../factories/workflow.factory';

export class WorkflowSeeder {
  async run(dataSource: DataSource, count = 10) {
    const workflowRepo = dataSource.getRepository(Workflow);

    for (let i = 0; i < count; ++i) {
      const workflow = await WorkflowFactory.create(dataSource)
      await workflowRepo.save(workflow)
    }

    console.log(`✅ Seeded ${count} workflows`);
  }
}
