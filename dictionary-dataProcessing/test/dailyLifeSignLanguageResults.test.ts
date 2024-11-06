import {
  describe, expect, it,
} from 'vitest';

import dailyLifeSignLanguageResults from '../data/dailyLifeSign/apiResults.json';

const dataForTest = dailyLifeSignLanguageResults
  .map(_item => _item.response.body.items.item)
  .flat()
  .map(({ title, regDate, subDescription }) => ({ title, regDate, subDescription }));

// const dataHadComma = dailyLifeSignLanguageResults
//   .map(item => item.response.body.items.item).flat()
//   .filter(item => item.title.includes(','))
//   .map(({ title, regDate, subDescription }) => ({ title, regDate, subDescription }));

const numberOfData = 3616;
// 한글,마침표,따옴표,괄호,띄어쓰기 까지만 허용
const regexToFindSpecialCharacters = /[^가-힣ㄱ-ㅎㅏ-ㅣ.,() ]/;
const regexForURL = /^http:\/\/sldict\.korean\.go\.kr\/multimedia\/multimedia_files\/convert\/\d{8}\/\d+\/[\w\d]+\.mp4$/;

describe('Test dailyLifeSignLanguageResults', () => {
  it('The total number of data is 3616', () => {
    expect(dataForTest.length).toBe(numberOfData);
    expect.assertions(1);
  });

  it('Check property presence', () => {
    dataForTest.forEach(item => {
      expect(item).toHaveProperty('title');
      expect(item).toHaveProperty('regDate');
      expect(item).toHaveProperty('subDescription');
    });
    expect.assertions(numberOfData * 3);
  });

  it('Check property', () => {
    const titlesIncloudeSpecialCH: string[] = [];
    dataForTest.forEach(item => {
      expect(item).toHaveProperty('title');
      expect(item).toHaveProperty('regDate');
      expect(item).toHaveProperty('subDescription');
      if (regexToFindSpecialCharacters.test(item.title)) {
        titlesIncloudeSpecialCH.push(item.title);
      }
      if (!regexForURL.test(item.subDescription)) {
        console.log(item.subDescription);
      }
    });
    expect.assertions(numberOfData * 3);
    // console.log('titlesIncloudeSpecialCH :', titlesIncloudeSpecialCH);
  });

  it('duplicate word test', () => {
    const target = dataForTest.map(({ title }) => title);
    const uniqueArr = [...new Set(target)];
    const duplicateMap = {} as Record<string, number>;
    target.forEach(item => {
      if (!duplicateMap[item]) {
        duplicateMap[item] = 1;
      } else {
        duplicateMap[item] += 1;
      }
    });
    // console.log('중복된 항목 개수', target.length - Object.keys(duplicateMap).length);
    Object.keys(duplicateMap).forEach(item => {
      if ((duplicateMap[item] as number) > 1) {
        // console.log(`중복된 항목: ${item}, 개수: ${duplicateMap[item]}`);
      }
    });
    expect(uniqueArr.length !== 3616).toBe(true); // 중복이 있음을 검증
  });

  it('duplicate word test2', () => {
    const itemIncludedComma = dataForTest.filter(item => !(item.title.includes(',')));
    console.log('itemIncludedComma:', itemIncludedComma.length);
    const target = dataForTest.map(({ title }) => {
      if (title.includes(',')) {
        return title.split(',');
      }
      return title;
    }).flat();

    const uniqueArr = [...new Set(target)];
    const duplicateMap = {} as Record<string, number>;
    target.forEach(item => {
      if (!duplicateMap[item]) {
        duplicateMap[item] = 1;
      } else {
        duplicateMap[item] += 1;
      }
    });
    console.log('Number of duplicate word', target.length - Object.keys(duplicateMap).length);
    Object.keys(duplicateMap).forEach(item => {
      if ((duplicateMap[item] as number) > 1) {
        // console.log(`duplicate word: ${item} , number: ${duplicateMap[item]}`);
      }
    });
    expect(uniqueArr.length !== 3616).toBe(true); // 중복이 있음을 검증
  });
}); //

//
// =================const regexToFindSpecialCharacters = /[^가-힣ㄱ-ㅎㅏ-ㅣ.,() ]/; 한글,마침표,따옴표,괄호,띄어쓰기 까지만 허용
// title : -청,지다
// title : 함께,같이,동반,랑,아울러,더불다,-끼리
// title : -국,국가,나라
// title : 비용,경비,-비,용돈
// title : -도,제주,제주도
// title : -탕,죽
// title : 곧,금명간,신속,이르다,냉큼,빨리,속히,썩,어서,얼른,이내,일찍,일찍이,-자
// title : 꼭,약속,-야,필수,필시
// title : 사랑,-애
// title : 계속,연속,이어,내내,-면서,지속,끊임없이
// title : -관
// title : 계기,동기,말미암다,-자
// title : -면,임시,그러면
// title : 반대,반하다,반-
// title : 성격,-성,성미,성질,질
// title : 겪다,당하다,-던,-았(-었),적
// title : 유럽 연합,이유(EU)
// title : 만큼,어치,정도,-쯤
// title : 증,마크,-증
// title : -관
// title : -광
// title : 과,-꾼,전공,똑바로
// title : 문의,물음,질문,묻다,물어보다,여쭈다,여쭙다,-ㅂ니까
// title : 끊어지다,-다가
// title : 대응,맞추다¹
// title : 1층
// title : 섬기다,존경,-님
// title : -ㅂ시다,-자
// title : 귀신(鬼神)같이 사라지다
// title : 사람,인간,분,이,자,-민
// title : -ㅂ니다,-습니다
// title : 계산,수,셈,세다¹,헤아리다
// title : 미-,미처,아직
// title : -전
// title : 협박,-할 뻔하다
// title : 위하다,-러
// title : 때문,바람,탓,말미암다,인하다,-니까
