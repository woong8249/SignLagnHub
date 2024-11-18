import { FakeApi } from '@utils/fakeApi';
import { ConsumerWithAllInfo, ProviderWithAllInfo, User } from '@typings/User';
import { Center } from '@typings/Center';
import { Notification } from '@typings/Notification';
import { centerApi } from '@utils/centerApi';
import { bookingApi } from '@utils/bookingApi';
import { notificationApi } from './notificationApi';
import { workScheduleApi } from './workScheduleApi';

export class UserApi extends FakeApi<User> {
  constructor() {
    super('users'); // 로컬 스토리지 키 설정
  }

  // 특정 사용자의 모든 관련 정보를 반환
  getUserWithAllInfo(id: number): ProviderWithAllInfo|ConsumerWithAllInfo {
    const user = this.getById(id);
    if (!user) throw new Error(`User with id ${id} not found`);

    const center = centerApi.getById(user.centerId) as Center;
    const bookings = (bookingApi.getAll()).filter(
      (booking) => booking.providerId === id || booking.consumerId === id,
    );
    const notifications: Notification[] = (notificationApi.getAll()).filter(
      (notification) => notification.targetUserId === id,
    );

    if (user.role === 'provider') {
      const workSchedules = (workScheduleApi.getAll()).filter(
        (schedule) => schedule.providerId === id,
      );
      return {
        ...user,
        center,
        bookings,
        notifications,
        workSchedules,
      } as ProviderWithAllInfo;
    }
    return {
      ...user,
      center,
      bookings,
      notifications,
    } as ConsumerWithAllInfo;
  }

  // 특정 센터에 소속된 모든 제공자(Provider)의 정보를 반환
  getProvidersWithAllInfoByCenterId(centerId: number) :Omit<ProviderWithAllInfo, 'center'>[] {
    const users = (this.getAll()).filter(
      (user) => user.centerId === centerId && user.role === 'provider',
    );

    const workSchedules = workScheduleApi.getAll();
    const bookings = bookingApi.getAll();

    return users.map((provider) => {
      const providerSchedules = workSchedules.filter(
        (schedule) => schedule.providerId === provider.id,
      );
      const providerBookings = bookings.filter(
        (booking) => booking.providerId === provider.id,
      );
      return { ...provider, workSchedules: providerSchedules, bookings: providerBookings } as Omit<ProviderWithAllInfo, 'center'>;
    });
  }
}

export const userApi = new UserApi();
