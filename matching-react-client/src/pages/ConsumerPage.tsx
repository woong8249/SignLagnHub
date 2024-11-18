import TopNavBar from '@layouts/common/TopNavBar';
import ButtonGrid from '@layouts/consumer/ButtonGrid';
import { useEffect, useState } from 'react';
import { userApi } from '@utils/userApi';
import { Notification } from '@typings/Notification';
import { useImmer } from 'use-immer';
import { useModal } from '@hooks/useModal';
import { notificationApi } from '@utils/notificationApi';

export default function ConsumerPage() {
  const [consumer, setConsumer] = useState(userApi.getUserWithAllInfo(1));
  const { isModalOpen, setIsModalOpen, modalRef } = useModal();
  const [newNotifications, setNewNotifications] = useImmer<Notification[]>([]);

  const { profileImage, name } = consumer;

  useEffect(() => {
    window.history.replaceState(null, '', '/');
  }, []);

  useEffect(() => {
    // notification 폴링
    const interval = setInterval(() => {
      const newConsumerInfo = userApi.getUserWithAllInfo(1);
      const { notifications } = newConsumerInfo;

      const newNotis = notifications.filter((item) => !item.notificationStatus); // 알림이 한 번도 표시되지 않은 것
      if (newNotis.length > 0) {
        setNewNotifications(newNotis);
        setIsModalOpen(true);
        newNotis.forEach((noti) => {
          notificationApi.update(noti.id, {
            ...noti, notificationStatus: true,
          });
        });
      }
      setConsumer(newConsumerInfo);
    }, 1000);

    return () => clearInterval(interval); // 컴포넌트 언마운트 시 정리
  }, []);

  return (
    <div className="relative bg-[url('background.webp')] bg-cover bg-center min-h-screen m-auto">
      {/* Dark overlay over background */}
      <div className="absolute inset-0 bg-black opacity-50 z-0" />
      <TopNavBar />

      <section
        className={`
          sm:flex sm:flex-col sm:justify-center 
          relative z-5 pt-[6rem] w-[90vw] h-[90vh] px-10 m-auto
          text-white`}>
        <h1 className='responsive-h1 font-bold mb-2'>SignLangHub 통역사 예약 서비스</h1>

        <div className='xl:flex xl:items-center xl:justify-center'>
          <div className='w-full my-[2rem]' >
            <div className='text-gray-300 mb-2'>
              <img src={profileImage} alt="profile" className='w-[100px]  border rounded-xl mb-2 ' />
              <span className="text-2xl">{name}</span>
              <span>{' 님'}</span>
            </div>

            <div>반갑습니다. 오늘도 즐거운 하루 되세요.</div>
          </div>

          <ButtonGrid consumer={consumer} />
        </div>
      </section>

      {/* 알림 모달 */}
      {newNotifications.length > 0 && isModalOpen && (
        <div
          ref={modalRef}
          className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
        >
          <div
            className="bg-white w-[90vw] max-w-md p-4 rounded-lg shadow-lg relative"

          >
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
              onClick={() => {
                setIsModalOpen(false);
                setNewNotifications([]); // 알림 리스트 초기화
              }}
            >
              확인
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
