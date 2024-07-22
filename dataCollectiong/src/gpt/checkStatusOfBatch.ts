import openai from './client';

export async function checkStatusOfBatch(id:string) {
  const batch = await openai.batches.retrieve(id);
  return batch;
}
const result = await checkStatusOfBatch('batch_0K95Yw2zhxq9VEjXZ1RCo4vi');
console.dir(result, { depth: 5 });

// output_file_id: 'file-QbKb5uaryyWEeXf68ukR30m2',
//  input_file_id: 'file-XsBs2FnwBTL1bsa0ehipti2n',
