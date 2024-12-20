function required(key: string, defaultValue: undefined | string | number): string | number {
  const value: undefined | string | number = import.meta.env[key] || defaultValue;
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
  googleKey: required('VITE_GOOGLE_SECRET_KEY', 'prod_yet') as string,
};

export default config;
