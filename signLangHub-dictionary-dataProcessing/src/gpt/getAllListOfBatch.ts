/* eslint-disable no-restricted-syntax */
import openai from './client';

export async function main() {
  const list = await openai.batches.list();

  for await (const batch of list) {
    console.log(batch);
  }
}

await main();
