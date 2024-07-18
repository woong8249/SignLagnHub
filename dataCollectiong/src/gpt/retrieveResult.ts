// import fs from 'fs';
// import path from 'path';

import openai from './client';

export async function retrieveResult(outputFileId = 'file-1MXDJUcjVT4dTKo60QQKDZ1r') {
  const fileResponse = await openai.files.content(outputFileId);
  const fileContentSplit = (await fileResponse.text()).split('\n');
  return (fileContentSplit.slice(0, fileContentSplit.length - 1).map(item => (JSON.parse(item) as Record<string, string>)));
}

// const dailyLifeSignHadComma = await retrieveResult();
// const dailyLifeSignNoHadComma = await retrieveResult('file-ovbf2cwWOjEyRCf11YITOdSl');

// fs.writeFileSync(path.join(__dirname, '../../dist', 'dailyLifeSign-hadComma-batchResult.json'), JSON.stringify(dailyLifeSignHadComma));
// fs.writeFileSync(path.join(__dirname, '../../dist', 'dailyLifeSign-noHadComma-batchResult.json'), JSON.stringify(dailyLifeSignNoHadComma));
