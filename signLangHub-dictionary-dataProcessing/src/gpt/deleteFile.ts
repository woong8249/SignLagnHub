import openai from './client'; // API 키를 가져오는 경로

export async function deleteFile(fileId:string) {
  try {
    const response = await openai.files.del(fileId);
    console.dir(response, { depth: 10 });
  } catch (error) {
    console.error('Error deleting file:', error);
  }
}
