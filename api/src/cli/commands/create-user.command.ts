import { Role } from '@/common/enums/role.enum';
import type { UserService } from '@/modules/user/user.service';
import { Command } from 'commander';

export interface CreateUserCli {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  role?: Role;
}

export const createUserCommand = (userService: UserService): Command => {
  const command = new Command('create-user');
  
  command
    .description('Create a new user')
    .requiredOption('-e, --email <email>', 'User email')
    .requiredOption('-p, --password <password>', 'User password')
    .requiredOption('-f, --firstname <firstname>', 'User firstname')
    .requiredOption('-l, --lastname <lastname>', 'User lastname')
    .option(
      '-r, --role <role>',
      'User role',
      (value) => parseRole(value),
      Role.USER,
    )
    .action(async (options: CreateUserCli) => {
      const user = await userService.create(<CreateUserCli>{
        email: options.email,
        password: options.password,
        firstname: options.firstname,
        lastname: options.lastname,
        role: options.role,
      });
      console.log(`User ${options.email} created`);
      process.exit(0);
    });

  return command;
};

const parseRole = (role: string): Role => {
  const matched = Object.values(Role).find(
    (value) => value.toLowerCase() === role.toLowerCase(),
  );

  if (!matched) {
    throw new Error(
      `Invalid role "${role}". Allowed values: ${Object.values(Role).join(', ')}`,
    );
  }

  return matched;
};
