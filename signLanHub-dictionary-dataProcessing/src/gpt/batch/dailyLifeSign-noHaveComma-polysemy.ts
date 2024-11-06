import fs from 'fs';
import path from 'path';

import OpenAI from 'openai';

import data from '../../../data/dailyLifeSign/batchInferenceResult/noHadComma.json';

export const firstQuestion = JSON.stringify([{
  words: [
    [
      '닦다',
      '더러워진 것을 깨끗하게 하다.',
    ],
    [
      '닦다',
      '어떤 행동이나 일의 기초를 세우거나 완성해 나가다.',
    ],
    [
      '닦다',
      '몸과 마음을 바르게 하여 기본적인 덕성을 기르다.',
    ],
  ],
}, {
  words: [
    [
      '가치',
      '어떤 것의 쓸모나 중요성.',
    ],
    [
      '가치',
      '특정 사물이나 행위가 지니는 정도나 수준.',
    ],
    [
      '가치',
      '사람들이 좋다고 여기는 이념 또는 신념.',
    ],
  ],
},
{
  words: [
    [
      '감',
      '달고 맛있는 과일의 하나.',
    ],
    [
      '감',
      '어떠한 일을 판단, 해석, 이해하는 능력.',
    ],
    [
      '감',
      '느낌이나 상태.',
    ],
  ],
},
{
  words: [
    [
      '보관',
      '물건 등을 어떤 장소에 간직하여 둠.',
    ],
    [
      '보관',
      '정보나 자료를 일정한 형식으로 저장하여 유지함.',
    ],
  ],

}]);
export const firstAnswer = JSON.stringify([{
  words: [
    [
      '닦다',
      '더러워진 것을 깨끗하게 하다.',
    ],
    [
      '닦다',
      '어떤 행동이나 일의 기초를 세우거나 완성해 나가다.',
    ]],

}, {
  words: [[
    '가치',
    '어떤 것의 쓸모나 중요성.',
  ]],

},
{
  words: [[
    '감',
    '달고 맛있는 과일의 하나.',
  ],
  [
    '감',
    '어떠한 일을 판단, 해석, 이해하는 능력.',
  ],
  ],
},
{
  words: [
    ['보관',
      '물건 등을 어떤 장소에 간직하여 둠.',
    ],
  ],
},
]);
type Definition =string[];
type Response = {
  words: Definition[],
  subDescription:string,
  regDate:string
}
const format = data.map(item => JSON.parse(item.response.body.choices[0]?.message.content as string) as Response).filter(item => item.words.length !== 1);

const target = format.map((item, idx) => {
  const messages = [
    {
      role: 'system',
      content: `You are a helpful assistant.If you determine that the definitions of words in the given array are even slightly similar, remove duplicates and return the array.
      However, the order of the array must be maintained`,
    },
    {
      role: 'user',
      content: firstQuestion,
    },
    {
      role: 'assistant',
      content: firstAnswer,
    },
  ] as OpenAI.ChatCompletionUserMessageParam[];

  const newQuestion = {
    role: 'user' as const,
    content: JSON.stringify(item),
  };

  messages.push(newQuestion);
  const batchFormat = {
    custom_id: `$request-${idx + 1}`,
    method: 'POST',
    url: '/v1/chat/completions',
    body: {
      model: 'gpt-3.5-turbo', // 'gpt-3.5-turbo', // gpt-4o
      messages,
      max_tokens: 1000,
    },
  };
  return batchFormat;
});

fs.writeFileSync(path.join(__dirname, '../../../data/dailyLifeSign/batchFormat/noHadComma-polysemy-json.json'), JSON.stringify(target));

const jsonlString = target.map(obj => JSON.stringify(obj)).join('\n');
fs.writeFileSync(path.join(__dirname, '../../../data/dailyLifeSign/batchFormat/noHadComma-polysemy-jsonl.jsonl'), jsonlString);
