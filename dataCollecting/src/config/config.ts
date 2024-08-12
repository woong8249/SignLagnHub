function required(key: string, defaultValue: undefined | string | number): string | number {
  const value: undefined | string | number = process.env[key] || defaultValue;
  if (value === undefined) {
    throw new Error(`config ${key} is  undefined`);
  }
  if (typeof value === 'number') {
    return value;
  }
  const num = Number(value);
  if (typeof value === 'string') {
    if (Number.isNaN(num)) { return value; }
  }
  return num;
}

const config = {
  typeormConfig: {
    type: 'mysql' as const,
    host: required('VITE_DB_HOST', undefined) as string,
    port: required('VITE_DB_PORT', undefined) as number,
    username: required('VITE_DB_USERNAME', undefined) as string,
    password: required('VITE_DB_PASSWORD', undefined) as string,
    database: required('VITE_DB_DATABASE', undefined) as string,
  },
  admin: {
    password: required('VITE_ADMIN_PASSWORD', undefined) as string,
  },
  dailySign: {
    serviceKey: required('VITE_SIGN_LAN_DAILY_SERVICE_KEY', undefined),
  },
  gpt: {
    apiKey: required('VITE_GPT_API_KEY', undefined) as string,
  },
  minio: {
    protocol: required('VITE_MINIO_PROTOCOL', undefined) as string,
    baseURL: required('VITE_MINIO_BASEURL', undefined) as string,
    port: required('VITE_MINIO_PORT', undefined) as number,
    bucketName: required('VITE_MINIO_BUCKET_NAME', undefined) as string,
  },
};

console.log('config :', config);
export default config;
