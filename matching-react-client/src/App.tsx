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

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/provider',
    element: <ProviderPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/consumer',
    element: <ConsumerPage />,
    errorElement: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <RouterProvider router={router} />,
);
