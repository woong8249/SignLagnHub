/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-param-reassign */
import { useConsumer } from '@hooks/useConsumer';
import SideNavBar from '@layouts/common/SideNavBar';
import ErrorPage from './ErrorPage';
import { ConsumerWithAllInfo, ProviderWithAllInfo } from '@typings/User';
import { GoogleMapSection } from '@sections/GoogleMapSection';
import { userApi } from '@utils/userApi';
import { useImmer } from 'use-immer';
import { DateAndTimePicker } from '@layouts/consumer/DateAndTimePicker';
import { IoCalendarOutline } from 'react-icons/io5';
import { CenterSection } from '@sections/CenterSection';

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

      {/* 메인 레이아웃 */}
      <div className="relative z-[10] flex w-[55%] min-w-[850px] h-screen max-h-screen">
        <SideNavBar />

        <div className="relative flex gap-4 p-6 pl-[100px] w-full">
          <CenterSection center={center} />

          <section className=" flex-1 bg-gray-100 overflow-y-auto  shadow-lg rounded">
            <h2 className="text-2xl font-semibold p-4 "> 예약</h2>

            {providers.map((provider, index) => (
              <div key={index} >
                <div
                className={`flex items-center gap-12  border rounded-lg m-4 hover:bg-gray-200  bg-white ${provider.selected ? 'border-blue-400 border-2' : 'border-gray-300'}`}
                role='button'
                tabIndex={0}
                onClick={(e) => {
                  e.stopPropagation();
                  handleProvideSelection(provider);
                }}
                >
                  <img src={provider.profileImage} alt='profile' className='w-[80px]' />

                  <div className='flex gap-2 items-center'>
                    <span className='text-base '>{provider.name}</span>
                    <span className='text-sm text-gray-500'>통역사님</span>
                  </div>
                </div>

                {provider.showBookingForm && (
                <div className="p-4">
                  <hr />

                  <div className='flex items-center gap-2 p-3'>
                    <IoCalendarOutline className='w-6 h-6' />
                    <div className='text-lg font-bold'> 날짜를 선택해 주세요.</div>

                  </div>

                  {/* 예약 가능한 날짜 필터링 */}
                  <DateAndTimePicker
                    provider={provider}
                    onSelectDate={(date) => {
                      console.log(`선택된 날짜: ${date}`);
                    }}
                    onSelectTime={(time) => {
                      console.log(`선택된 시간: ${time}`);
                    }}
                  />
                </div>
                )}

              </div>
            ))}

          </section>
        </div>
      </div>

    </div>
  );
}
