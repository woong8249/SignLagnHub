/* eslint-disable no-await-in-loop */
import config from '../config/config';

export type NecessaryItem = {
  title :string,
  regDate:string,
  subDescription:string,
}

type Response ={
  header: {
    resultCode: '0000'|'F2013' |'9999'
  },

  body:{
    items:{
      item:NecessaryItem[]
    }
  }
}
const { serviceKey } = config.dailySign;
export async function fetchDailyLifeSignLanguage(numOfRows = 100, pageNo = 1) :Promise<Record<'response', Response>| null> {
  const baseURL = `http://api.kcisa.kr/openapi/service/rest/meta13/getCTE01701?serviceKey=${serviceKey}&numOfRows=${numOfRows}&pageNo=${pageNo}`;
  const option = {
    headers: {
      Accept: 'application/json',
    },
  };
  const fetchInfo = { pageNo, numOfRows };
  console.log('fetch start :', fetchInfo);
  const response = await fetch(baseURL, option);
  if (response.ok) {
    const data = await response.json() as Record<'response', Response>;
    console.log('fetch result :', { ...fetchInfo, resultCode: data.response.header.resultCode });
    return data;
  }
  return null;
}
/**
 *
 *
 * @param {number} totalCount 원하는 record총 개수
 * @param {number} worker 병렬 처리개수
 * @param {number} numOfRows 한 요청당 가져오는 레코드개수
 */
export async function parallelFetch(totalCount:number, worker = 1, numOfRows = 100) {
  const workers = Array.from({ length: worker });
  const callCount = Math.ceil(totalCount / (numOfRows * worker));
  const limitRecordQuantity = 3616;
  const results = [];

  for (let i = 1; i <= callCount; i += 1) {
    const process = [];
    process.push(...workers.map((_worker, index) => {
      const pageNo = (index + 1) + ((i - 1) * worker);
      const previousRequestedRecordQuantity = (pageNo - 1) * numOfRows;
      const currentRequestedRecordQuantity = pageNo * numOfRows;

      if (currentRequestedRecordQuantity <= limitRecordQuantity || previousRequestedRecordQuantity < limitRecordQuantity) {
        return fetchDailyLifeSignLanguage(numOfRows, pageNo);
      }
      return null;
    }));
    const result = await Promise.all(process);
    results.push(...result);
  }

  return results;
}
