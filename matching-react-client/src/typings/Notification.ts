export type Notification = {
    id: number;
    userId: number; // 사용자 ID
    contents: string; // 알림 내용
    notificationStatus: boolean // 알림여부
    isRead: boolean; // 읽음 여부
    updatedAt: Date; // 마지막 업데이트 시간
    createdAt: Date; // 생성 시간
  };
