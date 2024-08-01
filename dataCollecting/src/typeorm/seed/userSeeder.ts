/* eslint-disable class-methods-use-this */
import { type Seeder, runSeeders } from 'typeorm-extension';
import { type DataSource } from 'typeorm';

import { User } from '../entity/user';

const initialUser = [
  {
    email: 'woong8249@gmail.com', password: 'aa', name: '황지웅', location: '서울', regisDate: new Date(),
  },
];

export class UserSeeder implements Seeder {
  public async run(_dataSource: DataSource) {
    const groupRepository = _dataSource.getRepository(User);
    await groupRepository.insert(initialUser);
  }
}
export default async function seedUser(dataSource: DataSource) {
  const userRepo = dataSource.getRepository(User);
  const result = await userRepo.findBy({ name: '황지웅' });
  result.length === 0 && await runSeeders(dataSource, { seeds: [UserSeeder] });
}
