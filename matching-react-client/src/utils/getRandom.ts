export function getRandomKoreanName(): string {
  const firstNames = ['김', '이', '박', '최', '정', '강', '조', '윤', '장', '임'];
  const lastNames = ['민준', '서준', '도윤', '시우', '하준', '지우', '예준', '하윤', '지호', '준우'];
  return firstNames[Math.floor(Math.random() * firstNames.length)] + lastNames[Math.floor(Math.random() * lastNames.length)];
}

export function getRandomPhoneNumber(): string {
  return `010-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}`;
}

export function getRandomCoordinates(baseLat: number, baseLng: number, radiusMeters: number): [number, number] {
  const radiusInDegrees = radiusMeters / 111000;
  const u = Math.random();
  const v = Math.random();
  const w = radiusInDegrees * Math.sqrt(u);
  const t = 2 * Math.PI * v;
  const x = w * Math.cos(t);
  const y = w * Math.sin(t);

  return [baseLat + x, baseLng + y];
}
