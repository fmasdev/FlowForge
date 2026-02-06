// src/modules/workflow-node/workflow-node.controller.ts

import { User } from '@/common/decorators/user.decorator';
import { JwtAuthGuard } from '@/modules/auth/auth.guard';
import { JwtUserPayload } from '@/modules/auth/auth.service';
import { CreateWorkflowNodeDto } from '@/modules/workflow-node/dto/create-workflow-node.dto';
import { UpdateNodeDto } from '@/modules/workflow-node/dto/update-node.dto';
import { WorkflowNodeService } from '@/modules/workflow-node/workflow-node.service';
import { Body, ClassSerializerInterceptor, Controller, Delete, Param, Patch, Post, UseGuards, UseInterceptors } from '@nestjs/common';

@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(JwtAuthGuard)
@Controller('workflows/:workflowId/nodes')
export class WorkflowNodeController {
  constructor(private readonly workflowNodeService: WorkflowNodeService) {}

  @Post()
  async create(
    @Param('workflowId') workflowId: string,
    @Body() createWorlflowNodeDto: CreateWorkflowNodeDto,
    @User() user: JwtUserPayload,
  ) {
    return await this.workflowNodeService.create(
      workflowId,
      createWorlflowNodeDto,
      user,
    );
  }

  @Patch(':id')
  async updateNode(
    @Param('id') id: string,
    @Body() updateWorlflowNodeDto: UpdateNodeDto,
    @User() user: JwtUserPayload,
  ) {
    return await this.workflowNodeService.update(
      id,
      updateWorlflowNodeDto,
      user,
    );
  }

  @Delete(':id')
  async remove(
    @Param('id') id: string,
    @User() user: JwtUserPayload,
  ) {
    return this.workflowNodeService.remove(id, user);
  }
}
