// src/utils/workScheduleApi.ts
import { FakeApi } from '@utils/fakeApi';
import { WorkSchedule } from '@typings/WorkSchedule';

export class WorkScheduleApi extends FakeApi<WorkSchedule> {
  constructor() {
    super('workSchedules'); // 로컬 스토리지 키 설정
  }
}

export const workScheduleApi = new WorkScheduleApi();
