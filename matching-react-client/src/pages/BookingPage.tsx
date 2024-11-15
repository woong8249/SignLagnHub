import { useConsumer } from '@hooks/useConsumer';
import SideNavBar from '@layouts/common/SideNavBar';
import ErrorPage from './ErrorPage';
import { ConsumerWithAllInfo } from '@typings/User';
import { GoogleMapSection } from '@sections/GoogleMapSection';

export function BookingPage() {
  const { consumer, error } = useConsumer();

  if (error) {
    return <ErrorPage></ErrorPage>;
  }

  const fetchedConsumer = consumer as ConsumerWithAllInfo;

  return (
    <div className="absolute inset-0 bg-[url('background.webp')] bg-cover bg-center z-0">

      <GoogleMapSection consumer={fetchedConsumer} />

      {/* 메인 레이아웃 */}
      <div className="relative z-[10] flex w-[55%] min-w-[720px] min-h-screen">
        <SideNavBar></SideNavBar>

        <div className="relative flex gap-4 p-6 pl-[100px] w-full">
          {/* First Layout */}
          <section className=" flex-1 bg-white p-6 shadow-lg rounded">
            <h2 className="text-2xl font-bold mb-4">First Layout</h2>
            <p>Content for the first layout goes here.</p>
          </section>

          {/* Second Layout */}
          <section className=" flex-1 bg-gray-100 p-6 shadow-lg rounded">
            <h2 className="text-2xl font-bold mb-4">Second Layout</h2>
            <p>Content for the second layout goes here.</p>
          </section>
        </div>
      </div>

    </div>
  );
}
