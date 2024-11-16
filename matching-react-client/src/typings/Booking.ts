export type Booking = {
    id: number;
    providerId: number; // 제공자 ID
    consumerId: number; // 소비자 ID
    date: Date; // 예약 날짜
    time: string; // 시작 시간
    place: { name: string; lat: number; lng: number } // 목적지
    contents: string; // 예약 내용
    isAccepted: boolean; // 수락 여부
    actualStartTime?: Date ; // 실제 서비스 시작 시간
    actualEndTime?: Date ; // 실제 서비스 종료 시간
    updatedAt: Date; // 마지막 업데이트 시간
    createdAt: Date; // 생성 시간
  };
