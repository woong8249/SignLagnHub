import * as ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import './index.css';

import ErrorPage from '@pages/ErrorPage';
import ConsumerPage from '@pages/ConsumerPage';
import { ProviderPage } from '@pages/ProviderPage';
import MainPage from '@pages/MainPage';
import { BookingPage } from '@pages/BookingPage';
import {
  // clearLocalStorage,
  initData,
} from '@utils/initData';
import { loadGoogleMapsScript } from '@utils/loadGoogleMapScript';
import config from '@config/config';

// clearLocalStorage();
initData();

await loadGoogleMapsScript(config.googleKey);
const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/consumer',
    element: <ConsumerPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/provider',
    element: <ProviderPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/booking',
    element: <BookingPage />,
    errorElement: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <RouterProvider router={router} />,
);
