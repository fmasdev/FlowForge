// src/cli/commands/seed-workflow-edge.command.ts

import { WorkflowEdgeSeeder } from "@/common/database/seeds/workflow-edge-seed";
import { Command } from "commander";
import { DataSource } from "typeorm";

export const seedWorkflowEdgeCommand = (
  dataSource: DataSource
) => {
  const command = new Command('seed-workflow-edge');

  command
      .description('Seed workflow edges')
      .action(async () => {
        if (process.env.NODE_ENV === 'production') {
          throw new Error('Seeding is forbidden in production');
        }
  
        await new WorkflowEdgeSeeder().run(dataSource);
        console.log(`Seeded workflows nodes`);
      });
    
    return command;
};