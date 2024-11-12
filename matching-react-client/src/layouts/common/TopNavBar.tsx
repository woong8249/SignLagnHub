import { Logo } from '@components/Logo';
import { useEffect, useState } from 'react';
import { HiBars3 } from 'react-icons/hi2';
import { IoIosNotificationsOutline } from 'react-icons/io';

export default function TopNavBar() {
  const [isScrolled, setIsScrolled] = useState(false);
  function handleScroll() {
    setIsScrolled(window.scrollY > 1); // 50px 이상 스크롤 시 배경 반전
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      className={`z-10 fixed top-0 left-0 w-full flex items-center justify-between px-5 py-3 
        ${isScrolled ? 'bg-white text-black' : ' text-white'}`}>
      <Logo />

      <div className={`flex gap-4 ${isScrolled ? 'text-black' : ' text-gray-300'}`}>
        <IoIosNotificationsOutline className="cursor-pointer w-8 h-8" />
        <HiBars3 className="cursor-pointer w-8 h-8" />
      </div>
    </div>
  );
}
