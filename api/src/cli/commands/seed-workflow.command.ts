// src/cli/commands/seed.command.ts

import { Command } from 'commander';
import { DataSource } from 'typeorm';
import { WorkflowSeeder } from '@/common/database/seeds';

export const seedWorkflowCommand = (dataSource: DataSource): Command => {
  const command = new Command('seed-workflow');

  command
    .description('Seed database with fake data')
    .option('-w, --workflows <number>', 'Number of workflows', '20')
    .action(async (options) => {
      if (process.env.NODE_ENV === 'production') {
        throw new Error('Seeding is forbidden in production');
      }

      const workflowsCount = Number(options.workflows);

      await new WorkflowSeeder().run(dataSource, workflowsCount);
      
      console.log(`Seeded ${workflowsCount} workflows`);
    });

  return command;
};
