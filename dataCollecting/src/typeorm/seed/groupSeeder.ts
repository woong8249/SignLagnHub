/* eslint-disable class-methods-use-this */
import { type Seeder, runSeeders } from 'typeorm-extension';
import { type DataSource } from 'typeorm';

import { Group } from '../entity/group';

const initialGroup = [{
  id: 1, name: 'system group', regisDate: new Date(), remark: '시스템',
},
{
  id: 2, name: 'sign language group', regisDate: new Date(), remark: '수어 그룹',
},
{
  id: 3, name: 'everyday life', regisDate: new Date(), remark: '일상수어',
},
{
  id: 4, name: 'init image', regisDate: new Date(), remark: '초기화 이미지',
},
];

export class GroupSeeder implements Seeder {
  public async run(_dataSource: DataSource) {
    const groupRepository = _dataSource.getRepository(Group);
    await groupRepository.insert(initialGroup);
  }
}

export default async function seedGroupCode(dataSource:DataSource) {
  const groupCodeEntityM = dataSource.getRepository(Group);
  const result = await groupCodeEntityM.findBy({ id: 0 });
  result.length === 0 && await runSeeders(dataSource, { seeds: [GroupSeeder] });
}
