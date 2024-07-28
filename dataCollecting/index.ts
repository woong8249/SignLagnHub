import config from './src/config/config';
import createDataSource from './src/typeorm/dataSource';
import loadEntities from './src/typeorm/loadEntities';

const { typeormConfig } = config;
const entities = await loadEntities();
const options = {
  ...typeormConfig,
  entities,
  synchronize: false,
  logging: true,
};
await createDataSource(options);
