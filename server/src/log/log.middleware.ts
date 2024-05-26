
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { LoggerService } from './logger.service';

@Injectable()
export class LogMiddleware implements NestMiddleware {
  constructor(private readonly loggerService: LoggerService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const { method, path, body } = req;

    switch (path) {
      case '/login':
        await this.loggerService.logAction(body.username, body.id, 'login');
        break;
      case '/register':
        await this.loggerService.logAction(body.username, body.id, 'register');
        break;
      case '/edit':
        await this.loggerService.logAction(body.username, body.id, 'edit');
        break;
    }

    next();
  }
}
