import { ReactElement } from 'react';
import { LandingPage } from '../../pages/landing/LandingPage';
import { LoginPage } from '../../pages/auth/LoginPage';
import { DashboardPage } from '../../pages/dashboard/DashboardPage';
import { ConnectPage } from '../../pages/connect/ConnectPage';
import { OverseasPage } from '../../pages/overseas/OverseasPage';
import { MoneysourcePage } from '../../pages/moneysource/MoneysourcePage';
import { SupportPage } from '../../pages/support/SupportPage';
import { SettingPage } from '../../pages/setting/SettingPage';
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
    layout: ({ children }) => <PublicLayout isSimple={true}>{children}</PublicLayout>,
  },
  {
    path: '/dashboard',
    element: <DashboardPage />,
    layout: ({ children }) => <MainLayout>{children}</MainLayout>,
  },
  {
    path: '/connect',
    element: <ConnectPage />,
    layout: ({ children }) => <MainLayout>{children}</MainLayout>,
  },
  {
    path: '/overseas',
    element: <OverseasPage />,
    layout: ({ children }) => <MainLayout>{children}</MainLayout>,
  },
  {
    path: '/moneysource',
    element: <MoneysourcePage />,
    layout: ({ children }) => <MainLayout>{children}</MainLayout>,
  },
  {
    path: '/support',
    element: <SupportPage />,
    layout: ({ children }) => <MainLayout>{children}</MainLayout>,
  },
  {
    path: '/setting',
    element: <SettingPage />,
    layout: ({ children }) => <MainLayout>{children}</MainLayout>,
  },
];
