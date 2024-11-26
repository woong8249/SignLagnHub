import { HiBars3 } from 'react-icons/hi2';
import { IoIosNotificationsOutline } from 'react-icons/io';
import { IoPersonSharp } from 'react-icons/io5';
import { Link } from 'react-router-dom';

export default function SideNavBar() {
  return (
    <div className="fixed z-[10] top-0 left-0 h-full w-[80px] bg-white text-black flex flex-col items-center justify-between py-5 shadow-lg">
      {/* 로고 */}
      <Link to="/consumer" className="mb-6 ">
        <div className="flex items-center text-2xl font-bold">
          <div>
            <span>S</span>
            <span className="text-red-500">.</span>
            <span>B</span>
          </div>
        </div>
      </Link>

      {/* 아이콘 메뉴 */}
      <div className="flex flex-col items-center w-full">

        <div className="w-full">
          <hr className="border-gray-300" />
          <IoPersonSharp className="cursor-pointer w-7 h-7 mx-auto my-4" />
          <hr className="border-gray-300" />
        </div>

        <div className="w-full">
          <IoIosNotificationsOutline className="cursor-pointer w-8 h-8 mx-auto my-4" />
          <hr className="border-gray-300" />
        </div>

        <div className="w-full">
          <HiBars3 className="cursor-pointer w-8 h-8 mx-auto my-4" />
          <hr className="border-gray-300" />
        </div>
      </div>
    </div>
  );
}
