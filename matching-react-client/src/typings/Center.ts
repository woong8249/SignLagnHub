export type Center = {
  id: number;
  name: string; // 센터명
  region: string; // 지역
  address: string; // 상세주소
  phoneNumber: string; // 전화번호
  videoCallNumber: string; // 영상통화번호
  coordinates: [number, number]; // 건물좌표[위도,경도]
  images: string[]; // 이미지 URL 배열
  businessHours: {
    day: string;
    open: string | null;
    close: string | null;
    breakTime?: { start: string; end: string } | null
  }[]; // 운영시간 정보
};
