import fs from 'fs';
import path from 'path';

import OpenAI from 'openai';

import dailyLifeSignAPIResults from '../../dist/dailyLifeSign-APIResults.json';
import dailyLifeSignHadCommaBatchFormat from '../../dist/dailyLifeSign-hadComma-batchFormat-json.json';
import dailyLifeSignNoHadCommaBatchFormat from '../../dist/dailyLifeSign-noHadComma-batchFormat-json.json';

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

fs.writeFileSync(path.join(__dirname, '../../dist/dailyLifeSign-hadComma-batchFormat-json.json'), JSON.stringify(batchJSONFormatsWhichHaveComma));

const jsonlString = dailyLifeSignHadCommaBatchFormat.map(obj => JSON.stringify(obj)).join('\n');
fs.writeFileSync(path.join(__dirname, '../../dist/dailyLifeSign-hadComma-batchFormat-jsonl.jsonl'), jsonlString);

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

fs.writeFileSync(path.join(__dirname, '../../dist/dailyLifeSign-noHadComma-batchFormat-json.json'), JSON.stringify(batchJSONFormatsWhichNoHaveComma));

const dailyLifeSignNoHadCommaBatchFormatJsonlString = dailyLifeSignNoHadCommaBatchFormat.map(obj => JSON.stringify(obj)).join('\n');
fs.writeFileSync(path.join(__dirname, '../../dist/dailyLifeSign-noHadComma-batchFormat-jsonl.jsonl'), dailyLifeSignNoHadCommaBatchFormatJsonlString);
