import { CssBaseline, GlobalStyles, ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material';
import { ReactNode, useMemo } from 'react';

interface Props {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: Props) => {
  const fontFamily = ['Pretendard', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'sans-serif'].join(', ')
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: 'light',
          primary: { main: '#505866' },
          secondary: { main: '#5789EC' },
          warning : { main: '#CE1414' },
          success : { main: '#1BC290' },
          text: {
            primary: '#1A1E27',
            secondary: '#555',
          }
        },
        shape: { borderRadius: 4 },
        typography: {
          fontFamily: fontFamily,
          h1: { fontSize: 26, fontWeight: 700, letterSpacing: '-0.01em'},
          h2: { fontSize: 22, fontWeight: 600, letterSpacing: '-0.02em'},
          h3: { fontSize: 18, fontWeight: 600, letterSpacing: '-0.02em'},
          h4: { fontSize: 16, fontWeight: 600, letterSpacing: '-0.02em'},
          subtitle1: { fontSize: 14, fontWeight: 500, letterSpacing: '-0.02em'},
          body1: {fontSize: 14, fontWeight: 400},
          body2: {fontSize: 12, fontWeight: 400}
        },
        breakpoints : {
          values : {
            xs: 430,
            sm: 720,
            md: 1280,
            lg: 1440,
            xl: 1920
          }
        },
        components: {
          MuiButton: {
            styleOverrides:{
              root: {
                fontFamily: fontFamily,
                boxShadow: 'none'
              }
            }
          },
          MuiListItemButton: {
            styleOverrides: {
              root: {
                borderRadius: 8,
                '&:hover': {
                  backgroundColor: '#FAFAFB',
                  color: '#505866'
                },
                '&:hover .MuiTypography-root': {
                  color: '#505866'
                },
                '&.Mui-selected': {
                  backgroundColor: '#FAFAFB',
                },
                '&.Mui-selected:hover': {
                  backgroundColor: '#FAFAFB',
                },
                '&.Mui-selected .MuiListItemIcon-root':{
                  color: '#505866',
                },
                '&.Mui-selected .MuiTypography-root': {
                  color: '#505866',
                },
              },
            },
          },
        },
      }),
    [],
  );

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles
        styles={`

          :root{
            --Color-greyscale-000: #ffF;
            --Color-greyscale-050: #FCFCFC;
            --Color-greyscale-100: #FAFAFB;
            --Color-greyscale-200: #F2F4F6;
            --Color-greyscale-300: #E5E8EB;
            --Color-greyscale-400: #DEE1E4;
            --Color-greyscale-500: #D2D6DB;
            --Color-greyscale-600: #B1B8C0;
            --Color-greyscale-700: #8D94A0;
            --Color-greyscale-800: #6D7582;
            --Color-greyscale-900: #505866;
            --Color-greyscale-1000: #353C49;
            --Color-greyscale-1100: #1A1E27;

            --Color-red-0: #FFFAFC;
            --Color-red-50: #FFEFF4;
            --Color-red-100: #FFDEE8;
            --Color-red-200: #FFA0C2;
            --Color-red-300: #F26A93;
            --Color-red-400: #EC113A;
            --Color-red-500: #CE1414;
            --Color-red-600: #B21936;
            --Color-red-700: #99152E;
            --Color-red-800: #801227;
            --Color-red-900: #660618;

            --Color-green-0: #F8FEFF;
            --Color-green-50: #F1FFFC;
            --Color-green-100: #E5FFF6;
            --Color-green-200: #ABF2D8;
            --Color-green-300: #7DE2BD;
            --Color-green-400: #3DD7A3;
            --Color-green-500: #1BC290;
            --Color-green-600: #3C9C7F;
            --Color-green-700: #21625A;
            --Color-green-800: #21625A;
            --Color-green-900: #164E4A;

            --Color-yellow-0: #FFFDF9;
            --Color-yellow-50: #FFF7EB;
            --Color-yellow-100: #FFE0AD;
            --Color-yellow-200: #FFD085;
            --Color-yellow-300: #FFBF57;
            --Color-yellow-400: #EBA533;
            --Color-yellow-500: #E29009;
            --Color-yellow-600: #C2821B;
            --Color-yellow-700: #A36E17;
            --Color-yellow-800: #66440E;
            --Color-yellow-900: #4C350F;

            --Color-blue-0: #F5F9FD;
            --Color-blue-50: #E9EFF7;
            --Color-blue-100: #DAE9FD;
            --Color-blue-200: #B0CAF9;
            --Color-blue-300: #7AA2F0;
            --Color-blue-400: #5789EC;
            --Color-blue-500: #3167D2;
            --Color-blue-600: #1212A9;
            --Color-blue-700: #1E4683;
            --Color-blue-800: #25416B;
            --Color-blue-900: #253650;

            --Color-Ent-gra-Gradient000: linear-gradient(90deg, #1BC285 70.69%, #12C2CD 100%);
            --Color-Ent-gra-Gradient002: linear-gradient(90deg, #7AE6BF 70.69%, #91E3E4 100%);
          }


        `}
      />
      {children}
    </MuiThemeProvider>
  );
};
