import { ReactElement } from 'react';
import { LandingPage } from '../../pages/landing/LandingPage';
import { LoginPage } from '../../pages/auth/LoginPage';
import { DashboardPage } from '../../pages/dashboard/DashboardPage';
import { ReportsPage } from '../../pages/reports/ReportsPage';
import { AuthLayout } from '../layout/AuthLayout';
import { MainLayout } from '../layout/MainLayout';
import { PublicLayout } from '../layout/PublicLayout';

export type AppRoute = {
  path: string;
  element: ReactElement;
  layout?: (props: { children: ReactElement }) => ReactElement;
};

export const routes: AppRoute[] = [
  {
    path: '/',
    element: <LandingPage />,
    layout: ({ children }) => <PublicLayout>{children}</PublicLayout>,
  },
  {
    path: '/login',
    element: <LoginPage />,
    layout: ({ children }) => <PublicLayout>{children}</PublicLayout>,
  },
  {
    path: '/dashboard',
    element: <DashboardPage />,
    layout: ({ children }) => <PublicLayout>{children}</PublicLayout>,
  },
  {
    path: '/reports',
    element: <DashboardPage />,
    layout: ({ children }) => <MainLayout>{children}</MainLayout>,
  },
];
