import { Box, Container } from '@mui/material';
import { ReactNode } from 'react';
import PublicHeader from '../../shared/ui/PublicHeader.tsx';
import PublicFooter from '../../shared/ui/PublicFooter.tsx';
import { PublicThemeProvider } from '../providers/PublicThemeProvider';

interface Props {
  children: ReactNode;
}

export const PublicLayout = ({ children }: Props) => {
  return (
    <PublicThemeProvider>
      <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <PublicHeader />
        <Box>
          {children}
        </Box>
        <PublicFooter />
      </Box>
    </PublicThemeProvider>
  );
};
