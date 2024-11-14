import { FakeApi } from '@utils/fakeApi';
import { ConsumerWithAllInfo, ProviderWithAllInfo, User } from '@typings/User';
import { Center } from '@typings/Center';
import { Booking } from '@typings/Booking';
import { Notification } from '@typings/Notification';
import { WorkSchedule } from '@typings/WorkSchedule';
import { centerApi } from '@utils/centerApi';
import { bookingApi } from '@utils/bookingApi';
import { notificationApi } from './notificationApi';
import { workScheduleApi } from './workScheduleApi';

export class UserApi extends FakeApi<User> {
  constructor() {
    super('users'); // 로컬 스토리지 키 설정
  }

  /**
   * 특정 사용자의 모든 관련 정보를 반환
   */
  async getUserWithAllInfo(id: number): Promise<ProviderWithAllInfo|ConsumerWithAllInfo> {
    const user = await this.getById(id);
    if (!user) throw new Error(`User with id ${id} not found`);

    const center = await centerApi.getById(user.centerId) as Center;
    const bookings = (await bookingApi.getAll()).filter(
      (booking) => booking.providerId === id || booking.consumerId === id,
    );
    const notifications: Notification[] = (await notificationApi.getAll()).filter(
      (notification) => notification.userId === id,
    );

    if (user.role === 'provider') {
      const workSchedules = (await workScheduleApi.getAll()).filter(
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

  /**
   * 특정 센터에 소속된 모든 제공자(Provider)의 정보를 반환
   */
  async getProvidersWithAllInfoByCenterId(centerId: number): Promise<
    (User & {
      workSchedules: WorkSchedule[];
      bookings: Booking[];
    })[]
  > {
    const users = (await this.getAll()).filter(
      (user) => user.centerId === centerId && user.role === 'provider',
    );

    const workSchedules = await workScheduleApi.getAll();
    const bookings = await bookingApi.getAll();

    return users.map((provider) => {
      const providerSchedules = workSchedules.filter(
        (schedule) => schedule.providerId === provider.id,
      );
      const providerBookings = bookings.filter(
        (booking) => booking.providerId === provider.id,
      );

      return { ...provider, workSchedules: providerSchedules, bookings: providerBookings };
    });
  }
}

export const userApi = new UserApi();
