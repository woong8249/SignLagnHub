import { FakeApi } from '@utils/fakeApi';
import { Notification } from '@typings/Notification';

export class NotificationApi extends FakeApi<Notification> {
  constructor() {
    super('notifications');
  }

  // 특정 사용자의 모든 알림 반환
  getAllNotificationByUserID(userId: number): Notification[] {
    const notifications = this.getAll();
    return notifications.filter((notification) => notification.targetUserId === userId);
  }
}

export const notificationApi = new NotificationApi();
