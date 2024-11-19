import { useState } from 'react';
import { Booking, BookingState } from '@typings/Booking';
import { IoChevronDown, IoChevronForward } from 'react-icons/io5';
import { userApi } from '@utils/userApi';
import { bookingApi } from '@utils/bookingApi';
import { CustomAlert } from '@components/CustomAlert';
import { notificationApi } from '@utils/notificationApi';
import { ConsumerWithAllInfo } from '@typings/User';

type BookingFilter = 'all' | 'requested' | 'accepted' | 'service_end';

interface BookingSectionProps {
  bookings: Booking[];
}

function getBookingStateLabel(state: BookingState): string {
  switch (state) {
    case 'requested':
      return '예약 신청';
    case 'accepted':
      return '예약 확정';
    case 'canceled':
      return '예약 취소';
    case 'service_start_requested':
      return '서비스 시작 요청';
    case 'service_start':
      return '서비스 시작';
    case 'service_end_requested':
      return '서비스 종료 요청';
    case 'service_end':
      return '서비스 종료';
    default:
      return '알 수 없는 상태';
  }
}

export function BookingListSection({ bookings }: BookingSectionProps) {
  const [filter, setFilter] = useState<BookingFilter>('all');
  const [expandedBooking, setExpandedBooking] = useState<number | null>(null);
  const [message, setMessage] = useState('');
  const [isModalOpen, setModalOpen] = useState(false);

  const filteredBookings = bookings
    .filter((booking) => {
      if (filter === 'all') return true;
      if (filter === 'requested') return booking.state === 'requested';
      if (filter === 'accepted') return booking.state === 'accepted';
      if (filter === 'service_end') return booking.state === 'service_end';
      return false;
    })
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());

  function handleOnConfirmed(booking:Booking) {
    bookingApi.update(booking.id, { state: 'accepted' });

    const provider = userApi.getById(booking.providerId) as ConsumerWithAllInfo;
    const formattedDate = new Intl.DateTimeFormat('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(booking.date as Date);

    const formattedDateTime = `${formattedDate} ${booking.time}`;

    notificationApi.create({
      targetUserId: booking.consumerId,
      contents: `${provider.name}님이 ${formattedDateTime}에 신청하신 예약을 확정하였습니다.`,
      state: 'new',
      updatedAt: new Date(),
      createdAt: new Date(),
    });
    setModalOpen(false);
    alert('예약이 확정되었습니다');
  }

  function handleOnStartRequested(booking: Booking) {
    bookingApi.update(booking.id, { state: 'service_start_requested', serviceStartRequestedAt: new Date() });

    const provider = userApi.getById(booking.providerId) as ConsumerWithAllInfo;
    const formattedDate = new Intl.DateTimeFormat('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(booking.date as Date);

    const formattedDateTime = `${formattedDate} ${booking.time}`;

    notificationApi.create({
      targetUserId: booking.consumerId,
      contents: `${provider.name}님이 ${formattedDateTime}에 예약된 서비스의 시작을 요청하였습니다.`,
      state: 'new',
      updatedAt: new Date(),
      createdAt: new Date(),
    });
    setModalOpen(false);
    alert('서비스 시작 요청이 완료되었습니다.');
  }

  return (
    <section className="bg-gray-100 w-full rounded-3xl p-4 xl:w-[35%] flex flex-col">

      <h2 className='text-xl font-bold p-4 text-gray-500'> 예약 목록</h2>
      <hr />

      {/* 필터 버튼 */}
      <div className="flex justify-center gap-2 my-6">
        {['all', 'requested', 'accepted', 'service_end'].map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type as BookingFilter)}
            className={`px-3 py-2 text-sm rounded-md ${
              filter === type ? 'bg-blue-400 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            {type === 'all' && '전체'}
            {type === 'requested' && '예약 신청'}
            {type === 'accepted' && '예약 확정'}
            {type === 'service_end' && '서비스 종료'}
          </button>
        ))}
      </div>

      {/* 예약 리스트 */}
      <div className="overflow-y-auto max-h-[full] p-2 space-y-2">
        {filteredBookings.length > 0 ? (
          filteredBookings.map((booking) => {
            const consumerInfo = userApi.getById(booking.consumerId);

            return (
              <div
                key={booking.id}
                className="p-4 border rounded-lg shadow-md bg-white flex flex-col"
                >
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    {consumerInfo?.profileImage && (
                    <img
                  src={consumerInfo.profileImage}
                  alt={`${consumerInfo.name} 프로필`}
                  className="w-12 h-12 rounded-full"
                />
                    )}

                    <div>
                      <div className="text-lg font-semibold text-gray-700">
                        {`${consumerInfo?.name || '정보 없음'}`}
                      </div>

                      {/* 예약 날짜 및 시간 */}
                      <div className="text-sm text-gray-500 flex items-center">
                        <span>{new Date(booking.date).toLocaleDateString('ko-KR')}</span>
                        <span className="mx-2 font-light text-gray-400">|</span>
                        <span>{booking.time}</span>
                      </div>

                      {/* 예약 상태 */}
                      <div className="text-sm text-gray-500 mt-1">
                        {getBookingStateLabel(booking.state)}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setExpandedBooking((prev) => (prev === booking.id ? null : booking.id))}
                    className="text-gray-500 focus:outline-none"
                    >
                    {expandedBooking === booking.id ? (
                      <IoChevronDown className="w-5 h-5" />
                    ) : (
                      <IoChevronForward className="w-5 h-5" />
                    )}
                  </button>
                </div>

                {expandedBooking === booking.id && (
                <div className="mt-4 text-sm text-gray-600 space-y-2">
                  <hr />

                  <div>
                    <span className="font-semibold text-gray-800">{'연락처 : '}</span>
                    {consumerInfo?.phoneNumber}
                  </div>

                  <div>
                    <span className="font-semibold text-gray-800">{'장소 : '}</span>
                    {booking.place.name}
                  </div>

                  <div>
                    <span className="font-semibold text-gray-800">{'전달 내용 : '}</span>
                    {booking.contents || '없음'}
                  </div>

                  {/* 예약 신청 상태에서만 예약 확정 버튼 표시 */}
                  {booking.state === 'requested' && (
                  <div className="mt-4">
                    <button
                      onClick={() => { setModalOpen(true); setMessage('해당 예약을 확정하시겠습니까?'); }}
                      className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    >
                      예약 확정
                    </button>
                  </div>
                  )}

                    {/* 예약 확정 상태에서만 서비스 시작 요청 버튼 */}
                  {booking.state === 'accepted' && (
                  <div className="mt-4">
                    <button
                      onClick={() => { setModalOpen(true); setMessage('서비스 시작 요청을 하시겠습니까?'); }}
                      className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    >
                      서비스 시작 요청
                    </button>
                  </div>
                  )}

                  {/* 모달 */}
                  {isModalOpen && (
                  <CustomAlert
                    message={message}
                    onConfirm={() => {
                      if (message === '해당 예약을 확정하시겠습니까?') {
                        handleOnConfirmed(booking);
                      }
                      if (message === '서비스 시작 요청을 하시겠습니까?') {
                        handleOnStartRequested(booking);
                      }
                    }

                      }
                    onCancel={() => {
                      setModalOpen(false);
                    }}
                  />
                  )}
                </div>
                )}

              </div>
            );
          })
        ) : (
          <div className="text-gray-500 text-center">해당 상태의 예약이 없습니다.</div>
        )}

      </div>

    </section>
  );
}
