import { Injectable } from '@nestjs/common';
import { CreateExecutionLogDto } from './dto/create-execution-log.dto';
import { UpdateExecutionLogDto } from './dto/update-execution-log.dto';

@Injectable()
export class ExecutionLogService {
  create(createExecutionLogDto: CreateExecutionLogDto) {
    return 'This action adds a new executionLog';
  }

  findAll() {
    return `This action returns all executionLog`;
  }

  findOne(id: number) {
    return `This action returns a #${id} executionLog`;
  }

  update(id: number, updateExecutionLogDto: UpdateExecutionLogDto) {
    return `This action updates a #${id} executionLog`;
  }

  remove(id: number) {
    return `This action removes a #${id} executionLog`;
  }
}
