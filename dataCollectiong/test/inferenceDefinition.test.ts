import { inferenceDefinitionForHadComma } from '../src/service/inferenceDefinition';

const sample = [{
  title: '감추다,숨다,은닉',
  subDescription: 'http://sldict.korean.go.kr/multimedia/multimedia_files/convert/20220729/1003150/MOV000359582_700X466.mp4',
  regDate: '2023-05-24 11:04:42',
},
{
  title: '거짓,허위',
  subDescription: 'http://sldict.korean.go.kr/multimedia/multimedia_files/convert/20191007/625138/MOV000249104_700X466.mp4',
  regDate: '2023-05-24 11:04:42',
},
{
  title: '기말시험,기말고사',
  subDescription: 'http://sldict.korean.go.kr/multimedia/multimedia_files/convert/20220812/1010108/MOV000360097_700X466.mp4',
  regDate: '2023-05-24 11:04:42',
},
{
  title: '가발,덧머리',
  subDescription: 'http://sldict.korean.go.kr/multimedia/multimedia_files/convert/20220812/1010109/MOV000360098_700X466.mp4',
  regDate: '2023-05-24 11:04:42',
}];

const result = await inferenceDefinitionForHadComma(sample);
console.dir(JSON.parse(result.choices[0]?.message.content as unknown as string), { depth: 5 });
