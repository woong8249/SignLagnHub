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
    return []; // 업무시간이 없는 날은 예약 불가능
  }

  const startHour = new Date(workSchedule.startTime).getHours();
  const endHour = new Date(workSchedule.endTime).getHours();
  const lunchBreakStart = 12;
  const lunchBreakEnd = 13;

  const allTimes: string[] = [];
  for (let hour = startHour; hour < endHour; hour += 1) {
    if (hour >= lunchBreakStart && hour < lunchBreakEnd) continue; // 점심시간 제외
    allTimes.push(`${hour}:00`);
  }

  // 예약된 시간 제외 => 수정해야함
  const bookedTimes = provider.bookings
    .filter((booking) => new Date(booking.date).toDateString() === selectedDate.toDateString())
    .map((booking) => `${new Date(booking.time).getHours()}:00`);

  const availableTimes = allTimes.filter((time) => !bookedTimes.includes(time));

  return availableTimes;
}
