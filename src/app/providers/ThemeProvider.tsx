import { CssBaseline, ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material';
import { ReactNode, useMemo } from 'react';

interface Props {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: Props) => {
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: 'light',
          primary: { main: '#000' },
          secondary: { main: '#ccc' },
        },
        shape: { borderRadius: 4 },
        typography: {
          fontFamily: ['Pretendard', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'sans-serif'].join(', '),
        },
        breakpoints : {
          values : {
            xs: 430,
            sm: 720,
            md: 1280,
            lg: 1440,
            xl: 1920
          }
        }
      }),
    [],
  );

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
};
