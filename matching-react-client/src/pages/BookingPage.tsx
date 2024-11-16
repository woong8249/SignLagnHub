/* eslint-disable no-param-reassign */
import { useConsumer } from '@hooks/useConsumer';
import SideNavBar from '@layouts/common/SideNavBar';
import ErrorPage from './ErrorPage';
import { ConsumerWithAllInfo, ProviderWithAllInfo } from '@typings/User';
import { GoogleMapSection } from '@sections/GoogleMapSection';
import { userApi } from '@utils/userApi';
import { useImmer } from 'use-immer';
import { CenterSection } from '@sections/CenterSection';
import { BookingSection } from '@sections/\bBookingSection';

export type Provider =Omit<ProviderWithAllInfo, 'center'> &
{
  selected: boolean
  showBookingForm: boolean; // 예약 폼 표시 상태
}
export function BookingPage() {
  const { consumer, error } = useConsumer();
  const fetchedConsumer = consumer as ConsumerWithAllInfo;
  const { center } = fetchedConsumer;
  const initProviders = userApi.getProvidersWithAllInfoByCenterId(center.id).map((item) => ({ ...item, selected: false, showBookingForm: false }));
  const [providers, setProviders] = useImmer<Provider[]>(initProviders);

  function handleProvideSelection(provider:Provider) {
    setProviders((draft) => {
      draft.forEach((draftProvider) => {
        draftProvider.selected = draftProvider.id === provider.id;
        draftProvider.showBookingForm = draftProvider.id === provider.id ? !draftProvider.showBookingForm : false;
      });
    });
  }

  if (error) {
    return <ErrorPage></ErrorPage>;
  }

  return (
    <div className="absolute inset-0 bg-[url('background.webp')] bg-cover bg-center z-0">
      <GoogleMapSection
        consumer={fetchedConsumer}
        providers={providers}
        onClickProvider={handleProvideSelection}
      />

      <div className="relative z-[10] flex w-[55%] min-w-[850px] h-screen max-h-screen">
        <SideNavBar />

        <div className="relative flex gap-4 p-6 pl-[100px] w-full">
          <CenterSection center={center} />
          <BookingSection providers={providers} handleProvideSelection={handleProvideSelection} />
        </div>
      </div>

    </div>
  );
}
