import { Outlet, RouteObject } from 'react-router-dom';
import { RequireAuth } from '../../features/auth/ui/RequireAuth';
import { ConnectPage } from '../../pages/connect/ConnectPage';
import { DashboardPage } from '../../pages/dashboard/DashboardPage';
import { LandingPage } from '../../pages/landing/LandingPage';
import { LoginPage } from '../../pages/auth/LoginPage';
import { MoneysourcePage } from '../../pages/moneysource/MoneysourcePage';
import { OverseasPage } from '../../pages/overseas/OverseasPage';
import { SettingPage } from '../../pages/setting/SettingPage';
import { SupportPage } from '../../pages/support/SupportPage';
import { SignupRedirectPage } from '../../pages/auth/SignupRedirectPage';
import { MainLayout } from '../layout/MainLayout';
import { PublicLayout } from '../layout/PublicLayout';

export const routes: RouteObject[] = [
  {
    element: (
      <PublicLayout>
        <Outlet />
      </PublicLayout>
    ),
    children: [
      {
        path: '/',
        element: <LandingPage />,
      },
    ],
  },
  {
    element: (
      <PublicLayout isSimple>
        <Outlet />
      </PublicLayout>
    ),
    children: [
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/auth/signup',
        element: <SignupRedirectPage />,
      },
    ],
  },
  {
    element: <RequireAuth />,
    children: [
      {
        element: (
          <MainLayout>
            <Outlet />
          </MainLayout>
        ),
        children: [
          {
            path: '/dashboard',
            element: <DashboardPage />,
          },
          {
            path: '/connect',
            element: <ConnectPage />,
          },
          {
            path: '/overseas',
            element: <OverseasPage />,
          },
          {
            path: '/moneysource',
            element: <MoneysourcePage />,
          },
          {
            path: '/support',
            element: <SupportPage />,
          },
          {
            path: '/setting',
            element: <SettingPage />,
          },
        ],
      },
    ],
  },
];
