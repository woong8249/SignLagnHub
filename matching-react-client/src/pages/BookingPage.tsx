/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-param-reassign */
import { useConsumer } from '@hooks/useConsumer';
import SideNavBar from '@layouts/common/SideNavBar';
import ErrorPage from './ErrorPage';
import { ConsumerWithAllInfo, ProviderWithAllInfo } from '@typings/User';
import { GoogleMapSection } from '@sections/GoogleMapSection';
import { userApi } from '@utils/userApi';
import { markerUrl } from '@constants/marker';
import { FaPhoneVolume } from 'react-icons/fa6';
import { FcVideoCall } from 'react-icons/fc';
import { useImmer } from 'use-immer';

export type Provider =Omit<ProviderWithAllInfo, 'center'> &{selected: boolean}

export function BookingPage() {
  const { consumer, error } = useConsumer();
  const fetchedConsumer = consumer as ConsumerWithAllInfo;
  const { center } = fetchedConsumer;

  const initProviders = userApi.getProvidersWithAllInfoByCenterId(center.id).map((item) => ({ ...item, selected: false }));

  const [providers, setProviders] = useImmer<Provider[]>(initProviders);

  function handleProvideSelection(provider:Provider) {
    setProviders((draft) => {
      draft.forEach((draftProvider) => {
        if (draftProvider.selected) {
          draftProvider.selected = false;
        }
        if (draftProvider.id === provider.id) {
          draftProvider.selected = true;
        }
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
          {/* First Layout */}
          <section className=" flex-1 bg-white overflow-y-auto  shadow-lg rounded">
            <img className='w-full h-[300px]' alt='place' src={center.images[0] as string}></img>

            <div className='p-4 mt-4'>
              <h2 className="text-2xl font-semibold mb-4">{center.name}</h2>

              <div className='flex items-center gap-2 mb-2'>
                <img alt='marker'className='w-5 'src={markerUrl.center} />
                <div className="text-sm   text-gray-600">{center.address}</div>
              </div>

              <div className='flex items-center gap-2 mb-2 '>
                <FaPhoneVolume className='w-5 text-gray-400' />
                <div className="text-sm font-medium  text-gray-600">{` ${center.phoneNumber}`}</div>
              </div>

              <div className='flex items-center gap-2 mb-2 '>
                <FcVideoCall className='w-5 text-gray-400' />
                <div className="text-sm font-medium  text-gray-600">{`${center.videoCallNumber}`}</div>
              </div>

              <div className="mt-6">
                <h3 className="text-base font-semibold mb-2">운영시간</h3>

                <ul className="text-sm text-gray-600">
                  {center.businessHours.map((dayInfo, index) => (
                    <li key={index} className="mb-1">
                      <span className="font-medium text-gray-800">
                        {dayInfo.day}
                        :
                      </span>

                      {dayInfo.open && dayInfo.close ? (
                        <>
                          {dayInfo.open}
                          -
                          {dayInfo.close}

                          {dayInfo.breakTime && (
                          <span className="ml-2 text-gray-500">{`(휴게시간: ${dayInfo.breakTime.start} - ${dayInfo.breakTime.end})`}</span>
                          )}
                        </>
                      ) : (
                        <span className="text-gray-500">휴무</span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>

            </div>

          </section>

          {/* Second Layout */}
          <section className=" flex-1 bg-gray-100 overflow-y-auto  shadow-lg rounded">
            <h2 className="text-2xl font-semibold p-4 "> 예약</h2>

            {providers.map((provider, index) => (
              <div key={index} >
                <div
                className={`flex items-center gap-4  border rounded-lg m-4 bg-white ${provider.selected ? 'border-blue-400 border-2' : 'border-gray-300'}`}
                role='button'
                tabIndex={0}
                onClick={(e) => {
                  e.stopPropagation();
                  handleProvideSelection(provider);
                }}
                >
                  <img src={provider.profileImage} alt='profile' className='w-[100px]' />

                  <div className='flex gap-2'>
                    <span className='text-base text-gray-500'>{provider.name}</span>
                    <span className='text-base'>통역사님</span>
                  </div>

                </div>

              </div>
            ))}

          </section>
        </div>
      </div>

    </div>
  );
}
