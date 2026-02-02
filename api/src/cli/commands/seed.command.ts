// src/cli/commands/seed.command.ts

import { Command } from 'commander';
import { DataSource } from 'typeorm';
import { seedWorkflowCommand } from '@/cli/commands/seed-workflow.command';
import { seedWorkflowNodeCommand } from '@/cli/commands/seed-workflow-node.command';

export const seedCommand = (datasource: DataSource): Command =>
  new Command('seed')
    .description('Seed database with fake data')
    .addCommand(seedWorkflowCommand(datasource))
    .addCommand(seedWorkflowNodeCommand(datasource));
    