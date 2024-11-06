import openai from './client';

export async function checkStatusOfBatch(id:string) {
  const batch = await openai.batches.retrieve(id);
  return batch;
}
