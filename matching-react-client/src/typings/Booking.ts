export type BookingState =
'requested' // 예약 신청
| 'accepted' // 예약 수락
| 'canceled' // 예약 취소
| 'service_start_requested' // 서비스 시작 요청
| 'service_start' // 서비스 시작 요청 수락 => 서비스 시작
| 'service_end_requested' // 서비스 종료 요청
| 'service_end' // 서비스 종료 요청 수락 => 서비스 종료

export type Booking = {
    id: number;
    providerId: number; // 제공자 ID
    consumerId: number; // 소비자 ID
    date: Date; // 예약 날짜
    time: string; // 예약 시간
    place: { name: string; lat: number; lng: number } // 장소
    contents: string; // 예약 내용
    updatedAt: Date; // 마지막 업데이트 시간
    createdAt: Date; // 생성 시간
    state: BookingState // 0. state === requested
    requestAcceptedAt?: Date; // 1. state === accepted
    serviceStartRequestedAt?: Date; // 2. state === service_start_requested
    serviceStartAcceptedAt?: Date; // 3. state === service_start
    serviceEndRequestedAt?: Date; // 4. state ===service_end_requested
    serviceEndAcceptedAt?: Date; // 5. state === service_end
    serviceCanceledAt?: Date; // 6. state === canceled
  };
