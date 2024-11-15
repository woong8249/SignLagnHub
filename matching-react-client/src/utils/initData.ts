/* eslint-disable max-len */
/* eslint-disable no-restricted-syntax */

import { centerApi } from '@utils/centerApi';
import { userApi } from '@utils/userApi';
import { workScheduleApi } from '@utils/workScheduleApi';
import { Center } from '@typings/Center';
import { User } from '@typings/User';
import { WorkSchedule } from '@typings/WorkSchedule';
import { getRandomCoordinates, getRandomKoreanName, getRandomPhoneNumber } from './getRandom';

const 서울중구CenterCoordinates = [37.5587304, 126.9867745] as [number, number];
const 시연장소Coordinates = [37.568789, 126.978817] as [number, number];

export function clearLocalStorage(): void {
  localStorage.clear();
}

/**
 * 2주치 평일 WorkSchedule 생성
 */
function generateWorkSchedulesForTwoWeeks(startDate: Date, providerId: number): WorkSchedule[] {
  const schedules: WorkSchedule[] = [];
  const daysToGenerate = 10; // 평일 기준 2주치
  const currentDate = new Date(startDate);

  for (let dayCount = 0; dayCount < daysToGenerate; dayCount += 1) {
    // 오늘부터의 날짜가 평일인지 확인
    if (currentDate.getDay() > 0 && currentDate.getDay() < 6) {
      const isHoliday = providerId === 2 && currentDate.getDay() === 5 && dayCount < 5; // 첫 주 금요일 휴무
      schedules.push({
        id: providerId * 100 + dayCount,
        providerId,
        isHoliday,
        date: new Date(currentDate),
        startTime: isHoliday ? null : new Date(currentDate.setHours(9, 0)),
        endTime: isHoliday ? null : new Date(currentDate.setHours(18, 0)),
        createdAt: new Date().toISOString(),
      });
    }

    // 다음 날짜로 이동
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return schedules;
}

export function initData() {
  // Center 데이터가 이미 있는지 확인
  const centers = centerApi.getAll();
  if (centers.length === 0) {
    const center: Center = {
      id: 1,
      name: '서울중구수어통역센터',
      region: '서울',
      address: '서울특별시 중구 퇴계로20길41-11 남산쉼터 2층',
      phoneNumber: '02-3789-3268',
      videoCallNumber: '070-7947-0031',
      coordinates: [37.558781, 126.986769],
      images: ['https://search.pstatic.net/common/?autoRotate=true&type=w560_sharpen&src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20240813_286%2F1723523915788kGqup_JPEG%2F%25C1%25DF%25B1%25B8%25BC%25F6%25BE%25EE%25C5%25EB%25BF%25AA%25BC%25BE%25C5%25CD.jpg'],
      businessHours: [
        {
          day: '월', open: '09:00', close: '18:00', breakTime: { start: '12:00', end: '13:00' },
        },
        {
          day: '화', open: '09:00', close: '18:00', breakTime: { start: '12:00', end: '13:00' },
        },
        {
          day: '수', open: '09:00', close: '18:00', breakTime: { start: '12:00', end: '13:00' },
        },
        {
          day: '목', open: '09:00', close: '18:00', breakTime: { start: '12:00', end: '13:00' },
        },
        {
          day: '금', open: '09:00', close: '18:00', breakTime: { start: '12:00', end: '13:00' },
        },
        { day: '토', open: null, close: null }, // 정기휴무
        { day: '일', open: null, close: null }, // 정기휴무
      ],
    };

    centerApi.create(center);
  }

  // User 데이터가 이미 있는지 확인
  const users = userApi.getAll();
  if (users.length === 0) {
    // Consumer 생성
    const consumer: User = {
      id: 1,
      role: 'consumer',
      name: '최별규',
      phoneNumber: '010-4233-6898',
      gender: 'M',
      birthDate: new Date('1994-10-03'),
      address: '서울시 중구',
      profileImage: 'https://picsum.photos/200/200',
      serviceOn: false,
      centerId: 1,
      currentCoordinates: 시연장소Coordinates,
    };

    userApi.create(consumer);

    // Providers 생성
    for (let i = 2; i <= 7; i += 1) {
      const provider: User = {
        id: i,
        role: 'provider',
        name: getRandomKoreanName(),
        phoneNumber: getRandomPhoneNumber(),
        gender: i <= 4 ? 'M' : 'F', // 첫 3명 M, 나머지 3명 F
        birthDate: new Date(new Date().setFullYear(new Date().getFullYear() - (Math.floor(Math.random() * 21) + 30))),
        address: '서울시 중구',
        profileImage: 'https://picsum.photos/200/200',
        serviceOn: false,
        centerId: 1,
        currentCoordinates: getRandomCoordinates(...서울중구CenterCoordinates, 1000),
      };

      userApi.create(provider);

      // WorkSchedule 생성
      const today = new Date();
      const schedules = generateWorkSchedulesForTwoWeeks(today, i);
      for (const schedule of schedules) {
        workScheduleApi.create(schedule);
      }
    }
  }

  console.log('Initialization complete: Data is ready.');
}
