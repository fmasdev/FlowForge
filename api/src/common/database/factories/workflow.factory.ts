// src/common/database/factories/workflow.factory.ts

import { DataSource, Repository } from 'typeorm';
import { faker } from '@faker-js/faker';
import { User } from '@/modules/user/entities/user.entity';
import { Workflow } from '@/modules/workflow/entities/workflow.entity';
import { NotFoundException } from '@nestjs/common';

export class WorkflowFactory {
  static async create(dataSource: DataSource): Promise<Workflow> {
    const userRepo = dataSource.getRepository(User);
    const workflowRepo = dataSource.getRepository(Workflow);
    const user: User | null = await userRepo
      .createQueryBuilder('user')
      .orderBy('RANDOM()')
      .limit(1)
      .getOne();
  
    if (!user) {
      throw new NotFoundException('No users. Please seed users before workflows.')
    }

    const workflow = workflowRepo.create({
      name: faker.company.name(),
      description: faker.lorem.sentence(),
      lastExecution: faker.date.between({ from: '2000-01-01', to: Date.now() }),
      createdBy: user,
    });
    
    return workflow;
  }
}
