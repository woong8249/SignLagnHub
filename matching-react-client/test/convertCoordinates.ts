// https://www.geoservice.co.kr/ => 좌표 아카이브
// http://www.gisdeveloper.co.kr/?p=2332 => geoservice 사용방법 youtube
// https://mapshaper.org/  .shp =>GeoJson (EPSG:5179)
// EPSG:5179 → EPSG:4326

import proj4 from 'proj4';
// EPSG:5179 (UTM-K) 좌표계 정의
proj4.defs('EPSG:5179', '+proj=tmerc +lat_0=38 +lon_0=127.5 +k=0.9996 +x_0=1000000 +y_0=2000000 +ellps=GRS80 +units=m +no_defs');

// EPSG:4326 (WGS84) 좌표계는 proj4에 기본적으로 정의되어 있음
const epsg5179ToEpsg4326 = proj4('EPSG:5179', 'EPSG:4326');

// 변환할 좌표
const utmKCoordinates = [957882.0078837019, 1952529.9125135408]; // [x, y]

// 좌표 변환
const wgs84Coordinates = epsg5179ToEpsg4326.forward(utmKCoordinates);

console.log(`위도: ${wgs84Coordinates[1]}, 경도: ${wgs84Coordinates[0]}`); // [lat, lng]
