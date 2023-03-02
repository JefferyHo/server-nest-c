import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLogDto } from './dto/create-log.dto';
import { UpdateLogDto } from './dto/update-log.dto';
import { Log } from './log.entity';

@Injectable()
export class LogService {
  public context: ExecutionContext;

  constructor(
    private readonly reflector: Reflector,
    @InjectRepository(Log) private repo: Repository<Log>,
  ) {}

  async save(event) {
    const handler = this.context.getHandler();
    const operator = this.context.switchToHttp().getRequest().user.username;
    const operation = this.reflector.get('log', handler);
    const { entity, databaseEntity } = event;

    const data = {
      operator,
      oldEntity: databaseEntity,
      newEntity: entity,
      method: handler.name,
      operation: operation,
      entityId: String(entity.id),
      entity: event.metadata.tableName,
    };

    if (event.updatedColumns.length > 0 && operation) {
      await this.repo.save(data);
    }
  }
}
