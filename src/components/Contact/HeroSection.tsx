import {
  Box,
  Container,
  Typography,
  Grid,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import { useTheme as useCustomTheme } from '../../contexts/ThemeContext';

export const HeroSection = () => {
  const theme = useTheme();
  const { theme: customTheme } = useCustomTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const overlayStart = alpha('#07111B', 0.62);
  const overlayMid = alpha('#07111B', 0.46);
  const overlayEnd = alpha('#07111B', 0.3);
  const primaryGlow = alpha(customTheme.palette.primary.main, 0.16);
  const secondaryGlow = alpha(customTheme.palette.secondary.main, 0.12);

  return (
    <Box
      sx={{
        position: 'relative',
        backgroundImage: `
          linear-gradient(110deg, ${overlayStart} 10%, ${overlayMid} 50%, ${overlayEnd} 100%),
          radial-gradient(circle at top right, ${primaryGlow}, transparent 36%),
          radial-gradient(circle at bottom left, ${secondaryGlow}, transparent 34%),
          url('/images/contactHeroImage.jpg')
        `,
        minHeight: '70vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: 8,
        width: "100%",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        color: '#fff',
        textAlign: isMobile ? 'center' : 'left',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="center">
          <Grid size={{xs:12, md:8}}>
            <Box>
              <Typography 
                variant="h1"
                sx={{
                  fontWeight: 800,
                  fontSize: isMobile ? '2.6rem' : '3.8rem',
                  lineHeight: 1.2,
                  color: customTheme.palette.primary.main,
                  fontFamily: 'JUST Sans ExBold',
                }}
              >
                Contact Us
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  color: 'rgba(255,255,255,0.85)',
                  mt: 2,
                  maxWidth: '500px',
                  fontFamily: 'JUST Sans Regular',
                }}
              >
                Let’s connect and bring clean, renewable energy to your home or business.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
