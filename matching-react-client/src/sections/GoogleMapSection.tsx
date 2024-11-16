/* eslint-disable no-unused-vars */

import {
  GoogleMap, Marker, Polygon, InfoWindow,
} from '@react-google-maps/api';
import { ConsumerWithAllInfo } from '@typings/User';
import jungGuGeoJsonData from '@public/coordinates/seoul-JungGu-EPSG-4326.json';
import { markerUrl } from '@constants/marker';
import { Provider } from '@pages/BookingPage';

const jungGuAreaCoordinates = jungGuGeoJsonData.map(([lng, lat]) => ({ lat, lng }));

interface Prob {
  consumer: ConsumerWithAllInfo;
  providers: Provider[];
  onClickProvider: (provider: Provider) => void;
  selectedPlace: { lat: number; lng: number } | null; // Prop 추가
}

export function GoogleMapSection({
  consumer, providers, onClickProvider, selectedPlace,
}: Prob) {
  const { coordinates } = consumer.center;
  const providersCoordinates = providers.map((provider) => provider.currentCoordinates);

  return (
    <div className="absolute inset-0 z-10">
      <GoogleMap
        mapContainerStyle={{ width: '100%', height: '100%' }}
        center={{
          lat: consumer.currentCoordinates[0],
          lng: consumer.currentCoordinates[1] - 0.02,
        }}
        zoom={14}
        options={{
          streetViewControl: false, // Street View (Pegman) 컨트롤 비활성화
          minZoom: 14, // 최소 줌 레벨
          maxZoom: 20, // 최대 줌 레벨
          restriction: {
            latLngBounds: {
              north: consumer.currentCoordinates[0] + 0.1, // 북쪽 경계
              south: consumer.currentCoordinates[0] - 0.1, // 남쪽 경계
              east: consumer.currentCoordinates[1] + 0.1, // 동쪽 경계
              west: consumer.currentCoordinates[1] - 0.1, // 서쪽 경계
            },
          },
        }}

      >
        <Polygon
          paths={jungGuAreaCoordinates}
          options={{
            fillOpacity: 0.05,
            strokeColor: '#4285F4',
            strokeOpacity: 0.8,
            strokeWeight: 5,
          }}
        />

        {/* Center Marker */}
        <Marker
          position={{ lat: consumer.currentCoordinates[0], lng: consumer.currentCoordinates[1] }}
        />

        {/* Center Marker */}
        <Marker
          position={{ lat: coordinates[0], lng: coordinates[1] }}
          icon={{
            url: markerUrl.center,
            scaledSize: new window.google.maps.Size(50, 60),
          }}
        />

        {/* Providers Markers */}
        {providersCoordinates.map((coord, index) => (
          <Marker
            key={index}
            position={{ lat: coord[0], lng: coord[1] }}
            icon={{
              url: 'personMarker.png',
              scaledSize: new window.google.maps.Size(50, 60),
            }}
            onClick={() => onClickProvider(providers[index])} // 클릭 시 상태 업데이트 및 이동
          >
            {providers[index].selected && (
              <InfoWindow
              position={{ lat: coord[0], lng: coord[1] }}
              onCloseClick={() => onClickProvider({ ...providers[index], selected: false })}
              >
                <div className='text-sm font-bold'>
                  {`${providers[index].name} 통역사님`}
                </div>
              </InfoWindow>
            )}
          </Marker>
        ))}

        {/* Selected Place Marker */}
        {selectedPlace && (
          <Marker
            position={selectedPlace}
            icon={{
              url: 'greenFlagMarker.png',
              scaledSize: new window.google.maps.Size(50, 60),
            }}
          />
        )}
      </GoogleMap>
    </div>
  );
}
