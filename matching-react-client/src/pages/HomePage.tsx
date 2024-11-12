import TopNavBar from '@layouts/TopNavBar';
import ButtonGrid from '@layouts/ButtonGrid';

export default function HomePage() {
  return (
    <div className="relative bg-[url('background.webp')] bg-cover bg-center min-h-screen m-auto">
      {/* Dark overlay over background */}
      <div className="absolute inset-0 bg-black opacity-50 z-0" />
      {/* TopNavBar */}

      <TopNavBar />

      <section className="sm:flex sm:flex-col sm:justify-center pt-[6rem] w-[90vw] h-[90vh] px-10 relative z-5 text-white m-auto">
        {/* h1 */}
        <h1 className='responsive-h1 font-bold mb-2'>SignLangHub 통역사 예약 서비스</h1>

        {/* Contents */}
        <div className='xl:flex xl:items-center xl:justify-center'>
          {/* Introduce */}
          <div className='w-full my-[2rem]' >
            <div className='text-gray-300 mb-2'>
              <span className="text-2xl">최별규</span>
              <span>{' 님'}</span>
            </div>

            <div>반갑습니다. 오늘도 즐거운 하루 되세요.</div>
          </div>

          <ButtonGrid />

        </div>

      </section>

    </div>
  );
}
