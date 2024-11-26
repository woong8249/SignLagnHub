export type WorkScheduleState = 'beforeWork' | 'working' | 'afterWork' |'holiday';

export type WorkSchedule = {
  id: number;
  providerId: number; // Provider ID
  state: WorkScheduleState; // 출근 전, 근무 중, 퇴근 상태
  date: Date; // 날짜
  startTime?: Date ; // 예정 시작 시간
  endTime?: Date ; // 예정 종료 시간
  actualStartTime?: Date ; // 실제 출근 시간
  actualEndTime?: Date ; // 실제 퇴근 시간
  createdAt: Date; // 생성 일시
  updatedAt: Date; // 업뎃 일시
};
