import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import type { Theme } from '@mui/material/styles';

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

const createAppTheme = (mode: ThemeMode) => createTheme({
  palette: {
    mode,
    primary: {
      main: brandColors.amber,
      light: brandColors.amberLight,
      dark: '#e9b362',
    },
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
    borderRadius: 20,
  },
  typography: {
    fontFamily: 'JUST Sans Regular, Arial, sans-serif',
    h1: { fontFamily: 'JUST Sans ExBold, Arial, sans-serif' },
    h2: { fontFamily: 'JUST Sans ExBold, Arial, sans-serif' },
    h3: { fontFamily: 'JUST Sans ExBold, Arial, sans-serif' },
    h4: { fontFamily: 'JUST Sans ExBold, Arial, sans-serif' },
    h5: { fontFamily: 'JUST Sans ExBold, Arial, sans-serif' },
    h6: { fontFamily: 'JUST Sans ExBold, Arial, sans-serif' },
    button: { fontFamily: 'JUST Sans ExBold, Arial, sans-serif' },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontFamily: 'JUST Sans ExBold',
          fontWeight: 600,
          borderRadius: 999,
          letterSpacing: '0.01em',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 24,
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

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
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

  const theme = createAppTheme(mode);

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
