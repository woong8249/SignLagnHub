import openai from './client';

export async function retrieveResult(outputFileId = 'file-1MXDJUcjVT4dTKo60QQKDZ1r') {
  const fileResponse = await openai.files.content(outputFileId);
  const fileContentSplit = (await fileResponse.text()).split('\n');
  return (fileContentSplit.slice(0, fileContentSplit.length - 1).map(item => (JSON.parse(item) as Record<string, string>)));
}
