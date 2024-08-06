import { Injectable } from '@nestjs/common';
import { MyLogger } from 'src/loggers/logger.service';

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

export function getConfig() {
  const config = {
    node: {
      env: required('NODE_ENV') as string,
      port: required('NODE_PORT') as string,
      logLevel: required('NODE_LOG_LEVEL') as string,
    },
    typeorm: {
      type: 'mysql' as const,
      host: required('TYPEORM_HOST') as string,
      port: required('TYPEORM_PORT') as number,
      username: required('TYPEORM_USERNAME') as string,
      password: required('TYPEORM_PASSWORD') as string,
      database: required('TYPEORM_DATABASE') as string,
    },
    minIo: {
      protocol: required('MINIO_PROTOCOL') as string,
      baseURL: required('MINIO_BASEURL') as string,
      bucketName: required('MINIO_BUCKET_NAME') as string,
      port: required('MINIO_PORT') as number,
      accessKey: required('MINIO_ACCESS_KEY') as string,
      secretKey: required('MINIO_SECRET_KEY') as string,
    },
  };
  return config;
}

@Injectable()
export class ConfigService {
  constructor(private logger: MyLogger) {
    logger.setContext(ConfigService.name);
    this.logger.debug(this.getConfig());
  }
  getConfig = () => getConfig();
}
