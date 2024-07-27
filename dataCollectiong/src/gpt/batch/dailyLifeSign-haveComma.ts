import fs from 'fs';
import path from 'path';

import OpenAI from 'openai';

import dailyLifeSignAPIResults from '../../../data/dailyLifeSign/apiResults.json';

export const firstQuestion = JSON.stringify([
  {
    title: '감추다,숨다,은닉',
    subDescription: 'http://sldict.korean.go.kr/multimedia/multimedia_files/convert/20220729/1003150/MOV000359582_700X466.mp4',
    regDate: '2023-05-24 11:04:42',
  },
]);
export const firstAnswer = JSON.stringify([
  {
    words: [
      [
        '감추다',
        '보이지 않게 하거나 드러나지 않게 하다',
      ],
      [
        '숨다',
        '자신을 보이지 않게 하거나 다른 사람에게 발각되지 않도록 하다',
      ],
      [
        '은닉',
        '어떤 물건이나 사실을 남이 모르게 숨기다',
      ],
    ],
    subDescription: 'http://sldict.korean.go.kr/multimedia/multimedia_files/convert/20220729/1003150/MOV000359582_700X466.mp4',
    regDate: '2023-05-24 11:04:42',
  },
]);

const batchJSONFormatsWhichHaveComma = dailyLifeSignAPIResults
  .map(_item => _item.response.body.items.item)
  .flat()
  .map(({ title, regDate, subDescription }) => ({ title, regDate, subDescription }))
  .filter(({ title }) => {
    if (title.includes(',')) {
      return true;
    }
    return false;
  })
  .map((item, idx) => {
    const messages = [
      {
        role: 'system',
        content: `You are a helpful assistant that converts data into a specific JavaScript array format containing definitions of words. The words in the provided array may (or may not) be synonyms.
         Even if they are synonyms, express the definition of each word slightly differently.`,
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

fs.writeFileSync(path.join(__dirname, '../../../data/dailyLifeSign/batchFormat/hadComma-json.json'), JSON.stringify(batchJSONFormatsWhichHaveComma));

const jsonlString = batchJSONFormatsWhichHaveComma.map(obj => JSON.stringify(obj)).join('\n');
fs.writeFileSync(path.join(__dirname, '../../../data/dailyLifeSign/batchFormat/hadComma-jsonl.jsonl'), jsonlString);
