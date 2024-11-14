import { useConsumer } from '@hooks/useConsumer';
import TopNavBar from '@layouts/common/TopNavBar';
import ErrorPage from './ErrorPage';
import { ConsumerWithAllInfo } from '@typings/User';
import { userApi } from '@utils/userApi';

export function BookingPage() {
  const {
    consumer, error,
  } = useConsumer();

  if (error) {
    return <ErrorPage></ErrorPage>;
  }
  const fetchedConsumer = consumer as ConsumerWithAllInfo;
  const { center, currentCoordinates } = fetchedConsumer;
  const providers = userApi.getProvidersWithAllInfoByCenterId(center.id);
  console.log(providers);
  const { coordinates } = center;

  return (
    <div className="relative bg-[url('background.webp')] bg-cover bg-center min-h-screen m-auto">
      {/* Dark overlay over background */}
      <div className="absolute inset-0 bg-black opacity-50 z-0" />
      {/* TopNavBar */}
      <TopNavBar />

      <section className='relative z-5 w-full min-h-screen pt-[6rem] px-8'>

      </section>

    </div>
  );
}
