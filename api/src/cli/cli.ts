import { AppModule } from '@/app.module';
import { createUserCommand } from '@/cli/commands/create-user.command';
import { UserService } from '@/modules/user/user.service';
import { NestFactory } from '@nestjs/core';
import { Command } from 'commander';

const bootstrap = async (): Promise<void> => {
  const app = await NestFactory.createApplicationContext(AppModule, {
    logger: ['error', 'warn', 'log', 'debug', 'verbose'],
  });

  console.log('CLI bootstrap started');

  const userService = app.get(UserService);

  const program = new Command();
  program.addCommand(createUserCommand(userService));

  await program.parseAsync(process.argv);

  await app.close();
};

bootstrap().catch((err) => {
  console.error(err);
  process.exit(1);
});
