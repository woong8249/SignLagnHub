import TopNavBar from '@layouts/common/TopNavBar';
import ButtonGrid from '@layouts/consumer/ButtonGrid';
import { useConsumer } from '@hooks/useConsumer';
import { useEffect } from 'react';
import ErrorPage from './ErrorPage';
import { ConsumerWithAllInfo } from '@typings/User';

export default function ConsumerPage() {
  const { consumer, error } = useConsumer();

  useEffect(() => {
    window.history.replaceState(null, '', '/');
  }, [consumer]);

  if (error) {
    return <ErrorPage></ErrorPage>;
  }

  const fetchedConsumer = consumer as ConsumerWithAllInfo;
  const {
    profileImage, name,
  } = fetchedConsumer;

  return (
    <div className="relative bg-[url('background.webp')] bg-cover bg-center min-h-screen m-auto">
      {/* Dark overlay over background */}
      <div className="absolute inset-0 bg-black opacity-50 z-0" />
      {/* TopNavBar */}

      <TopNavBar />

      <section
        className={`
          sm:flex sm:flex-col sm:justify-center 
          relative z-5 pt-[6rem] w-[90vw] h-[90vh] px-10 m-auto
          text-white`}>
        {/* h1 */}
        <h1 className='responsive-h1 font-bold mb-2'>SignLangHub 통역사 예약 서비스</h1>

        {/* Contents */}
        <div className='xl:flex xl:items-center xl:justify-center'>
          <div className='w-full my-[2rem]' >
            <div className='text-gray-300 mb-2'>
              <img src={profileImage} alt="profile" className='w-[100px] border rounded-xl mb-2 ' />
              <span className="text-2xl">{name}</span>
              <span>{' 님'}</span>
            </div>

            <div>반갑습니다. 오늘도 즐거운 하루 되세요.</div>
          </div>

          <ButtonGrid consumer={fetchedConsumer} />
        </div>
      </section>
    </div>
  );
}
