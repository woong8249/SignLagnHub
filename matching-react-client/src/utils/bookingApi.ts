// src/utils/bookingApi.ts
import { FakeApi } from '@utils/fakeApi';
import { Booking } from '@typings/Booking';

export class BookingApi extends FakeApi<Booking> {
  constructor() {
    super('bookings');
  }
}

export const bookingApi = new BookingApi();
