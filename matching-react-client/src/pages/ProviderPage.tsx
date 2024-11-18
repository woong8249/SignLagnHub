import TopNavBar from '@layouts/common/TopNavBar';

import { useEffect } from 'react';
import { userApi } from '@utils/userApi';
import { CenterSection } from '@sections/common/CenterSection';
import { BookingListSection } from '@sections/provider/BookingListSection';
import { useModal } from '@hooks/useModal';
import { NotificationSection } from '@sections/common/NotificationSection';

import { useImmer } from 'use-immer';
import { notificationApi } from '@utils/notificationApi';
import { UserWelcomeSection } from '@sections/common/UserWelcomeSection';
import { ProviderWithAllInfo } from '@typings/User';
import { WorkScheduleSection } from '@sections/provider/WorkScheduleSection';

export function ProviderPage() {
  const { setIsModalOpen, modalRef } = useModal();
  const {
    isModalOpen: isModalOpen2,
    setIsModalOpen: setIsModalOpen2,
    modalRef: modalRef2,
  } = useModal();
  const [provider, setProvider] = useImmer<ProviderWithAllInfo>(userApi.getUserWithAllInfo(2) as ProviderWithAllInfo);
  const {
    center,
    bookings,
    notifications,
    workSchedules,
  } = provider;

  const newNotifications = notifications.filter((item) => item.state === 'new');

  useEffect(() => {
    // notification, Booking list 를 위한 폴링
    const interval = setInterval(() => {
      const newProviderInfo = userApi.getUserWithAllInfo(2) as ProviderWithAllInfo;
      setProvider(newProviderInfo);
    }, 1000);

    return () => clearInterval(interval); // 컴포넌트 언마운트 시 정리
  }, []);

  return (
    <div className="relative bg-[url('background.webp')] bg-cover bg-center min-h-screen m-auto">
      {/* Dark overlay over background */}
      <div className="absolute inset-0 bg-black opacity-50 z-0" />
      <TopNavBar />

      <div
        className={
          `relative z-5  w-[95%] h-[100%] flex flex-col gap-10 m-auto
           sm:w-[80%]
           xl:flex-row xl:w-[90%] xl:justify-center  py-[6rem]` }>

        <section className='xl:w-[30%] h-full' >
          {/* 개인정보 */}
          <UserWelcomeSection user={provider} />

          {/* 소속 센터 */}
          <div className="mt-4 mb-2  ">
            <button
            className="w-full px-6 py-4 bg-gray-400 text-white text-xl font-bold rounded-lg shadow-md hover:bg-gray-600 focus:outline-none"
            onClick={(e) => { e.stopPropagation(); setIsModalOpen2(true); }}
            >
              소속센터
            </button>
          </div>

          {/* 근무관리 */}
          <div className="my-4 mb-10 ">
            <button className="w-full px-6 py-4 bg-gray-400 text-white text-xl font-bold rounded-lg shadow-md hover:bg-gray-600 focus:outline-none">
              근무관리
            </button>
          </div>

          {/* 알림 */}
          <NotificationSection notifications={notifications} />
        </section>

        {/* 근무일정 */}
        <WorkScheduleSection workSchedules={workSchedules} />
        {/* 예약 목록 */}
        <BookingListSection bookings={bookings} />

        {/* 알림 모달 */}
        {newNotifications.length > 0 && (
        <div
          ref={modalRef}
          className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
        >
          <div className="bg-white w-[90vw] max-w-md p-4 rounded-lg shadow-lg relative">
            <h2 className="text-xl font-bold text-gray-800 mb-4">새로운 알림</h2>

            <ul className="space-y-3">
              {newNotifications.map((noti, index) => (
                <li key={index} className="p-3 border rounded-lg bg-gray-100">
                  <p className="text-gray-700">{noti.contents}</p>
                  <small className="text-gray-500">{`알림 시간: ${new Date(noti.createdAt).toLocaleTimeString('ko-KR')}`}</small>
                </li>
              ))}
            </ul>

            <button
              className="mt-4 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
              onClick={(e) => {
                e.stopPropagation();
                newNotifications.forEach((noti) => notificationApi.update(noti.id, { state: 'notRead' }));
                setIsModalOpen(false);
              }}
            >
              확인
            </button>
          </div>
        </div>
        )}

        {isModalOpen2 && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
          role='button'
          tabIndex={0}
          >
          <div
          ref={modalRef2}
           className=" w-[350px] rounded-lg shadow-lg relative overflow-y-auto">
            <CenterSection center={center} />
          </div>

        </div>
        )}
      </div>
    </div>
  );
}
