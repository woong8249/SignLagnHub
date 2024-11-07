import { DataSourceOptions } from 'typeorm';

import config from '../config/config';
import createDataSource from '../typeorm/dataSource';
import loadEntities from '../typeorm/loadEntities';
import seedGroup from '../typeorm/seed/groupSeeder';
import seedImage from '../typeorm/seed/imageSeeder';
import seedSign from '../typeorm/seed/signSeeder';
import seedUser from '../typeorm/seed/userSeeder';

export default async function seedInitialRecode() {
  const { typeormConfig } = config;
  const entities = await loadEntities();
  const options: DataSourceOptions = {
    ...typeormConfig,
    entities,
    synchronize: true,
    logging: true,
  };
  const dataSource = await createDataSource(options);
  await seedGroup(dataSource).then(() => { console.log('groupCode seeding is success'); });
  await seedUser(dataSource).then(() => { console.log('user seeding is success'); });
  await seedSign(dataSource).then(() => { console.log('sign seeding is success'); });
  await seedImage(dataSource).then(() => { console.log('image seeding is success'); });
}
