export type Consumer = {
    id:number
    role:'consumer'
    name:string
    address:[string, string]
    profileImage:string
    serviceOn: boolean
}

export type Provider = {
    id: number;
    role: 'interpreter';
    name: string;
    affiliatedCenterId: number; // 소속센터
    profileImage: string;
    currentCoordinates: [string, string]; // 현재좌표
    serviceOn: boolean;
}

export type User = {
    id: number;
    role: 'consumer' | 'provider'; // 역할
    name: string; // 사용자 이름
    phoneNumber: string; // 전화번호
    gender: 'M' | 'F'; // 성별
    birthDate: Date; // 변경된 프로퍼티명
    address: string; // 주소
    profileImage: string; // 프로필 이미지
    serviceOn: boolean; // 서비스 활성화 여부 (provider만 해당)
    centerId: number; // 소속 센터 ID (provider만 해당)
    currentCoordinates: [number, number] // 현재좌표 [위도,경도]
  };
