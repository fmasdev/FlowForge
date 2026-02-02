// src/cli/commands/seed-workflow-node.command.ts

import { WorkflowNodeSeeder } from "@/common/database/seeds/workflow-node.seed";
import { Command } from "commander";
import { DataSource } from "typeorm";

export const seedWorkflowNodeCommand = (
  dataSource: DataSource
): Command => {
  const command = new Command('seed-workflow-node');

  command
    .description('Seed workflow nodes')
    .action(async () => {
      if (process.env.NODE_ENV === 'production') {
        throw new Error('Seeding is forbidden in production');
      }

      await new WorkflowNodeSeeder().run(dataSource);
      console.log(`Seeded workflows nodes`);
    });
  
  return command;
};  