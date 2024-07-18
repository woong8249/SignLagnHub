import openai from './client';

export async function checkStatusOfBatch(id = 'batch_lDabs8RWJrr1mkxa2HjOKDf3') {
  const batch = await openai.batches.retrieve(id);
  return batch;
}
