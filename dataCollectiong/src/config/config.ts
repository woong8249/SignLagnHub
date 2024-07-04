import 'dotenv/config';

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
    host: required('DB_HOST', undefined) as string,
    port: required('DB_PORT', undefined) as number,
    username: required('DB_USERNAME', undefined) as string,
    password: required('DB_PASSWORD', undefined) as string,
    database: required('DB_DATABASE', undefined) as string,
  },
  sign:{
    daily :required('SIGN_LAN_DAILY_SERVICE_KEY',undefined)
  }
};

console.log('config :', config);
export default config;
