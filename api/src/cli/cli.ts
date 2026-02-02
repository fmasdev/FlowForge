// src/cli/cli.ts

import { Command } from 'commander';
import { AppModule } from '@/app.module';
import { UserService } from '@/modules/user/user.service';
import { NestFactory } from '@nestjs/core';
import { DataSource } from 'typeorm';
import { createUserCommand } from '@/cli/commands/create-user.command';
import { seedWorkflowCommand } from '@/cli/commands/seed-workflow.command';
import { seedWorkflowNodeCommand } from '@/cli/commands/seed-workflow-node.command';

const bootstrap = async (): Promise<void> => {
  const app = await NestFactory.createApplicationContext(AppModule, {
    logger: ['error', 'warn', 'log', 'debug', 'verbose'],
  });

  console.log('CLI bootstrap started');

  const userService = app.get(UserService);

  const dataSource = app.get(DataSource);
  const program = new Command();
  program.addCommand(createUserCommand(userService));
  program.addCommand(seedWorkflowCommand(dataSource));
  program.addCommand(seedWorkflowNodeCommand(dataSource));

  await program.parseAsync(process.argv);

  await app.close();
};

bootstrap().catch((err) => {
  console.error(err);
  process.exit(1);
});
