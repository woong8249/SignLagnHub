import { DataSource } from 'typeorm';

import config from '../config/config';

import loadEntities from './loadEntities';

const entities = await loadEntities();

const { typeormConfig } = config;
const AppDataSource = new DataSource({
  ...typeormConfig,
  entities,
  synchronize: false,
  logging: true,
});

export default async function connectDB() {
  await AppDataSource.initialize()
    .then(() => {
      console.log('DB connection successful!');
    })
    .catch(error => { console.log(error); });
}
