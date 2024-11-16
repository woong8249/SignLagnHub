/* eslint-disable react/jsx-newline */
/* eslint-disable no-unused-vars */
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/locale';
import { Provider } from '@pages/BookingPage';
import { calculateAvailableTimes } from '@utils/timeUtils';
import { IoCalendarOutline, IoTimeOutline } from 'react-icons/io5';
import { MdOutlinePlace } from 'react-icons/md';
import { PlaceSearchBar } from '@layouts/consumer/LocationSearchBar';
import { AiOutlineMessage } from 'react-icons/ai';
import { CustomAlert } from '@components/CustomAlert'; // 모달 컴포넌트 import
import { useNavigate } from 'react-router-dom';
import { bookingApi } from '@utils/bookingApi';
import { notificationApi } from '@utils/notificationApi';

interface BookingProcessProps {
  provider: Provider;
  onSelectDate: (date: Date) => void;
  onSelectTime: (time: string) => void;
}

export function BookingProcess({ provider, onSelectDate, onSelectTime }: BookingProcessProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedPlace, setSelectedPlace] = useState<{ name: string; lat: number; lng: number } | null>(null);
  const [message, setMessage] = useState('');
  const [isModalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate(); // navigate 사용

  const isAvailableDate = (date: Date) => provider.workSchedules.some((schedule) => {
    const scheduleDate = new Date(schedule.date);
    return (
      scheduleDate.toLocaleDateString() === date.toLocaleDateString()
        && !schedule.isHoliday // 휴일이 아닌 날짜만 허용
    );
  });

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
    <div className="p-4">
      <div>
        <hr className="border-t-1 border-gray-300 " />
        <div className='flex items-center gap-2 px-3 py-6'>
          <IoCalendarOutline className='w-6 h-6' />
          <div className='text-lg font-bold'> 날짜를 선택해 주세요.</div>
        </div>

        <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        filterDate={isAvailableDate}
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
      </div>

      {availableTimes.length > 0 && (
        <div className='my-6'>
          <hr className="border-t-1 border-gray-300 " />
          <div className='flex items-center gap-2 px-3 py-6'>
            <IoTimeOutline className='w-6 h-6' />
            <div className='text-lg font-bold'> 시간을 선택해 주세요.</div>
          </div>
          <div className="grid grid-cols-4 gap-2 bg-white border p-4 rounded-lg">
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
        <div className='my-6'>
          <hr className="border-t-1 border-gray-300 " />
          <div className='flex items-center gap-2 px-3 py-6'>
            <MdOutlinePlace className='w-6 h-6' />
            <div className='text-lg font-bold'> 장소를 입력해 주세요.</div>
          </div>

          <PlaceSearchBar
            onSelectLocation={(location) => {
              setSelectedPlace(location);
              console.log('선택된 위치:', location);
            }}
          />
        </div>
      )}

      {selectedPlace && (
        <div className='mt-6'>
          <hr className="border-t-1 border-gray-300 " />
          <div className='flex items-center gap-2 px-3 py-6'>
            <AiOutlineMessage className='w-6 h-6' />
            <div className='text-lg font-bold'>전달할 메시지를 입력해 주세요.</div>
          </div>
          <textarea
            className="w-full p-2 border rounded-lg"
            rows={4}
            placeholder="메시지를 입력하세요..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <button
          className='mt-6 w-full p-2 flex justify-center border rounded-full bg-green-300 hover:bg-green-500'
          onClick={() => setModalOpen(true)} // 모달 열기
          >
            신청하기
          </button>

          {/* 모달 */}
          {isModalOpen && (
          <CustomAlert
            message="예약신청이 완료 되었습니다."
            onClose={() => {
              setModalOpen(false);
              const book = bookingApi.create({
                providerId: provider.id,
                consumerId: 1,
                date: selectedDate as Date,
                time: selectedTime as string,
                place: selectedPlace as { name: string; lat: number; lng: number },
                isAccepted: false,
                contents: message,
                updatedAt: new Date(),
                createdAt: new Date(),
              });
              navigate('/consumer'); // ConsumerPage로 이동
              setTimeout(() => {
                bookingApi.update(book.id, {
                  ...book, isAccepted: true,
                });
                notificationApi.create({
                  userId: 1,
                  notificationStatus: false,
                  contents: `${provider.name} 통역사님께서 귀하의 예약을 확인하고 완료하셨습니다. 감사합니다.`,
                  isRead: false,
                  updatedAt: new Date(),
                  createdAt: new Date(),
                });
              }, 5000);
            }} // 모달 닫기
          />
          )}
        </div>
      )}

    </div>
  );
}
