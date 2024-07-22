import type OpenAI from 'openai';

import { firstAnswer, firstQuestion } from './batch/dailyLifeSign-haveComma';
import openai from './client';

type inputType = {
  title: string,
  subDescription:string,
  regDate:string
}

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
    model: 'gpt-3.5-turbo', // 'gpt-3.5-turbo', // gpt-4o,

  });
  return completion;
}
