import { IoCalendarOutline } from 'react-icons/io5';
import { FaUserCheck } from 'react-icons/fa';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import { Link } from 'react-router-dom';

export default function ButtonGrid() {
  return (
    <div className="w-full flex flex-wrap gap-3 justify-center text-gray-500 font-semibold">
      <Link to={'/booking'}>
        <div
        className={`
          flex flex-col justify-center items-center
           w-[170px] h-[170px] rounded-lg
          bg-white shadow-[0_10px_25px_rgba(0,0,0,0.3)] drop-shadow-2xl
          transition-transform transform hover:scale-105 hover:shadow-2xl hover:bg-blue-100`}
        role="button"
        tabIndex={0}
      >
          <IoCalendarOutline className="w-10 h-10 mb-2 text-gray-700 hover:text-blue-500" />
          통역사 예약하기
        </div>
      </Link>

      <div
        className={`
          flex flex-col justify-center items-center
          w-[170px] h-[170px] rounded-lg
          bg-gray-300  shadow-[0_10px_25px_rgba(0,0,0,0.3)] drop-shadow-2xl
          transition-transform transform hover:scale-105 hover:shadow-2xl hover:bg-gray-400`}
        role="button"
        tabIndex={0}
      >
        <FaUserCheck className="w-10 h-10 mb-2 text-gray-700 hover:text-blue-500" />
        통역사 배정받기
      </div>

      <div
        className={`
          flex flex-col justify-center items-center
          w-[170px] h-[170px] rounded-lg
          bg-[#AABBCC] shadow-[0_10px_25px_rgba(0,0,0,0.3)] drop-shadow-2xl
          transition-transform transform hover:scale-105 hover:shadow-2xl hover:bg-blue-200
          `}
        role="button"
        tabIndex={0}
      >
        <AiOutlineCheckCircle className="w-10 h-10 mb-2 text-gray-700 hover:text-blue-500" />
        예약 확인하기
      </div>
    </div>
  );
}
