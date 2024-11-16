export type Booking = {
    id: number;
    providerId: number; // 제공자 ID
    consumerId: number; // 소비자 ID
    date: string; // 예약 날짜
    startTime: Date; // 시작 시간
    endTime: Date; // 종료 시간
    destination: string; // 목적지
    contents: string; // 예약 내용
    isAccepted: boolean; // 수락 여부
    actualStartTime: string; // 실제 서비스 시작 시간
    actualEndTime: string; // 실제 서비스 종료 시간
    updatedAt: string; // 마지막 업데이트 시간
    createdAt: string; // 생성 시간
  };
