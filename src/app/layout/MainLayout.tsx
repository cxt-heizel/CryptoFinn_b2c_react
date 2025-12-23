import { Box, Paper } from '@mui/material';
import { ReactNode } from 'react';

import { AppMenu } from '../../shared/ui/AppMenu';
import { AppBar } from '../../shared/ui/AppBar';
import { useNavigationLayout } from './useNavigationLayout';

interface Props {
  children: ReactNode;
}

export const MainLayout = ({ children }: Props) => {
  const { sections, utilSections, activeMenuLabel, appBarChildren } = useNavigationLayout();

  return (
    <Box sx={{ display: 'flex',justifyContent:'center', minHeight: '100vh', bgcolor: '#f5f7fb' }}>
      <Paper sx={{maxWidth: '1920px', minWidth:'1200px', display: 'flex', width:'100%'}}>        
        <AppMenu sections={sections} utilsections={utilSections}/>
        <Box component="main" sx={{ flexGrow: 1, display:'flex',flexDirection:'column'  }}>
          <AppBar title={activeMenuLabel}>
            {appBarChildren}
          </AppBar>
          <Box sx={{ pr: 2,pb: 2, flexGrow:1 }}>
            {children}
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};
