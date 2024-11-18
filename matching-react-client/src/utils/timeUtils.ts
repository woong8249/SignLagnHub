/* eslint-disable no-continue */
import { Provider } from '@pages/BookingPage';

export function calculateAvailableTimes(
  selectedDate: Date,
  provider: Provider,
): string[] {
  const workSchedule = provider.workSchedules.find(
    (schedule) => new Date(schedule.date).toDateString() === selectedDate.toDateString(),
  );

  if (!workSchedule || !workSchedule.startTime || !workSchedule.endTime) {
    return []; // 근무 일정이 없는 날은 예약 불가능
  }

  const startHour = new Date(workSchedule.startTime).getHours();
  const endHour = new Date(workSchedule.endTime).getHours();
  const lunchBreakStart = 12;
  const lunchBreakEnd = 13;

  const allTimes: string[] = [];

  // 근무 시간 내 모든 1시간 단위 시간대 생성
  for (let hour = startHour; hour < endHour; hour += 1) {
    if (hour >= lunchBreakStart && hour < lunchBreakEnd) continue; // 점심시간 제외
    allTimes.push(`${hour}:00`);
  }

  // 예약된 시간 추출 (취소된 예약은 제외)
  const bookedTimes = provider.bookings
    .filter(
      (booking) => new Date(booking.date).toDateString() === selectedDate.toDateString()
        && booking.state !== 'canceled', // 취소된 예약 제외
    )
    .map((booking) => booking.time);

  // 예약된 시간을 제외한 가능한 시간 계산
  const availableTimes = allTimes.filter((time) => !bookedTimes.includes(time));

  return availableTimes;
}
