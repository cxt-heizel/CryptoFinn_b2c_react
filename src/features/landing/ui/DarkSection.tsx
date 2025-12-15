import React from 'react';
import { ThemeProvider, createTheme, useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';

type Props = { children: React.ReactNode };

export function DarkSection({ children }: Props) {
  const parent = useTheme();

  const merged = createTheme(parent, {
    palette: {
      // mode는 필요에 따라 포함/제외
      // mode: 'dark',
      background: { default: '#020C1C' },
      text: { primary: '#fff', secondary: '#D1D5DB' },
    },
  });

  return (
    <ThemeProvider theme={merged}>
      <Box sx={{ bgcolor: 'background.default', color: 'text.primary' }}>
        {children}
      </Box>
    </ThemeProvider>
  );
}
