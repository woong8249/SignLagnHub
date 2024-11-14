import { FakeApi } from '@utils/fakeApi';
import { Notification } from '@typings/Notification';

export class NotificationApi extends FakeApi<Notification> {
  constructor() {
    super('notifications');
  }

  // 특정 사용자의 모든 알림 반환
  async getAllNotificationByUserID(userId: number): Promise<Notification[]> {
    const notifications = await this.getAll();
    return notifications.filter((notification) => notification.userId === userId);
  }
}

export const notificationApi = new NotificationApi();
