/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { IoCalendarOutline } from 'react-icons/io5';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { BsBuildingCheck } from 'react-icons/bs';
import { ConsumerWithAllInfo } from '@typings/User';
import { useModal } from '@hooks/useModal';
import { CenterSection } from '@sections/CenterSection';
import { userApi } from '@utils/userApi';
import { useState } from 'react';
import { IoChevronDown, IoChevronForward } from 'react-icons/io5';

interface Prob {
  consumer: ConsumerWithAllInfo;
}

export default function ButtonGrid({ consumer }: Prob) {
  const { isModalOpen, setIsModalOpen, modalRef } = useModal();
  const { isModalOpen: isModalOpen2, setIsModalOpen: setIsModalOpen2, modalRef: modalRef2 } = useModal();
  const { center, bookings } = consumer;
  const [expandedBooking, setExpandedBooking] = useState<number | null>(null); // 현재 확장된 예약의 인덱스

  return (
    <div className="relative w-full flex flex-wrap gap-3 justify-center text-gray-500 font-semibold">
      {/* 소속기관 확인하기 버튼 */}
      <div
        className={`
          flex flex-col justify-center items-center
          w-[170px] h-[170px] rounded-lg
          bg-gray-300 shadow-[0_10px_25px_rgba(0,0,0,0.3)] drop-shadow-2xl
          transition-transform transform hover:scale-105 hover:shadow-2xl hover:bg-gray-400`}
        role="button"
        tabIndex={0}
        onClick={(e) => {
          e.stopPropagation();
          setIsModalOpen(true);
        }}
      >
        <BsBuildingCheck className="w-10 h-10 mb-2 text-gray-700 hover:text-blue-500" />
        소속센터 확인하기
      </div>

      {/* 소속기관 모달 */}
      {isModalOpen && (
        <div
          ref={modalRef}
          className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
          onClick={() => setIsModalOpen(false)} // 모달 외부 클릭 시 닫기
        >
          <div className="bg-white w-[90vw] max-w-lg p-2 rounded-lg shadow-lg">
            <CenterSection center={center} />
          </div>
        </div>
      )}

      {/* 통역사 예약하기 버튼 */}
      <Link to={'/booking'}>
        <div
          className={`
          flex flex-col justify-center items-center
           w-[170px] h-[170px] rounded-lg
          bg-white shadow-[0_10px_25px_rgba(0,0,0,0.3)] drop-shadow-2xl
          transition-transform transform hover:scale-105 hover:shadow-2xl hover:bg-blue-100`}
          role="button"
          tabIndex={0}
        >
          <IoCalendarOutline className="w-10 h-10 mb-2 text-gray-700 hover:text-blue-500" />
          통역사 예약하기
        </div>
      </Link>

      {/* 예약 확인하기 버튼 */}
      <div
        className={`
          flex flex-col justify-center items-center
          w-[170px] h-[170px] rounded-lg
          bg-[#AABBCC] shadow-[0_10px_25px_rgba(0,0,0,0.3)] drop-shadow-2xl
          transition-transform transform hover:scale-105 hover:shadow-2xl hover:bg-blue-200`}
        role="button"
        tabIndex={0}
        onClick={(e) => {
          e.stopPropagation();
          setIsModalOpen2(true);
        }}
      >
        <AiOutlineCheckCircle className="w-10 h-10 mb-2 text-gray-700 hover:text-blue-500" />
        예약 확인하기
      </div>

      {/* 예약 목록 모달 */}
      {isModalOpen2 && (
      <div
        ref={modalRef2}
        className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
      >
        <div className="bg-white w-[90vw] max-w-lg p-6 rounded-lg shadow-lg">
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-gray-800">예약 목록</h2>

            {bookings.length > 0 ? (
              bookings.map((booking, index) => {
                const providerInfo = userApi.getById(booking.providerId); // 통역사 정보 가져오기
                const stateMessages = {
                  requested: '예약 요청중',
                  canceled: '예약 취소',
                  accepted: '예약 완료',
                  service_start_requested: '서비스 시작 요청중',
                  service_start: '서비스중',
                  service_end_requested: '서비스 종료 요청중',
                  service_end: '서비스 종료',
                };

                return (
                  <div key={index} className="p-4 border rounded-lg shadow-md bg-white">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-4">
                        {providerInfo?.profileImage && (
                          <img
                            src={providerInfo.profileImage}
                            alt={`${providerInfo.name} 프로필`}
                            className="w-12 h-12 rounded-full"
                          />
                        )}

                        <div className="text-lg font-semibold text-gray-700">{`통역사: ${providerInfo?.name || '정보 없음'}`}</div>
                      </div>

                      <div className="text-sm text-blue-400">{stateMessages[booking.state]}</div>
                    </div>

                    <div className="border-t border-gray-300 mt-3 pt-3">
                      <div className="flex items-center justify-between">
                        <div className="font-semibold text-gray-700">
                          {`예약 날짜: ${new Date(booking.date).toLocaleDateString('ko-KR')}`}
                        </div>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setExpandedBooking((prev) => (prev === index ? null : index));
                          }}
                          className="text-gray-500 focus:outline-none"
                        >
                          {expandedBooking === index ? (
                            <IoChevronDown className="w-5 h-5" />
                          ) : (
                            <IoChevronForward className="w-5 h-5" />
                          )}
                        </button>
                      </div>

                      {expandedBooking === index && (
                        <div className="mt-2 text-sm space-y-1">
                          <div className="text-gray-600">{`시간: ${booking.time}`}</div>
                          <div className="text-gray-600">{`목적지: ${booking.place.name}`}</div>
                          <div className="text-gray-600">{`전달 내용: ${booking.contents || '없음'}`}</div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-gray-500 text-center">예약된 내역이 없습니다.</div>
            )}
          </div>
        </div>
      </div>
      )}
    </div>
  );
}
