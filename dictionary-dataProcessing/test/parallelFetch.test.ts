import {
  describe, expect, it,
} from 'vitest';

import { parallelFetch } from '../src/service/fetchDailyLifeSignLanguage';

describe('Test function parallelFetch', () => {
  it('Parallel launch test', async () => {
    const totalCount = 300;
    const worker = 3;
    const numOfRows = 100;
    const resultLength = Math.floor(totalCount / numOfRows);
    const res = await parallelFetch(totalCount, worker, numOfRows);
    expect(res.length >= resultLength).toBe(true);
  });
}, 500_000); //

// runTime
// parallelFetch(100,1) => 25초
// parallelFetch(200,2) => 28초
// parallelFetch(500,5) => 60초
// parallelFetch(1000,5) => 72초
// parallelFetch(3700,5,800) => api 터짐
// parallelFetch(3700,5,200) => api 터짐
// parallelFetch(3700,4,200) =>  180초
//
