import { Box, Paper } from '@mui/material';
import { ReactNode, createContext, useContext, useEffect, useMemo, useState } from 'react';

import { AppMenu } from '../../shared/ui/AppMenu';
import { AppBar } from '../../shared/ui/AppBar';
import { useNavigationLayout } from './useNavigationLayout';

interface Props {
  children: ReactNode;
}

type AppBarSlot = {
  title?: ReactNode;
  subtitle?: ReactNode;
  actions?: ReactNode;
};

type AppBarSlotContextValue = {
  setAppBarSlot: (slot: AppBarSlot | null) => void;
};

const AppBarSlotContext = createContext<AppBarSlotContextValue | null>(null);

export const useAppBarSlot = (slot: AppBarSlot | null) => {
  const context = useContext(AppBarSlotContext);

  useEffect(() => {
    if (!context) return;
    context.setAppBarSlot(slot);
    return () => context.setAppBarSlot(null);
  }, [context, slot]);
};

export const MainLayout = ({ children }: Props) => {
  const { sections, utilSections, activeMenuLabel, appBarChildren } = useNavigationLayout();
  const [appBarSlot, setAppBarSlot] = useState<AppBarSlot | null>(null);
  const appBarContextValue = useMemo(() => ({ setAppBarSlot }), [setAppBarSlot]);

  return (
    <AppBarSlotContext.Provider value={appBarContextValue}>
      <Box sx={{ display: 'flex', justifyContent: 'center', minHeight: '100vh', bgcolor: '#f5f7fb' }}>
        <Paper sx={{ maxWidth: '1920px', minWidth: '1200px', display: 'flex', width: '100%' }}>
          <AppMenu sections={sections} utilsections={utilSections} />
          <Box component="main" sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
            <AppBar
              title={appBarSlot?.title ?? activeMenuLabel}
              subtitle={appBarSlot?.subtitle}
              actions={appBarSlot?.actions ?? appBarChildren}
            />
            <Box sx={{ pr: 2, pb: 2, flexGrow: 1 }}>
              {children}
            </Box>
          </Box>
        </Paper>
      </Box>
    </AppBarSlotContext.Provider>
  );
};
