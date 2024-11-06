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
