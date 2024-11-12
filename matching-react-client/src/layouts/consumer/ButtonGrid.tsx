import { IoCalendarOutline } from 'react-icons/io5';
import { FaUserCheck } from 'react-icons/fa';
import { AiOutlineCheckCircle } from 'react-icons/ai';

export default function ButtonGrid() {
  return (
    <div className="w-full flex flex-wrap gap-3 justify-center text-gray-500 font-semibold">
      <div
        className="bg-white w-[170px] h-[170px] rounded-lg flex flex-col justify-center items-center shadow-[0_10px_25px_rgba(0,0,0,0.3)] drop-shadow-2xl"
        role="button"
        tabIndex={0}
      >
        <IoCalendarOutline className="w-10 h-10 mb-2 text-gray-700" />
        통역사 예약하기
      </div>

      <div
        className="bg-gray-300 w-[170px] h-[170px] rounded-lg flex flex-col justify-center items-center shadow-[0_10px_25px_rgba(0,0,0,0.3)] drop-shadow-2xl"
        role="button"
        tabIndex={0}
      >
        <FaUserCheck className="w-10 h-10 mb-2 text-gray-700" />
        통역사 배정받기
      </div>

      <div
        className="bg-[#AABBCC] w-[170px] h-[170px] rounded-lg flex flex-col justify-center items-center shadow-[0_10px_25px_rgba(0,0,0,0.3)] drop-shadow-2xl"
        role="button"
        tabIndex={0}
      >
        <AiOutlineCheckCircle className="w-10 h-10 mb-2 text-gray-700" />
        예약 확인하기
      </div>
    </div>
  );
}
