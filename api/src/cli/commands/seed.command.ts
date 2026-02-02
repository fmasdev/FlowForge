// src/cli/commands/seed.command.ts

import { Command } from 'commander';
import { DataSource } from 'typeorm';
import { WorkflowSeeder } from '@/common/database/seeds';
import { Workflow } from '@/modules/workflow/entities/workflow.entity';
import { WorkflowNode } from '@/modules/worlflow-node/entities/workflow-node.entity';

export const seedCommand = (dataSource: DataSource): Command => {
  const command = new Command('seed')

  command
    .description('Seed database with fake data')
    .option('-w, --workflows <number>', 'Number of workflows', '20')
    .action(async (options) => {
      if (process.env.NODE_ENV === 'production') {
        throw new Error('Seeding is forbidden in production');
      }
      // Workflows
      const workflowsCount = Number(options.workflows);
      await new WorkflowSeeder().run(dataSource, workflowsCount);
      console.log(`Seeded ${workflowsCount} workflows`);

      // WorkflowNodes
      const workflowRepo = dataSource.getRepository(Workflow);
          const nodeRepo = dataSource.getRepository(WorkflowNode);
      const workflows: Workflow[] = await workflowRepo.find();
      
      // WorkflowNodes
      await new WorkflowNodeSeeder().run(dataSource);
      console.log(`Seeded workflows nodes`);

      console.log(`Seeded ${workflowsCount} workflows`);
    })

  return command;
};  
