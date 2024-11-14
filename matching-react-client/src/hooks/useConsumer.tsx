import { userApi } from '@utils/userApi';
import { ConsumerWithAllInfo } from '@typings/User';

const fetchConsumer = (): ConsumerWithAllInfo | null => {
  try {
    const user = userApi.getUserWithAllInfo(1); // 항상 id 1번 사용자
    return user || null;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    return null;
  }
};

export function useConsumer() {
  const consumer = fetchConsumer();

  return {
    consumer,
    error: consumer ? null : 'Failed to load consumer',
  };
}
