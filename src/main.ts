import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { enableApiDocs } from '@app/common';
import * as dotenv from 'dotenv';

dotenv.config();
const globalPrefix = 'api';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      validateCustomDecorators: true,
    }),
  ),
    enableApiDocs(app, globalPrefix);
  await app.listen(process.env.API_PORT);
}
bootstrap();
