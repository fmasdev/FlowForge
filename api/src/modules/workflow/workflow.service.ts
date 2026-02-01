// src/modules/workflow/workflow.service.ts

import { JwtUserPayload } from '@/modules/auth/auth.service';
import { User } from '@/modules/user/entities/user.entity';
import { UserService } from '@/modules/user/user.service';
import { CreateWorkflowDto } from '@/modules/workflow/dto/create-workflow.dto';
import { PaginationDto } from '@/common/dto/pagination.dto';
import { UpdateWorkflowDto } from '@/modules/workflow/dto/update-workflow.dto';
import { WorkflowResponseDto } from '@/modules/workflow/dto/workflow-response.dto';
import { Workflow } from '@/modules/workflow/entities/workflow.entity';
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pagination, ServiceResponse } from '@/common/types/response.types';
import { SortDirection } from '@/common/enums/sortDirection.enum';

@Injectable()
export class WorkflowService {
  constructor(
    @InjectRepository(Workflow)
    private readonly workflowRepository: Repository<Workflow>,
    private readonly userService: UserService,
  ) {}

  async create(
    workflowInput: CreateWorkflowDto,
    jwtUser: JwtUserPayload,
  ): Promise<Workflow> {
    const user: User | null = await this.userService.findOneById(jwtUser.sub);

    if (!user) {
      throw new NotFoundException(
        `Cannot find user where id is #${jwtUser.sub}`,
      );
    }

    const workflow = this.workflowRepository.create({
      name: workflowInput.name,
      description: workflowInput.description,
      createdBy: user,
    });

    return this.workflowRepository.save(workflow);
  }

  async findOne(id: string) {
    const workflow: Workflow | null = await this.workflowRepository.findOne({
      where: {
        id: id,
      },
      relations: ['createdBy'],
    });

    if (!workflow) {
      throw new NotFoundException(`Cannot find workflow where id is #${id}`);
    }

    return {
      id: workflow.id,
      name: workflow.name,
      description: workflow.description,
      createdBy: {
        id: workflow.createdBy.id,
        firstname: workflow.createdBy.firstname,
        lastname: workflow.createdBy.lastname,
        email: workflow.createdBy.email,
      },
    } as WorkflowResponseDto;
  }

  async findAll({
    page,
    limit,
    sortBy = 'createdAt',
    sortDirection = SortDirection.DESC,
    search,
  }: PaginationDto,
    jwtUser: JwtUserPayload
  ): Promise<ServiceResponse<Workflow[], Pagination>> {
    const qb = this.workflowRepository.createQueryBuilder('workflow');
    console.log(jwtUser.sub)
    qb.leftJoin('workflow.createdBy', 'user')
      .addSelect(['user.id', 'user.email', 'user.firstname', 'user.lastname'])
      .where('workflow.createdBy.id = :userId', { userId: jwtUser.sub });

    if (search) {
      qb.andWhere(
        'workflow.name ILIKE :search OR workflow.description ILIKE :search',
        { search: `%${search}%` },
      );
    }

    if (sortBy && sortDirection) {
      qb.orderBy(`workflow.${sortBy}`, sortDirection);
    }

    qb.take(limit).skip((page - 1) * limit);

    const [data, total] = await qb.getManyAndCount();
    
    return {
      data,
      meta: {
        page,
        limit,
        pages: Math.ceil(total / limit),
        sortBy,
        sortDirection,
      },
    };
  }

  async update(
    id: string,
    workflowInput: UpdateWorkflowDto,
    jwtUser: JwtUserPayload,
  ): Promise<Workflow> {
    const workflow: Workflow | null = await this.workflowRepository.findOne({
      where: { id: id },
      relations: ['createdBy'],
    });

    if (!workflow)
      throw new NotFoundException(
        `Cannot find workflow where id is #${id}`,
      );

    if (workflow.createdBy.id !== jwtUser.sub) {
      throw new UnauthorizedException(
        'You cannot update this workflow because you are not author.',
      );
    }

    Object.assign(workflow, workflowInput);

    return await this.workflowRepository.save(workflow);
  }

  async remove(id: string, jwtUser: JwtUserPayload): Promise<Workflow | null> {
    const workflow: Workflow | null = await this.workflowRepository.findOne({
      where: { id: id },
      relations: ['createdBy'],
    });

    if (!workflow)
      throw new NotFoundException(`Cannot find workflow where id is #${id}`);

    if (jwtUser.sub !== workflow.createdBy.id)
      throw new UnauthorizedException(
        'You cannot remove this workflow because you are not author.',
      );
    const removed = await this.workflowRepository.remove(workflow);
    
    return removed ? workflow : null
  }
}
