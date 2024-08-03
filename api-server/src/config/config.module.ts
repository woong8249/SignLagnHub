import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { getConfig } from './config.service';
import { Module } from '@nestjs/common';

const nodeENV = process.env['NODE_ENV'] || 'production';
const envFilePath =
  nodeENV === 'development'
    ? '.development.env'
    : nodeENV === 'test'
      ? '.test.env'
      : '.production.env';

@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      envFilePath,
      load: [getConfig],
    }),
  ],
  exports: [NestConfigModule],
})
export class ConfigModule {}
