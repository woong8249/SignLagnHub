import { useState } from 'react';
import { Notification } from '@typings/Notification';
import { notificationApi } from '@utils/notificationApi';

type NotificationFilter = 'all' | 'notRead' | 'read';

interface NotificationSectionProps {
  notifications: Notification[];
}

export function NotificationSection({
  notifications,
}: NotificationSectionProps) {
  const [filter, setFilter] = useState<NotificationFilter>('notRead');

  function handleUpdateNotification(id: number, newState: 'read') {
    notificationApi.update(id, { state: newState }); // 업데이트 수행
  }

  const filteredNotifications = notifications
    .filter((noti) => {
      if (filter === 'all') return true;
      if (filter === 'notRead') return noti.state === 'notRead';
      if (filter === 'read') return noti.state === 'read';
      return false;
    })
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());

  return (
    <div className="bg-gray-100 w-full rounded-3xl p-4  h-full overflow-y-auto">
      <h2 className="text-xl font-bold text-gray-500 p-4">알림</h2>
      <hr />

      {/* 필터 버튼 */}
      <div className='flex justify-center my-4'>
        <div className="flex justify-start gap-2 my-4">
          {['notRead', 'read', 'all'].map((type) => (
            <button
            key={type}
            onClick={() => setFilter(type as NotificationFilter)}
            className={`px-3 py-2 text-sm rounded-md ${
              filter === type ? 'bg-blue-400 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
              {type === 'notRead' && '미확인'}
              {type === 'read' && '확인'}
              {type === 'all' && '전체'}
            </button>
          ))}
        </div>
      </div>

      {/* 알림 리스트 */}
      <ul className="space-y-3">
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map((noti) => (
            <li
              key={noti.id}
              className={`p-3 border rounded-lg ${
                noti.state === 'notRead' ? 'bg-gray-200' : 'bg-white'
              }`}
            >
              <p className="text-gray-700">{noti.contents}</p>

              <div className='flex justify-between items-center'>
                <small className="text-gray-500">
                  {`알림 시간: ${new Date(
                    noti.createdAt,
                  ).toLocaleTimeString('ko-KR')}`}
                </small>

                {/* 읽음으로 표시 버튼 */}
                {noti.state === 'notRead' && (
                <button
                  className="mt-2 px-4 py-2 bg-blue-500 text-white text-sm rounded hover:bg-blue-600"
                  onClick={() => handleUpdateNotification(noti.id, 'read')}
                >
                  확인
                </button>
                )}

              </div>

            </li>
          ))
        ) : (
          <li className="text-gray-500 text-center">해당 상태의 알림이 없습니다.</li>
        )}
      </ul>
    </div>
  );
}
