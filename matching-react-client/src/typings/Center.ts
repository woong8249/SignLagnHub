export type Center = {
  id: number;
  name: string; // 센터명
  region: string; // 지역
  address: string; // 상세주소
  phoneNumber: string; // 전화번호
  videoCallNumber: string; // 영상통화번호
  coordinates: [number, number] // 건물좌표[위도,경도]
};
