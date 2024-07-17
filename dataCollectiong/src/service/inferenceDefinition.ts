import OpenAI from 'openai';

import config from '../config/config';

type inputType = {
  title: string,
  subDescription:string,
  regDate:string
}

const { apiKey } = config;
const firstQuestion = JSON.stringify([
  {
    title: '감추다,숨다,은닉',
    subDescription: 'http://sldict.korean.go.kr/multimedia/multimedia_files/convert/20220729/1003150/MOV000359582_700X466.mp4',
    regDate: '2023-05-24 11:04:42',
  },
]);
const firstAnswer = JSON.stringify([
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

const openai = new OpenAI({ apiKey });

export async function inferenceDefinitionForHadComma(content :inputType[]) {
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

  const question = {
    role: 'user' as const,
    content: JSON.stringify(content),
  };

  messages.push(question);

  const completion = await openai.chat.completions.create({
    messages,
    model: 'gpt-4o', // 'gpt-3.5-turbo', // gpt-4o
  });
  return completion;
}
