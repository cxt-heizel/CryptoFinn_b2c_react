import { BrowserRouter, Navigate, useRoutes } from 'react-router-dom';
import { routes } from './routes';

const AppRoutes = () =>
  useRoutes([
    ...routes,
    {
      path: '*',
      element: <Navigate to="/" replace />,
    },
  ]);

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
};
