import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
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
      default: mode === 'dark' ? '#0B0C10' : '#FFFFFF',
      paper: mode === 'dark' ? '#1F2833' : '#F8F9FA',
    },
    text: {
      primary: mode === 'dark' ? '#EAEAEA' : '#1A1A1A',
      secondary: mode === 'dark' ? 'rgba(234,234,234,0.7)' : 'rgba(26,26,26,0.7)',
    },
    divider: mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
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