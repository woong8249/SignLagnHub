import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

function required(
  key: string,
  defaultValue?: undefined | string | number,
): string | number {
  const value: undefined | string | number = process.env[key] || defaultValue;
  if (value === undefined) {
    throw new Error(`config ${key} is  undefined`);
  }
  if (typeof value === 'number') {
    return value;
  }
  const num = Number(value);
  if (typeof value === 'string') {
    if (Number.isNaN(num)) {
      return value;
    }
  }
  return num;
}

function getConfig() {
  const config = {
    node: {
      env: required('NODE_ENV'),
      port: required('NODE_PORT'),
    },
    typeorm: {
      type: 'mysql' as const,
      host: required('TYPEORM_HOST') as string,
      port: required('TYPEORM_PORT') as number,
      username: required('TYPEORM_USERNAME') as string,
      password: required('TYPEORM_PASSWORD') as string,
      database: required('TYPEORM_DATABASE') as string,
    },
  };

  const logger = new Logger();
  logger.log(config);
  return config;
}

const nodeENV = process.env['NODE_ENV'] || 'production';
const envFilePath =
  nodeENV === 'development'
    ? '.development.env'
    : nodeENV === 'test'
      ? '.test.env'
      : '.production.env';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [getConfig],
      envFilePath,
    }),
  ],
})
export class configModule {}
