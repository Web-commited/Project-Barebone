
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Log } from './log.entity';


@Injectable()
export class LoggerService {
  constructor(
    @InjectRepository(Log)
    private readonly logRepository: Repository<Log>,
  ) {}

  async logAction(username: string, id: string, actionType: string): Promise<void> {
    const log = new Log();
    log.username = username;
    log.userId = id;
    log.actionType = actionType;
    await this.logRepository.save(log);
  }

  async getAllLogs(): Promise<Log[]> {
    return this.logRepository.find();
  }

  async getLogsByUsername(username: string): Promise<Log[]> {
    return this.logRepository.find({ where: { username } });
  }
}

export default LoggerService;
