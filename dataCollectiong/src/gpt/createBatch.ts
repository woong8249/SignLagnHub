/* eslint-disable camelcase */
import openai from './client';

export async function createBatch(input_file_id = 'file-FS86LqU0Z0d2IhAmUlfYjGlF') {
  const batch = await openai.batches.create({
    input_file_id,
    endpoint: '/v1/chat/completions',
    completion_window: '24h',
  });
  return batch;
}
