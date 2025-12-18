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
            <Box sx={{  bgcolor: '#FAFAFB', width:'100%', height:'100%',border: '1px solid rgba(0, 0, 0, 0.12)', borderRadius: '0 14px 14px 0' }}>
              {children}
            </Box>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};
