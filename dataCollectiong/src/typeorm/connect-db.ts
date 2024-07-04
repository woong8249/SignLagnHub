import { DataSource } from 'typeorm';

import config from '../config/config';

const { typeormConfig } = config;
const AppDataSource = new DataSource({
  ...typeormConfig,
  synchronize: true,
  logging: true,
});

export default async function connectDB() {
  await AppDataSource.initialize()
    .then(() => {
      console.log('DB connection successful!');
    })
    .catch(error => { console.log(error); });
}
