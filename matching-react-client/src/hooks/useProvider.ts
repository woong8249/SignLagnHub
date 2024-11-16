import { userApi } from '@utils/userApi';
import { ProviderWithAllInfo } from '@typings/User';

const fetchProvider = (): ProviderWithAllInfo | null => {
  try {
    const provider = userApi.getUserWithAllInfo(2) as ProviderWithAllInfo; // 항상 id 2번 사용자
    return provider || null;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    return null;
  }
};

export function useConsumer() {
  const provider = fetchProvider();

  return {
    provider,
    error: provider ? null : 'Failed to load provider',
  };
}
