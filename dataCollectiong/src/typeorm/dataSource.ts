import { DataSource, type DataSourceOptions } from 'typeorm';

import config from '../config/config';

import loadEntities from './loadEntities';

const { typeormConfig } = config;

const entities = await loadEntities();
const options: DataSourceOptions = {
  ...typeormConfig,
  entities,
  synchronize: true,
  logging: true,
};
export const dataSource = new DataSource(options);

await dataSource.initialize()
  .then(() => {
    console.log('DB connection successful!');
  })
  .catch(error => { console.log(error); });
