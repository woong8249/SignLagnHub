import { Consumer } from '@typings/user';
import useSWR from 'swr';

// 페이크 유저 데이터 가져오기
const fetchUser = (): Consumer | null => {
  if (typeof window !== 'undefined') {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
  return null;
};

export function useConsumer() {
  const { data, error, mutate } = useSWR('user', fetchUser, {
    fallbackData: null,
    revalidateOnFocus: false,
  });

  const login = (user: Consumer) => {
    localStorage.setItem('user', JSON.stringify(user));
    mutate(user);
  };

  const logout = () => {
    localStorage.removeItem('user');
    mutate(null);
  };

  return {
    consumer: data,
    isLoading: !error && !data,
    isError: error,
    login,
    logout,
  };
}
