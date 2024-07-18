import fs from 'fs';
import path from 'path';

import openai from './client';

export async function uploadBatchFile(fileName = 'dailyLifeSign-hadComma-batchFormat-jsonl.jsonl') {
  const filePath = path.join(__dirname, '../../dist', fileName);
  const file = await openai.files.create({
    file: fs.createReadStream(filePath),
    purpose: 'batch',
  });
  return file;
}
