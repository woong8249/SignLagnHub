import fs from 'fs';
import path from 'path';

import openai from './client';

export async function uploadBatchFile(fileNameFromDist :string) {
  const filePath = path.join(__dirname, '../../dist', fileNameFromDist);
  const file = await openai.files.create({
    file: fs.createReadStream(filePath),
    purpose: 'batch',
  });
  return file;
}
const result = await uploadBatchFile('batchFormat/dailyLifeSign-noHadComma-polysemy-batchFormat-jsonl.jsonl');
console.dir(result, { depth: 10 });

// {
//   object: 'file',
//   id: 'file-LmzMPuOXtbrvlnMtkDqdOXEF',
//   purpose: 'batch',
//   filename: 'dailyLifeSign-noHadComma-polysemy-batchFormat-jsonl.jsonl',
//   bytes: 2476411,
//   created_at: 1721501670,
//   status: 'processed',
//   status_details: null
// }
