import useSWR from 'swr';
import { userApi } from '@utils/userApi';
import { ConsumerWithAllInfo } from '@typings/User';

// id 1번 사용자를 가져오는 함수

const fetchConsumer = async (): Promise<ConsumerWithAllInfo | null> => {
  try {
    const user = await userApi.getUserWithAllInfo(1);
    return user || null;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    return null;
  }
};

export function useConsumer() {
  const { data, error, isLoading } = useSWR('consumer', fetchConsumer, {
    fallbackData: null,
    revalidateOnFocus: false,
  });
  if (error) {
    console.error(error);
  }

  return {
    consumer: data,
    isLoading,
    error,
  };
}
