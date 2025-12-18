import { Box } from '@mui/material';
import { ReactNode } from 'react';
import PublicHeader from '../../shared/ui/PublicHeader.tsx';
import PublicFooter from '../../shared/ui/PublicFooter.tsx';
import { PublicThemeProvider } from '../providers/PublicThemeProvider';

interface Props {
  children: ReactNode;
  isSimple?: boolean;
}

export const PublicLayout = ({ children, isSimple = false }: Props) => {
  console.log( isSimple );
  return (
    <PublicThemeProvider>
      <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <PublicHeader isSimple={isSimple} />
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
          {children}
        </Box>
        <PublicFooter isSimple={isSimple} />
      </Box>
    </PublicThemeProvider>
  );
};
