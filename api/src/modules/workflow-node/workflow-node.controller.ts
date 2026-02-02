// src/modules/workflow-node/workflow-node.controller.ts

import { User } from '@/common/decorators/user.decorator';
import { JwtAuthGuard } from '@/modules/auth/auth.guard';
import { JwtUserPayload } from '@/modules/auth/auth.service';
import { CreateWorkflowNodeDto } from '@/modules/workflow-node/dto/create-workflow-node.dto';
import { UpdateWorkflowNodeDto } from '@/modules/workflow-node/dto/update-workflow-node.dto';
import { WorkflowNodeService } from '@/modules/workflow-node/workflow-node.service';
import { Body, ClassSerializerInterceptor, Controller, Delete, Param, Post, Put, UseGuards, UseInterceptors } from '@nestjs/common';

@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(JwtAuthGuard)
@Controller('workflow-nodes')
export class WorkflowNodeController {
  constructor(
    private readonly workflowNodeService: WorkflowNodeService,
  ) { }
  
  @Post()
  async create(
    @Body() createWorlflowNodeDto: CreateWorkflowNodeDto,
    @User() user: JwtUserPayload,
  ) {
    return await this.workflowNodeService.create(createWorlflowNodeDto, user);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateWorlflowNodeDto: UpdateWorkflowNodeDto,
    @User() user: JwtUserPayload,
  ) {
    return await this.workflowNodeService.update(id, updateWorlflowNodeDto, user);
  }

  @Delete(':id')
  async remove(
    @Param('id') id: string,
    @User() user: JwtUserPayload
  ) {
    return this.workflowNodeService.remove(id, user);
  }
}
