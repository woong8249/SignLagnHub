// ./dataSource.ts
import { DataSource, type DataSourceOptions } from 'typeorm';
import { type SeederOptions } from 'typeorm-extension';

import config from './src/config/config';

const { typeormConfig } = config;
const options: DataSourceOptions & SeederOptions = {
  ...typeormConfig,
  logging: true,
};

export const dataSource = new DataSource(options);
