import fs from 'fs';
import path from 'path';

import OpenAI from 'openai';

import dailyLifeSignAPIResults from '../../../data/dailyLifeSign/apiResults.json';
import dailyLifeSignNoHadCommaBatchFormat from '../../../data/dailyLifeSign/batchFormat/noHadComma-json.json';

export const firstQuestionForNoHadComma = JSON.stringify([
  {
    title: '의사',
    subDescription: 'http://sldict.korean.go.kr/multimedia/multimedia_files/convert/20191016/628283/MOV000256357_700X466.mp4',
    regDate: '2023-05-24 11:04:48',
  },
]);
export const firstAnswerForNoHadComma = JSON.stringify([
  {
    words: [
      ['의사', ' 일정한 자격을 가지고 병을 고치는 것을 직업으로 하는 사람.'],
      ['의사', '무엇을 하고자 하는 생각.'],
    ],
    subDescription: 'http://sldict.korean.go.kr/multimedia/multimedia_files/convert/20220729/1003150/MOV000359582_700X466.mp4',
    regDate: '2023-05-24 11:04:42',
  },
]);

const batchJSONFormatsWhichNoHaveComma = dailyLifeSignAPIResults
  .map(_item => _item.response.body.items.item)
  .flat()
  .map(({ title, regDate, subDescription }) => ({ title, regDate, subDescription }))
  .filter(({ title }) => {
    if (!title.includes(',')) {
      return true;
    }
    return false;
  })
  .map((item, idx) => {
    const messages = [
      {
        role: 'system',
        content: `You are a useful helper that converts your data into a specific JavaScript array format containing word definitions.
          If the word is polysemous, provide up to three of them in order of most common use.`,
      },
      {
        role: 'user',
        content: firstQuestionForNoHadComma,
      },
      {
        role: 'assistant',
        content: firstAnswerForNoHadComma,
      },
    ] as OpenAI.ChatCompletionUserMessageParam[];

    const newQuestion = {
      role: 'user' as const,
      content: JSON.stringify([item]),
    };

    messages.push(newQuestion);
    const batchFormat = {
      custom_id: `$request-${idx + 1}`,
      method: 'POST',
      url: '/v1/chat/completions',
      body: {
        model: 'gpt-4o', // 'gpt-3.5-turbo', // gpt-4o
        messages,
        max_tokens: 500,
      },
    };
    return batchFormat;
  });

fs.writeFileSync(path.join(__dirname, '../../../data/dailyLifeSign/batchFormat/noHadComma-json.json'), JSON.stringify(batchJSONFormatsWhichNoHaveComma));

const dailyLifeSignNoHadCommaBatchFormatJsonlString = dailyLifeSignNoHadCommaBatchFormat.map(obj => JSON.stringify(obj)).join('\n');
fs.writeFileSync(path.join(__dirname, '../../data/dailyLifeSign/batchFormat/noHadComma-jsonl.jsonl'), dailyLifeSignNoHadCommaBatchFormatJsonlString);
