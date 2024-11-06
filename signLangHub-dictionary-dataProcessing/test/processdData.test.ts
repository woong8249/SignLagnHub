import {
  describe, expect, it,
} from 'vitest';

import hadComma from '../data/dailyLifeSign/processedData/hadComma.json';
import noHadComma from '../data/dailyLifeSign/processedData/noHadComma.json';

describe('Test Processed data', () => {
  it('dailyLifeSign-processedData-noHadComma', () => {
    expect(noHadComma.length).toBe(1920);
    noHadComma.forEach(({ words, regDate, subDescription }) => {
      expect(Array.isArray(words)).toBe(true);
      expect(typeof regDate).toBe('string');
      expect(typeof subDescription).toBe('string');
    });
    expect.assertions(1 + noHadComma.length * 3);
  });

  it('dailyLifeSign-processedData-hadComma', () => {
    expect(hadComma.length).toBe(1647);
    hadComma.forEach(({ words, regDate, subDescription }) => {
      expect(Array.isArray(words)).toBe(true);
      if (typeof regDate !== 'string') {
        console.log('words', words);
        console.log('regDate', regDate);
        console.log('subDescription', subDescription);
      }
      expect(typeof regDate).toBe('string');
      expect(typeof subDescription).toBe('string');
    });
    expect.assertions(1 + hadComma.length * 3);
  });
});
