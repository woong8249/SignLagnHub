import { DataSource, type DataSourceOptions } from 'typeorm';

export default async function createDataSource(options:DataSourceOptions) {
  const dataSource = new DataSource(options);
  await dataSource.initialize()
    .then(() => {
      console.log('DB connection successful!');
    })
    .catch(error => { console.log(error); });

  return dataSource;
}
