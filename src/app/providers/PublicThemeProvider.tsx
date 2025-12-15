import { ReactNode, useMemo } from 'react';
import { GlobalStyles, CssBaseline } from '@mui/material';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';

interface Props {
  children: ReactNode;
}


declare module '@mui/material/styles' {
  interface TypographyVariants {
    body1: React.CSSProperties; 
  }
  interface PaletteVariants {
    tertiary: React.CSSProperties; 
  }

  interface TypographyVariantsOptions {
    body1?: React.CSSProperties;
  }
  interface PaletteVariantsOption {
    tertiary: React.CSSProperties; 
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    body1: true;
  }
}


export const PublicThemeProvider = ({ children }: Props) => {
  const theme = useMemo(() => {

    let theme = createTheme({
      spacing: 2,
      breakpoints: {
        values: {
          xs: 0,
          sm: 720,
          md: 1280,
          lg: 1440,
          xl: 1920,
        },
      },
    });

    theme = createTheme(theme,{
      palette: {
        mode: 'light',
        primary: { 
          main: '#0b1626',
        },
        secondary: { 
          main: '#2192FF' 
        },
        background: { 
          default: '#ffffff',
          grey: '#F2F2F7' 
        },
        text: {
          primary: '#222',
          secondary: '#555',
          tertiary: '#9FA0AC'
        },
      },
      shape: { borderRadius: 12 },
      typography: {
        h1: { fontSize: 70, fontWeight: 700, letterSpacing: '-0.01em', lineHeight: '140%' },
        h2: { fontSize: 60, fontWeight: 700, letterSpacing: '-0.02em', lineHeight: '140%' },
        h3: { fontSize: 24, fontWeight: 700, letterSpacing: '-0.02em', lineHeight: '140%',
          [theme.breakpoints.up('md')]: {
            fontSize: 50
          },
        },
        h4: { fontSize: 28, fontWeight: 700, letterSpacing: '-0.02em', lineHeight: '140%',
          [theme.breakpoints.up('md')]: {
            fontSize: 48
          },
        },
        subtitle1: { fontSize: 18, fontWeight:400, letterSpacing: '-0.02em', lineHeight: '140%',
          [theme.breakpoints.up('md')]: {
            fontSize: 24
          }
         },
        subtitle2: { fontSize: 16, fontWeight:500, letterSpacing: '-0.02em', lineHeight: '140%',
          [theme.breakpoints.up('md')]: {
            fontSize: 20
          },
         },
        body1: { fontSize: 16, fontWeight:400, letterSpacing: '-0.02em', lineHeight: '140%',
          [theme.breakpoints.up('md')]: {
            fontSize: 18
          },
        },
        caption: { fontSize: 14, fontWeight:500, letterSpacing: '-0.02em'},
      },
      components: {
        MuiTypography: {
          styleOverrides: {
            root: {
              fontFamily:
                'Spoqa Han Sans Neo, Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
            },
          },
        },
        MuiButton: {
          styleOverrides: {
            root: {
              borderRadius: 999,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 4,
              fontSize: 18,
              fontWeight: 700,
              textAlign: 'center',
              lineHeight: 1,
              padding: '0 40px 0 35px'
            },
            sizeMedium: {
              height: 50,
            },
            sizeLarge: {
              height: 44,
              fontSize : 16,
              padding: '0 35px',
              minWidth: 'unset',
              [theme.breakpoints.up('md')]: {
                height: 56,
                minWidth:250,
                fontSize : 18
              },
            },
          },
        },
        MuiContainer: {
          styleOverrides: {
            root: {
              paddingInline: '1.25rem',
            },
          },
        },
      },
    });

    return theme;
  }, []);

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles
        styles={`

          
          @import url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap');

          @font-face {
            font-family: 'Spoqa Han Sans Neo';
            font-style: normal;
            font-weight: 250;
            src: url('/assets/fonts/SpoqaHanSansNeo-Thin.woff2') format('woff2'),
                 url('/assets/fonts/SpoqaHanSansNeo-Thin.woff') format('woff'),
                 url('/assets/fonts/SpoqaHanSansNeo-Thin.ttf') format('truetype');
          }

          @font-face {
            font-family: 'Spoqa Han Sans Neo';
            font-style: normal;
            font-weight: 300;
            src: url('/assets/fonts/SpoqaHanSansNeo-Light.woff2') format('woff2'),
                 url('/assets/fonts/SpoqaHanSansNeo-Light.woff') format('woff'),
                 url('/assets/fonts/SpoqaHanSansNeo-Light.ttf') format('truetype');
          }

          @font-face {
            font-family: 'Spoqa Han Sans Neo';
            font-style: normal;
            font-weight: 400;
            src: url('/assets/fonts/SpoqaHanSansNeo-Regular.woff2') format('woff2'),
                 url('/assets/fonts/SpoqaHanSansNeo-Regular.woff') format('woff'),
                 url('/assets/fonts/SpoqaHanSansNeo-Regular.ttf') format('truetype');
          }

          @font-face {
            font-family: 'Spoqa Han Sans Neo';
            font-style: normal;
            font-weight: 500;
            src: url('/assets/fonts/SpoqaHanSansNeo-Medium.woff2') format('woff2'),
                 url('/assets/fonts/SpoqaHanSansNeo-Medium.woff') format('woff'),
                 url('/assets/fonts/SpoqaHanSansNeo-Medium.ttf') format('truetype');
          }

          @font-face {
            font-family: 'Spoqa Han Sans Neo';
            font-style: normal;
            font-weight: 700;
            src: url('/assets/fonts/SpoqaHanSansNeo-Bold.woff2') format('woff2'),
                 url('/assets/fonts/SpoqaHanSansNeo-Bold.woff') format('woff'),
                 url('/assets/fonts/SpoqaHanSansNeo-Bold.ttf') format('truetype');
          }

          body {
            font-family: 'Spoqa Han Sans Neo', 'Inter', system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
            color: #222;
            font-size: 18px;
            font-style: normal;
            font-weight: 400;
            word-break: keep-all;
            accent-color: #2192FF;
            background: #fff;
          }

          @media screen and (min-width: 1280px){
            .mobile-only{
              display: none;
            }
          }
          @media screen and (max-width: 1280px){
            .desktop-only{
              display: none;
            }
          }

          :root{
            --grey-000: #fff;
            --grey-100: #F2F2F7;
            --grey-200: #DADEE6;
            --grey-300: #DADDE7;
            --grey-400: #C6C7D8;
            --grey-500: #9FA0AC;
            --grey-600: #555555;
            --grey-700: #4D546A;
            --grey-800: #222;
            --grey-900: #1D2033;
            --grey-1000: #020C1C;
          }
        `}
      />
      {children}
    </MuiThemeProvider>
  );
};
