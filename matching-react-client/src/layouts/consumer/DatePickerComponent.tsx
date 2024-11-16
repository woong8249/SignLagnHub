/* eslint-disable no-unused-vars */
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/locale';

interface DatePickerComponentProps {
  availableDates: Date[];
  onSelectDate: (date: Date) => void;
}

export function DatePickerComponent({ availableDates, onSelectDate }: DatePickerComponentProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const isAvailableDate = (date: Date) => availableDates.some(
    (availableDate) => availableDate.toLocaleDateString() === date.toLocaleDateString(),
  );

  const handleDateChange = (date: Date | null) => {
    if (date) {
      setSelectedDate(date);
      onSelectDate(date);
    }
  };

  return (
    <div className="mt-2 w-full">
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        filterDate={isAvailableDate}
        inline
        locale={ko}
        dateFormat="yyyy년 MM월 dd일"
        calendarClassName="custom-calendar" // 달력 스타일 클래스 추가
        renderCustomHeader={
          ({ date, decreaseMonth, increaseMonth }) => {
            const today = new Date();
            const isPreviousDisabled = date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear();

            return (
              <div className="flex justify-center items-center gap-3 px-2 py-1">
                <button
                  onClick={decreaseMonth}
                  disabled={isPreviousDisabled}
                  className={`focus:outline-none font-bold text-lg ${isPreviousDisabled ? 'text-gray-300 opacity-50 cursor-not-allowed' : 'text-gray-500 hover:text-gray-900'}`}>
                  &lt;
                </button>

                <span className="font-medium text-gray-700 text-lg">
                  {`${date.getFullYear()}.${date.getMonth() + 1}`}
                </span>

                <button
                  onClick={increaseMonth}
                  className="text-gray-500 hover:text-gray-900 focus:outline-none font-bold text-lg"
                >
                  &gt;
                </button>
              </div>
            );
          }}
        />

    </div>
  );
}
