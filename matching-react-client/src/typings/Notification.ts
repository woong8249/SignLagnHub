type NotificationState ='new' | 'notRead' | 'read'

export type Notification = {
    id: number;
    targetUserId: number; // 사용자 ID
    contents: string; // 알림 내용
    state:NotificationState
    updatedAt: Date; // 마지막 업데이트 시간
    createdAt: Date; // 생성 시간
  };

// type :
