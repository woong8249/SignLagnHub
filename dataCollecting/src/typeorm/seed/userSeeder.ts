/* eslint-disable class-methods-use-this */
import { type Seeder, runSeeders } from 'typeorm-extension';
import { type DataSource } from 'typeorm';
import bcrypt from 'bcrypt';

import { User } from '../entity/user';
import config from '../../config/config';

const { password } = config.admin;
const initialUser = {
  email: 'signLanAdmin@gmail.com',
  password: bcrypt.hashSync(password, 10),
  name: '관리자',
  role: 'admin',
  location: '서울',
};

export class UserSeeder implements Seeder {
  public async run(_dataSource: DataSource) {
    const groupRepository = _dataSource.getRepository(User);
    await groupRepository.insert(initialUser as User);
  }
}
export default async function seedUser(dataSource: DataSource) {
  const userRepo = dataSource.getRepository(User);
  const result = await userRepo.findBy({ name: '황지웅' });
  result.length === 0 && await runSeeders(dataSource, { seeds: [UserSeeder] });
}
