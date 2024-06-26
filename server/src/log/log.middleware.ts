
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { LoggerService } from './logger.service';

@Injectable()
export class LogMiddleware implements NestMiddleware {
  constructor(private readonly loggerService: LoggerService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const { method, path, body } = req;

    if(path === '/auth/login') {
      await this.loggerService.logAction(body.username, 'login',`${body.username} logged in `);
      next();
      return;
    }
    switch (method) {
      case 'POST':
        await this.loggerService.logAction(body.username, 'register','User registered');
        break;
      case 'PUT':
        await this.loggerService.logAction(body.username, 'edit','you edited your profile');
        break;
    }

    next();
  }
}
