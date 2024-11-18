/* eslint-disable no-param-reassign */
import SideNavBar from '@layouts/consumer/SideNavBar';
import { ProviderWithAllInfo } from '@typings/User';
import { GoogleMapSection } from '@sections/consumer/GoogleMapSection';
import { userApi } from '@utils/userApi';
import { useImmer } from 'use-immer';
import { CenterSection } from '@sections/common/CenterSection';
import { ProvidersSection } from '@sections/consumer/ProvidersSection';
import { useState } from 'react';

export type Provider =Omit<ProviderWithAllInfo, 'center'> &
{
  selected: boolean
  showBookingForm: boolean; // 예약 폼 표시 상태
}
export function BookingPage() {
  const consumer = userApi.getUserWithAllInfo(1);
  const { center } = consumer;
  const initProviders = userApi.getProvidersWithAllInfoByCenterId(center.id).map((item) => ({ ...item, selected: false, showBookingForm: false }));
  const [providers, setProviders] = useImmer<Provider[]>(initProviders);
  const [selectedPlace, setSelectedPlace] = useState<{ lat: number; lng: number } | null>(null);

  function handleProvideSelection(provider:Provider) {
    setProviders((draft) => {
      draft.forEach((draftProvider) => {
        draftProvider.selected = draftProvider.id === provider.id;
        draftProvider.showBookingForm = draftProvider.id === provider.id ? !draftProvider.showBookingForm : false;
      });
    });
  }

  return (
    <div className="absolute inset-0 bg-[url('background.webp')] bg-cover bg-center z-0">
      <GoogleMapSection
        consumer={consumer}
        providers={providers}
        onClickProvider={handleProvideSelection}
        selectedPlace={selectedPlace} // 전달
      />

      <div className="relative z-[10] flex w-[55%] min-w-[850px] h-screen max-h-screen">
        <SideNavBar />

        <div className="relative flex gap-4 p-6 pl-[100px] w-full">
          <CenterSection center={center} />

          <ProvidersSection
            consumer={consumer}
            providers={providers}
            handleProvideSelection={handleProvideSelection}
            onPlaceSelect={setSelectedPlace} // 전달받을 함수 prop 추가
           />
        </div>
      </div>

    </div>
  );
}
