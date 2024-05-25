import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  dotenv.config();

  app.enableCors();
  const configService = app.get(ConfigService);
  const secret = configService.get<string>('JWT_SECRET');
  console.log(secret);
  await app.listen(3001);
}
bootstrap();
