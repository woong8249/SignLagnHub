import { Logger } from '@nestjs/common';

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
      env: required('NODE_ENV'),
      port: required('NODE_PORT'),
      logLevel: required('NODE_LOG_LEVEL'),
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

  const logger = new Logger('ConfigService');
  logger.log(config);
  return config;
}
