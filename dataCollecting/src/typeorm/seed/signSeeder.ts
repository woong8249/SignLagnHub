/* eslint-disable no-restricted-syntax */
/* eslint-disable class-methods-use-this */
import { type Seeder, runSeeders } from 'typeorm-extension';
import { type DataSource } from 'typeorm';

import { Definition } from '../entity/definition';
import { GroupCode } from '../entity/groupCode';
import { Sign } from '../entity/sign';
import { User } from '../entity/user';
import processedData from '../../../data/dailyLifeSign/processedData/noHadComma.json';
import processedDataHadComma from '../../../data/dailyLifeSign/processedData/hadComma.json';

function chunkArray<T>(array: T[], chunkSize: number): T[][] {
  const result: T[][] = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    const chunk = array.slice(i, i + chunkSize);
    result.push(chunk);
  }
  return result;
}

export class SignSeeder implements Seeder {
  public async run(dataSource: DataSource) {
    const signRepo = dataSource.getRepository(Sign);
    const groupCodeRepo = dataSource.getRepository(GroupCode);
    const dailyLifeSignGroupCode = await groupCodeRepo.findOneBy({ code: '02' }) as GroupCode;
    const userRepo = dataSource.getRepository(User);
    const adminUser = await userRepo.findOneBy({ name: '황지웅' }) as User;
    let count = 1;

    const dailyLifeSign = [...processedData, ...processedDataHadComma].map(({ regDate, words, subDescription }, index) => {
      const sign = new Sign();
      sign.groupCode = dailyLifeSignGroupCode;
      sign.regisDate = new Date(regDate);
      sign.updateDate = new Date(regDate);
      sign.videoUrl = subDescription;
      sign.register = adminUser;
      sign.id = index + 1;

      const definitions = words.map(word => {
        const definition = new Definition();
        definition.id = count;
        count += 1;
        definition.groupCode = dailyLifeSignGroupCode;
        definition.sign = sign;
        definition.register = adminUser;
        definition.updateDate = new Date(regDate);
        definition.regisDate = new Date(regDate);
        definition.referenceWord = word[0] as string;
        definition.definition = JSON.stringify(word.slice(1));
        return definition;
      });

      sign.definitions = definitions;
      return sign;
    });

    const chunkedArray = chunkArray(dailyLifeSign, 100);
    for await (const array of chunkedArray) {
      await signRepo.save(array);
    }
  }
}

export default async function seedSign(dataSource:DataSource) {
  await runSeeders(dataSource, { seeds: [SignSeeder] });
}
