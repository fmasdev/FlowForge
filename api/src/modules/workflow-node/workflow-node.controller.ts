// src/modules/workflow-node/workflow-node.controller.ts

import { User } from '@/common/decorators/user.decorator';
import { JwtUserPayload } from '@/modules/auth/auth.service';
import { CreateWorkflowNodeDto } from '@/modules/workflow-node/dto/create-workflow-node.dto';
import { UpdateWorkflowNodeDto } from '@/modules/workflow-node/dto/update-workflow-node.dto';
import { Body, Controller, Delete, Param, Post, Put } from '@nestjs/common';

@Controller('workflow-node')
export class WorkflowNodeController {
  @Post()
  create(
    @Body() createWorlflowNodeDto: CreateWorkflowNodeDto,
    @User() user: JwtUserPayload,
  ) {
    return 'This action adds a new worlflowNode';
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateWorlflowNodeDto: UpdateWorkflowNodeDto,
    @User() user: JwtUserPayload,
  ) {
    return 'This action updates a #${id} worlflowNode';
  }

  @Delete(':id')
  remove(@Param('id') id: string, @User() user: JwtUserPayload) {
    return 'This action removes a #${id} worlflowNode';
  }
}
