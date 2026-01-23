// src/modules/workflow/workflow.controller.ts

import { User } from '@/common/decorators/user.decorator';
import { JwtAuthGuard } from '@/modules/auth/auth.guard';
import { JwtUserPayload } from '@/modules/auth/auth.service';
import { CreateWorkflowDto } from '@/modules/workflow/dto/create-workflow.dto';
import { PaginationDto } from '@/common/dto/pagination.dto';
import { UpdateWorkflowDto } from '@/modules/workflow/dto/update-workflow.dto';
import { WorkflowService } from '@/modules/workflow/workflow.service';
import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(JwtAuthGuard)
@Controller('workflows')
export class WorkflowController {
  constructor(private readonly workflowService: WorkflowService) {}

  @Post()
  async create(
    @User() jwtUser: JwtUserPayload,
    @Body() createWorkflowDto: CreateWorkflowDto,
  ) {
    return await this.workflowService.create(createWorkflowDto, jwtUser);
  }

  @Put()
  async update(
    @User() user: JwtUserPayload,
    @Body() updateWorkflowDto: UpdateWorkflowDto,
  ) {
    return await this.workflowService.update(updateWorkflowDto, user);
  }

  @Get()
  async findAll(
    @Query() pagination: PaginationDto,
  ) {
    return await this.workflowService.findAll(pagination);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.workflowService.findOne(id);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @User() jwtUser: JwtUserPayload) {
    return await this.workflowService.remove(id, jwtUser);
  }
}
