import { markerUrl } from '@constants/marker';
import { Center } from '@typings/Center';
import { FaPhoneVolume } from 'react-icons/fa';
import { FcVideoCall } from 'react-icons/fc';

interface Prob {
    center:Center
}

export function CenterSection({ center }:Prob) {
  return (
    <section className=" flex-1 bg-white overflow-y-auto  shadow-lg rounded">
      <img className='w-full h-[300px]' alt='place' src={center.images[0] as string}></img>

      <div className='p-4 mt-4'>
        <h2 className="text-2xl font-semibold mb-4">{center.name}</h2>

        <div className='flex items-center gap-2 mb-2'>
          <img alt='marker'className='w-5 'src={markerUrl.center} />
          <div className="text-sm  text-gray-600">{center.address}</div>
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
  );
}
