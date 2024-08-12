import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { join } from 'path';
import fs from 'fs';
import { MyLogger } from './logger/logger.service';
import cookieParser from 'cookie-parser';
import useragent from 'express-useragent';

const port = process.env.APP_PORT || 3000;
const cookieSecret = process.env.COOKIE_SECRET;

async function bootstrap() {
  const uploadDir = join(__dirname, '..', 'uploads');
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }
  const app = await NestFactory.create(AppModule);
  app.useLogger(await app.resolve(MyLogger));
  app.use(cookieParser(cookieSecret));
  app.use(useragent.express());
  const config = new DocumentBuilder()
    .setTitle('SignLanHub API specification')
    .setDescription('This is the API specification for development.')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  //Note for Swagger UI and Swagger Editor users: Cookie authentication is currently not supported for "try it out" requests due to browser security restrictions. See this issue for more information. SwaggerHub does not have this limitation.
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(port);
}
bootstrap();
