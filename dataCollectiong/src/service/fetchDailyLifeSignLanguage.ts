/* eslint-disable no-await-in-loop */
import { GroupCode } from '../typeorm/entity/groupCode';
import { SignLanguageResource } from '../typeorm/entity/signLanguageResource';
import { SignPolysemy } from '../typeorm/entity/signPolysemy';
import { SignTypeCode } from '../typeorm/entity/signTypeCode';
import config from '../config/config';
import connectDB from '../typeorm/connectDB';

const appDataSource = await connectDB();

type NecessaryItem = {
  title :string,
  regDate:string,
  subDescription:string,
}

type Response ={
  body:{
    items:{
      item:NecessaryItem[]
    }
  }
}
const { daily } = config.sign;
export async function fetchDailyLifeSignLanguage(numOfRows = 100, pageNo = 1) :Promise<Record<'response', Response>| null> {
  const baseURL = `http://api.kcisa.kr/openapi/service/rest/meta13/getCTE01701?serviceKey=${daily}&numOfRows=${numOfRows}&pageNo=${pageNo}`;
  const option = {
    headers: {
      Accept: 'application/json',
    },
  };

  const response = await fetch(baseURL, option);
  if (response.ok) {
    const jsonData = await response.json() as Record<'response', Response>;
    return jsonData;
  }
  return null;
}

const groupCodeRepository = appDataSource.getRepository(GroupCode);
const groupCode = await groupCodeRepository.findOneBy({ groupCode: '02' }) as GroupCode;

for (let i = 2; i < 38; i += 1) {
  const { item: items } = (await fetchDailyLifeSignLanguage(100, i))?.response.body.items as {item :NecessaryItem[]};
  console.log('fetch done');

  for (let j = 0; j < items.length; j += 1) {
    const { regDate, subDescription } = items[j] as NecessaryItem;
    let { title } = items[j] as NecessaryItem;
    const isMultipleTile = title.includes(',');
    const polySemis = isMultipleTile && title.split(',').slice(1);
    title = isMultipleTile ? title.split(',')[0] as string : title;

    const typeCode = new SignTypeCode();
    typeCode.groupCode = groupCode;
    typeCode.typeCode = title;
    typeCode.regisDate = new Date(regDate);
    typeCode.updateDate = new Date(regDate);
    typeCode.remark = title;

    if (isMultipleTile && polySemis) {
      typeCode.SignPolysemies = polySemis.map(item => {
        const signPolysemy = new SignPolysemy();
        signPolysemy.groupCode = groupCode;
        signPolysemy.typeCode = typeCode;
        signPolysemy.remark = item;
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
    typeCode.SignLanguageResources = [signLanguageResource];
    const signTypeCodeRepo = appDataSource.getRepository(SignTypeCode);
    await signTypeCodeRepo.save(typeCode).catch(console.error);
    console.log('save.done');
  }
}
