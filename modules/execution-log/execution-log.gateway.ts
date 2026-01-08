import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { ExecutionLogService } from './execution-log.service';
import { CreateExecutionLogDto } from './dto/create-execution-log.dto';
import { UpdateExecutionLogDto } from './dto/update-execution-log.dto';

@WebSocketGateway()
export class ExecutionLogGateway {
  constructor(private readonly executionLogService: ExecutionLogService) {}

  @SubscribeMessage('createExecutionLog')
  create(@MessageBody() createExecutionLogDto: CreateExecutionLogDto) {
    return this.executionLogService.create(createExecutionLogDto);
  }

  @SubscribeMessage('findAllExecutionLog')
  findAll() {
    return this.executionLogService.findAll();
  }

  @SubscribeMessage('findOneExecutionLog')
  findOne(@MessageBody() id: number) {
    return this.executionLogService.findOne(id);
  }

  @SubscribeMessage('updateExecutionLog')
  update(@MessageBody() updateExecutionLogDto: UpdateExecutionLogDto) {
    return this.executionLogService.update(
      updateExecutionLogDto.id,
      updateExecutionLogDto,
    );
  }

  @SubscribeMessage('removeExecutionLog')
  remove(@MessageBody() id: number) {
    return this.executionLogService.remove(id);
  }
}
