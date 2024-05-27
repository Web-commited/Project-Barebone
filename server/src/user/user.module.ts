import { Module, MiddlewareConsumer, NestModule, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './user.service';
import { UsersController } from './user.controller';
import { LogModule } from 'src/log/log.module';
import { LogMiddleware } from 'src/log/log.middleware';
import { User } from './user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User]), LogModule],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LogMiddleware)
      .forRoutes({ path: 'users', method: RequestMethod.ALL });
  }
}

export default UsersModule;