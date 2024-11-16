/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-unused-vars */

import { BookingProcess } from '@layouts/consumer/BookingProcess';
import { Provider } from '@pages/BookingPage';

interface Prob {
    providers:Provider[]
    handleProvideSelection:(provider:Provider)=>void
}

export function BookingSection({ providers, handleProvideSelection }:Prob) {
  return (
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
            <BookingProcess
                provider={provider}
                onSelectDate={(date) => {
                  console.log(`선택된 날짜: ${date}`);
                }}
                onSelectTime={(time) => {
                  console.log(`선택된 시간: ${time}`);
                }}
              />
          )}
        </div>
      ))}

    </section>
  );
}
