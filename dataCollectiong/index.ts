/* eslint-disable no-restricted-syntax */

import { GroupCode } from './src/typeorm/entity/groupCode';
import { SignLanguageResource } from './src/typeorm/entity/signLanguageResource';
import { SignPolysemy } from './src/typeorm/entity/signPolysemy';
import { SignTypeCode } from './src/typeorm/entity/signTypeCode';
import connectDB from './src/typeorm/connectDB';
import jsonFile from './test/dailyLifeSignLanguageResults.json';

const appDataSource = await connectDB();
const groupCodeRepository = appDataSource.getRepository(GroupCode);
const groupCode = await groupCodeRepository.findOneBy({ groupCode: '02' }) as GroupCode;
const signTypeCodeRepo = appDataSource.getRepository(SignTypeCode);

const dailyLifeSignLang = jsonFile
  .map(_item => _item.response.body.items.item)
  .flat()
  .map(({ title, regDate, subDescription }) => ({ title, regDate, subDescription }));

for await (const item of dailyLifeSignLang) {
  const { regDate, subDescription } = item;
  let { title } = item;
  const hasComma = title.includes(',');
  const polySemis = hasComma && title.split(',').slice(1);
  title = hasComma ? title.split(',')[0] as string : title;

  let typeCode = await signTypeCodeRepo.findOne({ relations: { groupCode: true }, where: { typeCode: title } });

  if (!typeCode) {
    typeCode = new SignTypeCode();
    typeCode.groupCode = groupCode;
    typeCode.typeCode = title;
    typeCode.remark = title;
    typeCode.regisDate = new Date(regDate);
    typeCode.updateDate = new Date(regDate);
  }

  if (hasComma && polySemis) {
    typeCode.signPolysemies = polySemis.map(polySemi => {
      const signPolysemy = new SignPolysemy();
      signPolysemy.groupCode = groupCode;
      signPolysemy.typeCode = typeCode;
      signPolysemy.remark = polySemi;
      signPolysemy.updateDate = new Date(regDate);
      signPolysemy.regisDate = new Date(regDate);
      return signPolysemy;
    });
  }
  const signLanguageResource = new SignLanguageResource();
  signLanguageResource.groupCode = groupCode;
  signLanguageResource.typeCode = typeCode;
  signLanguageResource.remark = title;
  signLanguageResource.url = subDescription;
  signLanguageResource.regisDate = new Date(regDate);
  signLanguageResource.updateDate = new Date(regDate);

  typeCode.signLanguageResources = [signLanguageResource];
  await signTypeCodeRepo.save(typeCode).catch(err => {
    console.error(err);
    console.log(item);
    console.dir(typeCode, { depth: 10 });
  });
}
