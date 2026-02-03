// src/modules/workflow-node/workflow-node.service.ts

import { JwtUserPayload } from '@/modules/auth/auth.service';
import { CreateWorkflowNodeDto } from '@/modules/workflow-node/dto/create-workflow-node.dto';
import { UpdateWorkflowNodeDto } from '@/modules/workflow-node/dto/update-workflow-node.dto';
import { WorkflowNode } from '@/modules/workflow-node/entities/workflow-node.entity';
import { Workflow } from '@/modules/workflow/entities/workflow.entity';
import { WorkflowService } from '@/modules/workflow/workflow.service';
import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { instanceToPlain } from 'class-transformer';
import { Repository, UpdateResult } from 'typeorm';

@Injectable()
export class WorkflowNodeService {
  constructor(
    @InjectRepository(WorkflowNode)
    private readonly workflowNodeRepository: Repository<WorkflowNode>,
    private readonly workflowService: WorkflowService,
  ) {}

  async create(
    workflowId: string,
    createWorkflowNodeDto: CreateWorkflowNodeDto,
    jwtUser: JwtUserPayload,
  ): Promise<WorkflowNode> {
    const workflow = await this.workflowService.getOwnedWorkflow(
      createWorkflowNodeDto.workflowId,
      jwtUser.sub,
    );

    if (!workflow) {
      throw new NotFoundException(
        `Cannot find workflow where id is #${createWorkflowNodeDto.workflowId}`,
      );
    }

    if (workflow.createdBy.id !== jwtUser.sub) {
      throw new UnauthorizedException(
        'You cannot create this workflow node because you are not the workflow owner.',
      );
    }

    const workflowNode = this.workflowNodeRepository.create({
      type: createWorkflowNodeDto.type,
      config: instanceToPlain(createWorkflowNodeDto.config),
      positionX: createWorkflowNodeDto.positionX,
      positionY: createWorkflowNodeDto.positionY,
      workflow: workflow,
    });

    return await this.workflowNodeRepository.save(workflowNode);
  }

  async update(
    workflowId: string,
    workflowNodeId: string,
    UpdateWorkflowNodeDto: UpdateWorkflowNodeDto,
    jwtUser: JwtUserPayload,
  ): Promise<WorkflowNode> {
    const workflowNode: WorkflowNode | null =
      await this.workflowNodeRepository.findOne({
        where: { id: workflowNodeId },
        relations: ['workflow', 'workflow.createdBy'],
      });

    if (!workflowNode) {
      throw new NotFoundException(
        `Cannot find workflow node where id is #${workflowNodeId}`,
      );
    }

    if (workflowNode.workflow.createdBy.id !== jwtUser.sub) {
      throw new UnauthorizedException(
        'You cannot remove this workflow node because you are not the workflow owner.',
      );
    }

    if (workflowNode.workflow.createdBy.id !== jwtUser.sub) {
      throw new UnauthorizedException(
        'You cannot update this workflow node because you are not the workflow owner.',
      );
    }

    const upToDateWorkflowNode: WorkflowNode = Object.assign(workflowNode, {
      type: UpdateWorkflowNodeDto.type,
      config: instanceToPlain(UpdateWorkflowNodeDto.config),
      positionX: UpdateWorkflowNodeDto.positionX,
      positionY: UpdateWorkflowNodeDto.positionY,
    });

    return await this.workflowNodeRepository.save(upToDateWorkflowNode);
  }

  async remove(
    workflowId: string,
    workflowNodeId: string,
    jwtUser: JwtUserPayload,
  ): Promise<WorkflowNode> {
    const workflowNode: WorkflowNode | null =
      await this.workflowNodeRepository.findOne({
        where: { id: workflowNodeId },
        relations: ['workflow', 'workflow.createdBy'],
      });

    if (!workflowNode) {
      throw new NotFoundException(
        `Cannot find workflow node where id is #${workflowNodeId}`,
      );
    }

    if (workflowNode.workflow.createdBy.id !== jwtUser.sub) {
      throw new UnauthorizedException(
        'You cannot remove this workflow node because you are not the workflow owner.',
      );
    }

    return await this.workflowNodeRepository.remove(workflowNode);
  }
}
