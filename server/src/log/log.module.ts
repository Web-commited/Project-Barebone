import { Module, MiddlewareConsumer, RequestMethod } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Log } from "./log.entity";
import { LogController } from "./log.controller";
import { LoggerService } from "./logger.service";
import { LogMiddleware } from "./log.middleware";

@Module({
  imports: [TypeOrmModule.forFeature([Log])],
  providers: [LoggerService],
  controllers: [LogController],
  exports: [LoggerService],
})
export class LogModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LogMiddleware).forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
