/* eslint-disable no-unused-vars */

import {
  GoogleMap, Marker, Polygon, useLoadScript, InfoWindow,
} from '@react-google-maps/api';
import { ConsumerWithAllInfo } from '@typings/User';
import jungGuGeoJsonData from '@public/coordinates/seoul-JungGu-EPSG-4326.json';
import config from '@config/config';
import LoadingSpinner from '@components/LoadingSpinner';
import ErrorPage from '@pages/ErrorPage';
import { markerUrl } from '@constants/marker';
import { Provider } from '@pages/BookingPage';

const jungGuAreaCoordinates = jungGuGeoJsonData.map(([lng, lat]) => ({ lat, lng }));

interface Prob {
  consumer: ConsumerWithAllInfo;
  providers: Provider[];
  onClickProvider: (provider: Provider) => void;
}

export function GoogleMapSection({ consumer, providers, onClickProvider }: Prob) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: config.googleKey,
  });

  if (!isLoaded) {
    return <LoadingSpinner />;
  }

  if (loadError) {
    return <ErrorPage />;
  }

  const { coordinates } = consumer.center;
  const providersCoordinates = providers.map((provider) => provider.currentCoordinates);

  return (
    <div className="absolute inset-0 z-10">
      <GoogleMap
        mapContainerStyle={{ width: '100%', height: '100%' }}
        center={{
          lat: consumer.currentCoordinates[0],
          lng: consumer.currentCoordinates[1] - 0.015,
        }}
        zoom={15}
        options={{
          streetViewControl: false, // Street View (Pegman) 컨트롤 비활성화
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
      </GoogleMap>
    </div>
  );
}
