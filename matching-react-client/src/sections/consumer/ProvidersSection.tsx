/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-unused-vars */

import { BookingProcess } from '@layouts/consumer/BookingProcess';
import { Provider } from '@pages/BookingPage';
import { ConsumerWithAllInfo } from '@typings/User';

import { FaPhoneAlt } from 'react-icons/fa';

interface Prob {
    consumer:ConsumerWithAllInfo
    providers:Provider[]
    handleProvideSelection:(provider:Provider)=>void
    onPlaceSelect: (place: { lat: number; lng: number }) => void; // Prop 추가
}

export function ProvidersSection({
  consumer, providers, handleProvideSelection, onPlaceSelect,
}:Prob) {
  return (
    <section className=" flex-1 bg-gray-100 overflow-y-auto  shadow-lg rounded">
      <h2 className="text-2xl font-semibold p-4 "> 예약 신청</h2>

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

            <div className='flex flex-col gap-2'>
              <div>
                <div className='flex gap-1 items-center justify-center'>
                  <span className='text-base '>{provider.name}</span>
                  <span className='text-xs text-gray-500'>통역사님</span>
                </div>
              </div>

              <div className='flex items-center gap-3'>
                <FaPhoneAlt className='w-3 h-3' />

                <div className='text-xs text-gray-500'>
                  {provider.phoneNumber}
                </div>
              </div>
            </div>

          </div>

          {provider.showBookingForm && (
            <BookingProcess
                consumer ={consumer}
                provider={provider}
                onSelectPlace={(place) => onPlaceSelect(place)} // 장소 선택 시 전달
              />
          )}
        </div>
      ))}

    </section>
  );
}
