import {
  GoogleMap, Marker, Polygon, useLoadScript,
} from '@react-google-maps/api';
import { ConsumerWithAllInfo } from '@typings/User';
import jungGuGeoJsonData from '../../public/coordinates/seoul-JungGu-EPSG-4326.json';
import { userApi } from '@utils/userApi';
import config from '@config/config';
import LoadingSpinner from '@components/LoadingSpinner';
import ErrorPage from '@pages/ErrorPage';

const jungGuAreaCoordinates = jungGuGeoJsonData.map(([lng, lat]) => ({ lat, lng }));

interface Prob {
    consumer : ConsumerWithAllInfo
}

export function GoogleMapSection({ consumer }:Prob) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: config.googleKey, // 여기에 실제 API 키를 넣어야 함
  });
  if (!isLoaded) {
    return <LoadingSpinner />;
  }

  if (loadError) {
    return <ErrorPage></ErrorPage>;
  }
  const { coordinates } = consumer.center;
  const providers = userApi.getProvidersWithAllInfoByCenterId(consumer.center.id);
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
      >

        <Polygon
          paths={jungGuAreaCoordinates}
          options={{
            // fillColor: '#4285F4',
            fillOpacity: 0,
            strokeColor: '#4285F4',
            strokeOpacity: 0.8,
            strokeWeight: 5,
          }} />

        {/* Center Marker , Red */}
        <Marker position={{ lat: coordinates[0], lng: coordinates[1] }} />

        {/* Consumer Marker ,Yellow */}
        <Marker
          position={{
            lat: consumer.currentCoordinates[0],
            lng: consumer.currentCoordinates[1],
          }}
          icon={{
            url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="#FFD700" stroke="none">
            <path d="M12 2C8.134 2 5 5.134 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.866-3.134-7-7-7zm0 9.5c-1.381 0-2.5-1.119-2.5-2.5S10.619 6.5 12 6.5s2.5 1.119 2.5 2.5-1.119 2.5-2.5 2.5z"></path>
          </svg>
          `)}`,
            scaledSize: new window.google.maps.Size(50, 50), // 크기 설정
          }}
        />

        {/* Providers Markers */}
        {providersCoordinates.map((coord, index) => (
          <Marker
          key={index}
          position={{ lat: coord[0], lng: coord[1] }}
          icon={{
            url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="#4285F4" stroke="none">
                <path d="M12 2C8.134 2 5 5.134 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.866-3.134-7-7-7zm0 9.5c-1.381 0-2.5-1.119-2.5-2.5S10.619 6.5 12 6.5s2.5 1.119 2.5 2.5-1.119 2.5-2.5 2.5z"></path>
                </svg>
            `)}`,
            scaledSize: new window.google.maps.Size(40, 40), // 크기 조정
          }}
          />
        ))}
      </GoogleMap>
    </div>
  );
}
