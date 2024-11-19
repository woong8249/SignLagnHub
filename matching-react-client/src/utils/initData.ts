/* eslint-disable max-len */
/* eslint-disable no-restricted-syntax */

import { centerApi } from '@utils/centerApi';
import { userApi } from '@utils/userApi';
import { workScheduleApi } from '@utils/workScheduleApi';
import { Center } from '@typings/Center';
import { User } from '@typings/User';
import { WorkSchedule, WorkScheduleState } from '@typings/WorkSchedule';
import { getRandomPhoneNumber } from './getRandom';
import { providers } from '@constants/providers';

const 서울중구CenterCoordinates = [37.5587304, 126.9867745] as [number, number];
const 시연장소Coordinates = [37.568789, 126.978817] as [number, number];

export function clearLocalStorage(): void {
  localStorage.clear();
}

function getMonday(date: Date): Date {
  const currentDate = new Date(date);
  const day = currentDate.getDay();
  const diff = currentDate.getDate() - day + (day === 0 ? -6 : 1); // 월요일 계산
  return new Date(currentDate.setDate(diff));
}

function generateWorkSchedulesForTwoWeeks(startDate: Date, providerId: number): Omit<WorkSchedule, 'id'>[] {
  const schedules: Omit<WorkSchedule, 'id'>[] = [];
  const daysToGenerate = 13; // 평일 기준 2주치
  const currentDate = new Date(startDate);

  for (let dayCount = 0; dayCount < daysToGenerate; dayCount += 1) {
    // 평일인지 확인 (월~금)
    if (currentDate.getDay() > 0 && currentDate.getDay() < 6) {
      const isFriday = currentDate.getDay() === 5; // 금요일 확인
      const isHoliday = providerId === 2 && isFriday; // 특정 조건: 금요일 휴무
      const now = new Date(); // 현재 시간

      // startTime과 endTime을 복사하여 사용 (currentDate는 변경하지 않음)
      const startTime = new Date(currentDate);
      startTime.setHours(9, 0, 0, 0);

      const endTime = new Date(currentDate);
      endTime.setHours(18, 0, 0, 0);

      let state: WorkScheduleState = 'beforeWork';
      let actualStartTime: Date | undefined;
      let actualEndTime: Date | undefined;

      if (isHoliday) {
        state = 'holiday';
      } else {
        if (now >= startTime && now < endTime) {
          state = 'working'; // 근무 중
          actualStartTime = new Date(new Date(currentDate).setHours(8, 50, 0, 0));
        } else if (now >= endTime) {
          state = 'afterWork'; // 퇴근
        } else {
          state = 'beforeWork'; // 출근 전
        }

        // 지난 날짜에 대해 실제 출퇴근 시간을 자동 설정
        if (currentDate < now) {
          actualStartTime = new Date(startTime);
          actualEndTime = new Date(endTime);
        }
      }

      schedules.push({
        providerId,
        state,
        date: new Date(currentDate),
        startTime: isHoliday ? undefined : startTime,
        endTime: isHoliday ? undefined : endTime,
        actualStartTime,
        actualEndTime,
        createdAt: new Date(),
        updatedAt: new Date(),
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
      coordinates: 서울중구CenterCoordinates,
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
      profileImage: 'che-profile.jpg',
      serviceOn: false,
      centerId: 1,
      currentCoordinates: 시연장소Coordinates,
    };

    userApi.create(consumer);

    providers.forEach((item, i) => {
      const provider :Omit<User, 'id'> = {
        ...item,
        role: 'provider' as const,
        phoneNumber: getRandomPhoneNumber(),
        birthDate: new Date(new Date().setFullYear(new Date().getFullYear() - (Math.floor(Math.random() * 21) + 30))),
        address: '서울시 중구',
        serviceOn: false,
        centerId: 1,
      };

      userApi.create(provider);
      const today = new Date();
      const monday = getMonday(today); // 금주 월요일 계산
      const schedules = generateWorkSchedulesForTwoWeeks(monday, i);
      for (const schedule of schedules) {
        workScheduleApi.create(schedule);
      }
    });
  }
}
