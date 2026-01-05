import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import AddCircleOutlineSharpIcon from '@mui/icons-material/AddCircleOutlineSharp';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import RouteIcon from '@mui/icons-material/Route';
import { Box, Typography } from '@mui/material';
import { ReactNode, useMemo } from 'react';
import { NavigateFunction, useLocation, useNavigate } from 'react-router-dom';

import { AppMenuItem, AppMenuSection, UtilMenuSection } from '../../shared/ui/AppMenu';
import { AppButton } from '../../shared/ui/AppButton';

type NavigationMenuItem = Omit<AppMenuItem, 'selected' | 'onClick'> & { path: string };

type NavigationMenuSection = {
  id: string;
  items: NavigationMenuItem[];
};

const navigationSections: NavigationMenuSection[] = [
  {
    id: 'primary',
    items: [
      {
        key: 'dashboard',
        label: '대시보드',
        path: '/dashboard',
        icon: <GridViewOutlinedIcon />,
      },
    ],
  },
  {
    id: 'secondary',
    items: [
      {
        key: 'assets',
        label: '연결',
        path: '/assets',
        icon: <AddCircleOutlineSharpIcon />,
      },
      {
        key: 'overseas',
        label: '해외금융계좌',
        path: '/overseas',
        icon: <LocalAtmIcon />,
      },
      {
        key: 'moneysource',
        label: '자금출처조사',
        path: '/moneysource',
        icon: <RouteIcon />,
      },
    ],
  },
  {
    id: 'tertiary',
    items: [
      {
        key: 'support',
        label: '고객지원',
        path: '/support',
        icon: <HelpOutlineIcon />,
      },
    ],
  },
];

const navigationUtilSections: NavigationMenuSection[] = [
  {
    id: 'Utility',
    items: [
      {
        key: 'setting',
        label: '설정',
        path: '/setting',
        icon: <SettingsIcon />,
      },
      {
        key: 'logout',
        label: '로그아웃',
        path: '/logout',
        icon: <LogoutIcon />,
      },
    ],
  },
];

const appBarChildrenByMenu: Partial<Record<string, ReactNode>> = {
  dashboard: (
    <Typography variant="body2" color="text.secondary">
      거래 데이터를 추가할수록 정확한 데이터를 확인할 수 있어요
    </Typography>
  ),
  assets: (
    <AppButton variant="contained">
      데이터 연결하기
    </AppButton>
  ),
  overseas: (
    <Typography variant="body2" color="text.secondary">
      거래 데이터를 추가할수록 정확한 데이터를 확인할 수 있어요
    </Typography>
  ),
  moneysource: (
    <AppButton variant="outlined">
      PDF 내보내기
    </AppButton>
  )
};

const mapNavigationToMenu = (
  sections: NavigationMenuSection[],
  pathname: string,
  navigate: NavigateFunction
): AppMenuSection[] =>
  sections.map((section) => ({
    id: section.id,
    items: section.items.map(({ path, ...item }) => ({
      ...item,
      selected: pathname.startsWith(path),
      onClick: () => navigate(path),
    })),
  }));

export const useNavigationLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const pathname = location.pathname;

  const sections = useMemo(
    () => mapNavigationToMenu(navigationSections, pathname, navigate),
    [pathname, navigate]
  );
  const utilSections = useMemo(
    () => mapNavigationToMenu(navigationUtilSections, pathname, navigate) as UtilMenuSection[],
    [pathname, navigate]
  );

  const activeMenu =
    [...sections, ...utilSections].flatMap((section) => section.items).find((item) => item.selected) ?? null;
  const activeMenuLabel = activeMenu?.label ?? '';
  const appBarChildren = activeMenu ? appBarChildrenByMenu[activeMenu.key] ?? null : null;

  return {
    sections,
    utilSections,
    activeMenuLabel,
    appBarChildren,
  };
};
