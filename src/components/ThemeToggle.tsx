import { IconButton } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { useTheme } from '../contexts/ThemeContext';

export const ThemeToggle = () => {
  const { mode, toggleTheme, theme } = useTheme();

  return (
    <IconButton
      onClick={toggleTheme}
      sx={{
        color: theme.palette.text.primary,
        '&:hover': { 
          color: theme.palette.primary.main,
          backgroundColor: mode === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'
        },
      }}
    >
      {mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
    </IconButton>
  );
};