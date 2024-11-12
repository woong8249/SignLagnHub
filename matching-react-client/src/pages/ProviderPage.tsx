import { useEffect } from 'react';

export function ProviderPage() {
  useEffect(() => {
    window.history.replaceState(null, '', '/');
  }, []);
  return (
    <div></div>
  );
}
