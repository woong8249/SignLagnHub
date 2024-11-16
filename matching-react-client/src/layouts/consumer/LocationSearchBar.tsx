/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-unused-vars */
import { useState, useEffect, useCallback } from 'react';
import debounce from 'lodash/debounce'; // lodash의 debounce 함수 import

interface Prob {
  onSelectLocation: (location: { name: string; lat: number; lng: number }) => void;
}

export function PlaceSearchBar({ onSelectLocation }: Prob) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<{ name: string; placeId: string }[]>([]);
  const [autocompleteService, setAutocompleteService] = useState<google.maps.places.AutocompleteService | null>(null);

  useEffect(() => {
    // AutocompleteService 초기화
    if (!autocompleteService && window.google) {
      setAutocompleteService(new google.maps.places.AutocompleteService());
    }
  }, [autocompleteService]);

  const fetchSuggestions = useCallback(
    debounce((input: string) => {
      if (autocompleteService && input) {
        autocompleteService.getPlacePredictions(
          {
            input,
            componentRestrictions: { country: 'kr' }, // 한국 내 결과 제한
            language: 'ko',
          },
          (predictions, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK && predictions) {
              const places = predictions.map((place) => ({
                name: place.description,
                placeId: place.place_id,
              }));
              setSuggestions(places);
            } else {
              setSuggestions([]);
            }
          },
        );
      } else {
        setSuggestions([]);
      }
    }, 100), // 300ms 디바운스
    [autocompleteService],
  );

  const handleSearch = (input: string) => {
    fetchSuggestions(input);
  };

  const handleSelect = (placeId: string, name: string) => {
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ placeId }, (results, status) => {
      if (status === google.maps.GeocoderStatus.OK && results && results[0]) {
        const { location } = results[0].geometry;
        onSelectLocation({
          name,
          lat: location.lat(),
          lng: location.lng(),
        });
        setQuery(name);
        setSuggestions([]);
      }
    });
  };

  return (
    <div className="relative">
      <input
        type="text"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          handleSearch(e.target.value); // 검색어 변경 시 호출
        }}
        placeholder="정확한 주소를 입력하세요"
        className="w-full p-2 border rounded-lg"
      />

      {suggestions.length > 0 && (
        <div className="absolute bg-white border rounded-lg shadow-lg mt-2 w-full z-10">
          {suggestions.map((location, index) => (
            <div
              key={index}
              role="button"
              tabIndex={0}
              onClick={() => handleSelect(location.placeId, location.name)}
              className="p-2 hover:bg-gray-100 cursor-pointer"
            >
              {location.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
