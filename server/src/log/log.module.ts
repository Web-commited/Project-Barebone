import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Log } from "./log.entity";
import { LogController } from "./log.controller";
import { LoggerService } from "./logger.service";
import { LogMiddleware } from "./log.middleware";

@Module({
  imports: [TypeOrmModule.forFeature([Log])],
  providers: [LoggerService, LogMiddleware],
  controllers: [LogController],
    exports: [LoggerService],
})

export class LogModule {}
