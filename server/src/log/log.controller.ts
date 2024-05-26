// log.controller.ts

import { Controller, Get, Param } from '@nestjs/common';
import { LoggerService } from './logger.service';
import { Log } from './log.entity';

@Controller('logs')
export class LogController {
  constructor(private readonly loggerService: LoggerService) {}

  @Get()
  async getAllLogs(): Promise<Log[]> {
    return this.loggerService.getAllLogs();
  }

  @Get(':username')
  async getLogsByUsername(@Param('username') username: string): Promise<Log[]> {
    return this.loggerService.getLogsByUsername(username);
  }
}
