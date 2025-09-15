// import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Button,
  Chip,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  CheckCircle as CheckCircleIcon,
  ArrowForward as ArrowForwardIcon,
  Phone as PhoneIcon,
  Send as SendIcon,
  ChevronRight as ChevronRightIcon,
  Lightbulb as LightbulbIcon,
  ThumbUp as ThumbUpIcon,
  Circle as CircleIcon,
  FormatQuote as QuoteIcon
} from '@mui/icons-material';

// Hero Section Component
export const HeroSection = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box
      sx={{
        position: 'relative',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        py: 8
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="center">
          <Grid  size={{xs:12, md:8}}>
            <Box sx={{ textAlign: isMobile ? 'center' : 'left' }}>
              <Box sx={{ mb: 2 }}>
                <Chip icon={<CircleIcon fontSize="small" />} label="Professional" sx={{ mr: 1, mb: 1 }} />
                <Chip icon={<CircleIcon fontSize="small" />} label="Dedicated" sx={{ mb: 1 }} />
              </Box>
              
              <Typography 
                variant="h1" 
                component="h1" 
                gutterBottom 
                sx={{ 
                  fontWeight: 700,
                  fontSize: isMobile ? '2.5rem' : '3.5rem',
                  lineHeight: 1.2
                }}
              >
                Creative <Box component="span" sx={{ 
                  background: 'linear-gradient(45deg, #FF6B6B 30%, #FF8E53 90%)',
                  backgroundClip: 'text',
                  textFillColor: 'transparent',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>Magic</Box> in the Digital Space
              </Typography>
              
              <Typography variant="h6" color="text.secondary" paragraph sx={{ mb: 3 }}>
                Transforming your brand with creative strategies, innovative digital solutions, and technology that drive impactful growth and elevate your presence.
              </Typography>
              
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: isMobile ? 'center' : 'flex-start' }}>
                <Button 
                  variant="contained" 
                  size="large" 
                  endIcon={<SendIcon />}
                  sx={{ borderRadius: 2, px: 4, py: 1 }}
                >
                  Get Started
                </Button>
                <Button 
                  variant="outlined" 
                  size="large" 
                  endIcon={<ChevronRightIcon />}
                  sx={{ borderRadius: 2, px: 4, py: 1 }}
                >
                  Our Academy
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
