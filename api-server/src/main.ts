import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import fs from 'fs';

async function bootstrap() {
  const uploadDir = join(__dirname, '..', 'uploads');
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
