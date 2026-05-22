import { createContext, useContext, useState, useEffect, useMemo } from 'react';
import type { ReactNode } from 'react';
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import type { Theme } from '@mui/material/styles';
import { useLocation } from 'react-router-dom';

type ThemeMode = 'light' | 'dark';

interface ThemeContextType {
  mode: ThemeMode;
  toggleTheme: () => void;
  theme: Theme;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const brandColors = {
  amber: '#FFAB46',
  green: '#2E7D4D',
  amberLight: '#FFD18A',
  greenLight: '#36a15f',
};

const createAppTheme = (mode: ThemeMode, pathname: string) => {
  const isAdminLightMode = mode === 'light' && pathname.startsWith('/admin');
  const primaryPalette = isAdminLightMode
    ? {
        main: brandColors.green,
        light: brandColors.greenLight,
        dark: '#245c41',
      }
    : {
        main: brandColors.amber,
        light: brandColors.amberLight,
        dark: '#e9b362',
      };

  return createTheme({
  palette: {
    mode,
    primary: primaryPalette,
    secondary: {
      main: brandColors.green,
      light: brandColors.greenLight,
      dark: '#245c41',
    },
    background: {
      default: mode === 'dark' ? '#07111B' : '#F5F8F7',
      paper: mode === 'dark' ? '#10202A' : '#FFFFFF',
    },
    text: {
      primary: mode === 'dark' ? '#F4F7F8' : '#10202A',
      secondary: mode === 'dark' ? 'rgba(244,247,248,0.72)' : 'rgba(16,32,42,0.68)',
    },
    divider: mode === 'dark' ? 'rgba(148,163,184,0.16)' : 'rgba(15,23,42,0.08)',
  },
  shape: {
    borderRadius: 2.5,
  },
  typography: {
    fontFamily: 'JUST Sans Regular, Arial, sans-serif',
    fontWeightLight: 400,
    fontWeightRegular: 400,
    fontWeightMedium: 600,
    fontWeightBold: 600,
    h1: { fontFamily: 'JUST Sans ExBold, Arial, sans-serif', fontWeight: 600 },
    h2: { fontFamily: 'JUST Sans ExBold, Arial, sans-serif', fontWeight: 600 },
    h3: { fontFamily: 'JUST Sans ExBold, Arial, sans-serif', fontWeight: 600 },
    h4: { fontFamily: 'JUST Sans ExBold, Arial, sans-serif', fontWeight: 600 },
    h5: { fontFamily: 'JUST Sans ExBold, Arial, sans-serif', fontWeight: 600 },
    h6: { fontFamily: 'JUST Sans ExBold, Arial, sans-serif', fontWeight: 600 },
    body1: { fontFamily: 'JUST Sans Regular, Arial, sans-serif', fontWeight: 400 },
    body2: { fontFamily: 'JUST Sans Regular, Arial, sans-serif', fontWeight: 400 },
    subtitle1: { fontFamily: 'JUST Sans ExBold, Arial, sans-serif', fontWeight: 600 },
    subtitle2: { fontFamily: 'JUST Sans ExBold, Arial, sans-serif', fontWeight: 600 },
    button: { fontFamily: 'JUST Sans Regular, Arial, sans-serif', fontWeight: 400 },
    caption: { fontFamily: 'JUST Sans Regular, Arial, sans-serif', fontWeight: 400 },
    overline: { fontFamily: 'JUST Sans ExBold, Arial, sans-serif', fontWeight: 600 },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        "html, body, #root": {
          fontFamily: 'JUST Sans Regular, Arial, sans-serif',
        },
        "body, body *": {
          fontFamily: 'JUST Sans Regular, Arial, sans-serif',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontFamily: 'JUST Sans Regular',
          fontWeight: 400,
          borderRadius: 999,
          letterSpacing: '0.01em',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          fontFamily: 'JUST Sans Regular, Arial, sans-serif',
          "&.MuiTypography-h1, &.MuiTypography-h2, &.MuiTypography-h3, &.MuiTypography-h4, &.MuiTypography-h5, &.MuiTypography-h6, &.MuiTypography-subtitle1, &.MuiTypography-subtitle2, &.MuiTypography-overline": {
            fontFamily: 'JUST Sans ExBold, Arial, sans-serif',
            fontWeight: 600,
          },
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          fontFamily: 'JUST Sans Regular, Arial, sans-serif',
        },
        input: {
          fontFamily: 'JUST Sans Regular, Arial, sans-serif',
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          fontFamily: 'JUST Sans Regular, Arial, sans-serif',
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontFamily: 'JUST Sans Regular, Arial, sans-serif',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          fontFamily: 'JUST Sans Regular, Arial, sans-serif',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
  },
  });
};

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const [mode, setMode] = useState<ThemeMode>('dark');

  useEffect(() => {
    const savedMode = localStorage.getItem('theme-mode') as ThemeMode;
    if (savedMode) setMode(savedMode);
  }, []);

  const toggleTheme = () => {
    const newMode = mode === 'light' ? 'dark' : 'light';
    setMode(newMode);
    localStorage.setItem('theme-mode', newMode);
  };

  const theme = useMemo(() => createAppTheme(mode, location.pathname), [mode, location.pathname]);

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme, theme }}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
};
