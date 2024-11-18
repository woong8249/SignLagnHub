/* eslint-disable no-nested-ternary */
import { WorkSchedule, WorkScheduleState } from '@typings/WorkSchedule';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { workScheduleApi } from '@utils/workScheduleApi'; // workScheduleApi 가져오기

interface WorkScheduleSectionProps {
  workSchedules: WorkSchedule[];
}

export function WorkScheduleSection({ workSchedules }: WorkScheduleSectionProps) {
  const today = new Date();
  const todaySchedule = workSchedules.find(
    (schedule) => format(new Date(schedule.date), 'yyyy-MM-dd') === format(today, 'yyyy-MM-dd'),
  );

  const weekSchedule = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(today);
    date.setDate(today.getDate() - today.getDay() + i); // 주간 시작 기준 설정 (일요일부터 토요일까지)
    return {
      date,
      schedule: workSchedules.find(
        (schedule) => format(new Date(schedule.date), 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd'),
      ),
    };
  });

  const handleStateChange = (id: number, newState: WorkScheduleState) => {
    workScheduleApi.update(id, {
      state: newState,
      ...(newState === 'working' && { actualStartTime: new Date() }), // 출근 시 실제 출근 시간 기록
      ...(newState === 'afterWork' && { actualEndTime: new Date() }), // 퇴근 시 실제 퇴근 시간 기록
    });
  };

  return (
    <div className="w-full xl:w-[35%] space-y-6">
      <div className="bg-gray-100 rounded-3xl p-6">
        <h2 className="text-xl font-bold text-gray-500 mb-4">오늘 근무</h2>
        <hr className="p-4" />

        {/* 오늘 근무 */}
        {todaySchedule ? (
          <div className="p-4 bg-white rounded-xl shadow-md">
            {/* 날짜 */}
            <div className="text-gray-500 text-lg font-bold mb-2  border-b-2">
              {format(new Date(todaySchedule.date), 'M/d (E)', { locale: ko })}
            </div>

            {/* 시간 */}
            <div className="text-gray-500 font-medium">
              {todaySchedule.startTime && todaySchedule.endTime
                ? `${format(new Date(todaySchedule.startTime), 'p', { locale: ko })} - ${format(new Date(todaySchedule.endTime), 'p', { locale: ko })}`
                : '휴무'}
            </div>

            {/* 상태 표시 */}
            <div className="text-sm text-gray-400 font-semibold mt-2">
              {todaySchedule.state === 'beforeWork' && '출근 전'}
              {todaySchedule.state === 'working' && '근무 중'}
              {todaySchedule.state === 'afterWork' && '퇴근 완료'}
              {todaySchedule.state === 'holiday' && '휴무'}
            </div>

            {/* 실제 출근/퇴근 시간 */}
            {(todaySchedule.actualStartTime || todaySchedule.actualEndTime) && (
            <div className="mt-2 text-sm text-gray-400">
              {todaySchedule.actualStartTime && (
              <div>{`출근 시간: ${format(new Date(todaySchedule.actualStartTime), 'p', { locale: ko })}`}</div>
              )}

              {todaySchedule.actualEndTime && (
              <div>{`퇴근 시간: ${format(new Date(todaySchedule.actualEndTime), 'p', { locale: ko })}`}</div>
              )}
            </div>
            )}

            {/* 버튼 */}
            <div className="mt-4">
              {todaySchedule.state === 'beforeWork' && (
              <button
          onClick={() => handleStateChange(todaySchedule.id, 'working')}
          className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-green-600"
        >
                출근하기
              </button>
              )}

              {todaySchedule.state === 'working' && (
              <button
          onClick={() => handleStateChange(todaySchedule.id, 'afterWork')}
          className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
                퇴근하기
              </button>
              )}
            </div>
          </div>
        ) : (
          <div className="text-gray-500">오늘은 근무 일정이 없습니다.</div>
        )}

      </div>

      <div className="bg-gray-100 rounded-3xl p-6">
        <h2 className="text-xl font-bold text-gray-500 mb-4">이번 주 근무</h2>
        <hr className="p-4" />

        {/* 이번 주 근무 */}
        <div className="grid grid-cols-7 gap-2">
          {weekSchedule.map(({ date, schedule }, index) => (
            <div
              key={index}
              className={`px-2 pt-1 rounded-lg text-center ${
                format(date, 'yyyy-MM-dd') === format(today, 'yyyy-MM-dd')
                  ? 'bg-blue-100'
                  : 'bg-gray-50'
              }`}
            >
              <div
                className={`font-bold text-sm m-1 ${
                  index === 0 ? 'text-red-500' : index === 6 ? 'text-blue-500' : ''
                }`}
              >
                {format(date, 'E', { locale: ko })}
              </div>

              <div className="text-xs text-gray-600 pb-2">
                {!schedule
                  ? '일정 없음'
                  : schedule.state === 'holiday' ? (
                    <span className="text-blue-500 font-semibold">연차</span>
                  ) : (
                    `${format(new Date(schedule.startTime!), 'p', { locale: ko })} - ${format(new Date(schedule.endTime!), 'p', { locale: ko })}`
                  )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
