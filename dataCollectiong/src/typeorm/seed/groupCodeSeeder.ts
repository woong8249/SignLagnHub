/* eslint-disable class-methods-use-this */
import { type Seeder, runSeeders } from 'typeorm-extension';
import { type DataSource } from 'typeorm';

import { GroupCode } from '../entity/groupCode';
import { dataSource } from '../dataSource';

const initialGroup = [{
  code: '00', name: 'system group', regisDate: new Date(), remark: '시스템',
},
{
  code: '01', name: 'sign language group', regisDate: new Date(), remark: '수어 그룹',
},
{
  code: '02', name: 'everyday life', regisDate: new Date(), remark: '일상수어',
}];

export default class GroupCodeSeeder implements Seeder {
  public async run(_dataSource: DataSource) {
    const groupCodeRepository = _dataSource.getRepository(GroupCode);
    await groupCodeRepository.insert(initialGroup);
  }
}

const groupCodeEntityM = dataSource.getRepository(GroupCode);
const result = await groupCodeEntityM.findBy({ code: '00' });

result.length === 0 && await runSeeders(dataSource, { seeds: [GroupCodeSeeder] });
