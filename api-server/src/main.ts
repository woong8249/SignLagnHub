import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import fs from 'fs';
import { MyLogger } from './loggers/logger.service';

async function bootstrap() {
  const uploadDir = join(__dirname, '..', 'uploads');
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }
  const app = await NestFactory.create(AppModule);
  app.useLogger(await app.resolve(MyLogger));
  await app.listen(3000);
}
bootstrap();
