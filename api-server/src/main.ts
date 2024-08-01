import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

type LogLevel = 'log' | 'error' | 'warn' | 'debug' | 'verbose' | 'fatal';
// declare const module: any;

const nodeENV = process.env['NODE_ENV'] || 'production';

const logger: LogLevel[] =
  nodeENV === 'development'
    ? ['debug']
    : nodeENV === 'test'
      ? ['verbose']
      : ['log'];

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger,
  });
  await app.listen(3000);
}
bootstrap();
