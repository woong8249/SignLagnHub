import config from "../config/config";

const {daily}= config.sign
export default async function sampleRequest(){
  const baseURL = `http://api.kcisa.kr/openapi/service/rest/meta13/getCTE01701?serviceKey=${daily}`;
  const option = {
    headers: {
      Accept: 'application/json',
    },
  };
  const response = await fetch(baseURL, option).catch(console.error);
  
  if (response?.ok) {
    const jsonData = await response.json();
    return jsonData
  }
  return null
}

const res = await sampleRequest()
console.log(res)