import {
  Box,
  Container,
  Typography,
  Grid,
  useMediaQuery,
  useTheme
} from '@mui/material';

export const HeroSection = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box
      sx={{
        position: 'relative',
        backgroundImage: `
          linear-gradient(rgba(10, 10, 10, 0.85), rgba(10, 10, 10, 0.85)), 
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
                  background: 'linear-gradient(90deg, #FFAB46, #e7922bff)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  textShadow: '0 4px 15px rgba(0, 188, 212, 0.2)',
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
