/* eslint-disable camelcase */
import openai from './client';

export async function createBatch(input_file_id:string) {
  const batch = await openai.batches.create({
    input_file_id,
    endpoint: '/v1/chat/completions',
    completion_window: '24h',
  });
  return batch;
}

const result = await createBatch('file-LmzMPuOXtbrvlnMtkDqdOXEF');
console.dir(result);
// {
//   id: 'batch_0K95Yw2zhxq9VEjXZ1RCo4vi',
//   object: 'batch',
//   endpoint: '/v1/chat/completions',
//   errors: null,
//   input_file_id: 'file-LmzMPuOXtbrvlnMtkDqdOXEF',
//   completion_window: '24h',
//   status: 'validating',
//   output_file_id: null,
//   error_file_id: null,
//   created_at: 1721501708,
//   in_progress_at: null,
//   expires_at: 1721588108,
//   finalizing_at: null,
//   completed_at: null,
//   failed_at: null,
//   expired_at: null,
//   cancelling_at: null,
//   cancelled_at: null,
//   request_counts: { total: 0, completed: 0, failed: 0 },
//   metadata: null
// }
