export type WorkSchedule = {
    id: number;
    providerId: number; // Provider ID
    isHoliday: boolean; // 휴무 여부
    date: Date; // 날짜
    startTime: Date |null; // 시작 시간
    endTime: Date |null; // 종료 시간
    createdAt: string; // 생성 일시
  };
