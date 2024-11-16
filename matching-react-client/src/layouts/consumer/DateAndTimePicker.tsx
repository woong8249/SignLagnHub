/* eslint-disable react/jsx-newline */
/* eslint-disable no-unused-vars */
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/locale';
import { Provider } from '@pages/BookingPage';
import { calculateAvailableTimes } from '@utils/timeUtils'; // 방금 정의한 함수 import
import { IoTimeOutline } from 'react-icons/io5';
import { PlaceSearchBar } from './LocationSearchBar';
import { MdOutlinePlace } from 'react-icons/md';
interface DatePickerComponentProps {
  provider: Provider;
  onSelectDate: (date: Date) => void;
  onSelectTime: (time: string) => void; // 시간 선택 핸들러 추가
}

export function DateAndTimePicker({ provider, onSelectDate, onSelectTime }: DatePickerComponentProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const availableDates = provider.workSchedules.map((schedule) => new Date(schedule.date));
  function handleDateChange(date: Date | null) {
    if (date) {
      setSelectedDate(date);
      setSelectedTime(null);
      onSelectDate(date);
      const times = calculateAvailableTimes(date, provider);
      setAvailableTimes(times);
    }
  }

  function handleTimeChange(time: string | null) {
    setSelectedTime(time);
    onSelectTime(time as string);
  }

  return (
    <div className="mt-2 w-full">
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        filterDate={(date) => availableDates.some(
          (availableDate) => availableDate.toDateString() === date.toDateString(),
        )}
        inline
        locale={ko}
        dateFormat="yyyy년 MM월 dd일"
        calendarClassName="custom-calendar"
        renderCustomHeader={({ date, decreaseMonth, increaseMonth }) => (
          <div className="flex justify-center items-center gap-3 px-2 py-1">
            <button
              onClick={decreaseMonth}
              className="focus:outline-none font-bold text-lg text-gray-500 hover:text-gray-900"
            >
              &lt;
            </button>
            <span className="font-medium text-gray-700 text-lg">
              {`${date.getFullYear()}년 ${date.getMonth() + 1}월`}
            </span>
            <button
              onClick={increaseMonth}
              className="focus:outline-none font-bold text-lg text-gray-500 hover:text-gray-900"
            >
              &gt;
            </button>
          </div>
        )}
      />

      {/* 시간 선택 UI */}
      {availableTimes.length > 0 && (
        <div className="my-6">
          <hr />
          <div className='flex items-center gap-2 px-3 py-6'>
            <IoTimeOutline className='w-6 h-6' />
            <div className='text-lg font-bold'> 시간을 선택해 주세요.</div>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {availableTimes.map((time, index) => (
              <button
                key={index}
                onClick={() => handleTimeChange(time)}
                className={`border p-2 rounded-lg text-sm hover:border-blue-200 ${time === selectedTime && 'bg-blue-300'}`}
              >
                {time}
              </button>
            ))}
          </div>
        </div>
      )}

      {selectedTime && (
      <div className="my-6">
        <hr />
        <div className='flex items-center gap-2 px-3 py-6'>
          <MdOutlinePlace className='w-6 h-6' />
          <div className='text-lg font-bold'> 장소를 입력해 주세요.</div>
        </div>

        <PlaceSearchBar
          onSelectLocation={(location) => {
            console.log('선택된 위치:', location);
          }}
        />

      </div>
      )}
    </div>
  );
}
