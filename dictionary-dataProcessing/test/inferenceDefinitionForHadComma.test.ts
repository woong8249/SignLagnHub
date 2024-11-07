import { inferenceDefinitionForHadComma } from '../src/gpt/testInferenceDefinitionForHadComma';

const sampleLength5 = {
  title: '떠나다,송별,이별,작별,헤어지다',
  regDate: '2023-05-24 11:04:46',
  subDescription: 'http://sldict.korean.go.kr/multimedia/multimedia_files/convert/20190918/615452/MOV000237548_700X466.mp4',
};
const sampleLength13 = {
  title: '만족,여유,자신,충족,넉넉하다,늠름하다,당당하다,떳떳하다,충분하다,푸짐하다,풍부하다,듬뿍,실컷',
  regDate: '2023-05-24 11:04:46',
  subDescription: 'http://sldict.korean.go.kr/multimedia/multimedia_files/convert/20191022/630193/MOV000236772_700X466.mp4',
};

const sampleLength14 = {
  title: '곧,금명간,신속,이르다,냉큼,빨리,속히,썩,어서,얼른,이내,일찍,일찍이,-자',
  regDate: '2023-05-24 11:04:43',
  subDescription: 'http://sldict.korean.go.kr/multimedia/multimedia_files/convert/20191014/627300/MOV000248334_700X466.mp4',
};
await inferenceDefinitionForHadComma([sampleLength5]).then(result => {
  console.dir(JSON.parse((result.choices[0]?.message.content) as string), { depth: 5 });
});
await inferenceDefinitionForHadComma([sampleLength13]).then(result => {
  console.dir(JSON.parse((result.choices[0]?.message.content) as string), { depth: 5 });
});
await inferenceDefinitionForHadComma([sampleLength14]).then(result => {
  console.dir(JSON.parse((result.choices[0]?.message.content) as string), { depth: 5 });
});

// [
//   {
//     words: [
//       [ '떠나다', '어디에서 다른 장소로 이동하다' ],
//       [ '송별', '누군가를 떠나보내며 작별 인사를 하다' ],
//       [ '이별', '함께 있던 사람과 헤어지고 따로 떨어지다' ],
//       [ '작별', '오랫동안 만나지 않을 사람과 인사를 나누며 헤어지다' ],
//       [ '헤어지다', '같이 있던 사람들과 각자 따로 떨어져 나가다' ]
//     ],
//     subDescription: 'http://sldict.korean.go.kr/multimedia/multimedia_files/convert/20190918/615452/MOV000237548_700X466.mp4',
//     regDate: '2023-05-24 11:04:46'
//   }
// ]

// [
//   {
//     words: [
//       [ '만족', '자신이 원하는 것이 이루어져 마음에 흡족함을 느끼다' ],
//       [ '여유', '시간이나 물질적 자원이 넉넉하여 남음이 있다' ],
//       [ '자신', '스스로를 믿고 확신을 가지다' ],
//       [ '충족', '필요하거나 원하는 것이 충분하게 채워지다' ],
//       [ '넉넉하다', '물질적으로 부족함이 없이 풍족하다' ],
//       [ '늠름하다', '모습이나 태도가 씩씩하고 당당하다' ],
//       [ '당당하다', '태도가 자신 있고 거리낌이 없다' ],
//       [ '떳떳하다', '행동이나 말이 부끄러움 없이 당당하다' ],
//       [ '충분하다', '필요한 만큼 넉넉하게 있다' ],
//       [ '푸짐하다', '음식이 가득하고 풍성하다' ],
//       [ '풍부하다', '무엇이 매우 많고 넉넉하다' ],
//       [ '듬뿍', '가득 찰 정도로 많이' ],
//       [ '실컷', '어떤 일을 하고 난 뒤에 더 할 필요 없이 충분하게' ]
//     ],
//     regDate: '2023-05-24 11:04:46',
//     subDescription: 'http://sldict.korean.go.kr/multimedia/multimedia_files/convert/20191022/630193/MOV000236772_700X466.mp4'
//   }
// ]

// [
//   {
//     words: [
//       [ '곧', '지체하지 않고 바로' ],
//       [ '금명간', '머지않아 가까운 시일 내에' ],
//       [ '신속', '아주 빠르고 민첩하게' ],
//       [ '이르다', '정해진 시기보다 빠르게 도착하다' ],
//       [ '냉큼', '망설이지 않고 바로 행동하는 모양' ],
//       [ '빨리', '시간을 최소한으로 줄여서' ],
//       [ '속히', '어떠한 일을 지체 없이 빨리' ],
//       [ '썩', '대단히 빨리' ],
//       [ '어서', '서둘러 빨리' ],
//       [ '얼른', '신속하게' ],
//       [ '이내', '곧 바로 어떤 시간이 지나지 않아서' ],
//       [ '일찍', '예상된 시간보다 먼저' ],
//       [ '일찍이', '아직 한참 남았을 때부터' ],
//       [ '-자', '어떤 행동을 하자마자 곧' ]
//     ],
//     subDescription: 'http://sldict.korean.go.kr/multimedia/multimedia_files/convert/20191014/627300/MOV000248334_700X466.mp4',
//     regDate: '2023-05-24 11:04:43'
//   }
// ]
