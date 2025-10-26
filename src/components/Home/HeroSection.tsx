// import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Button,
  useMediaQuery
} from '@mui/material';
import { ChevronRight as ChevronRightIcon, Send as SendIcon } from '@mui/icons-material';

// Hero Section Component
export const HeroSection = () => {
  const isMobile = useMediaQuery((theme:any) => theme.breakpoints.down('md'));

  return (
   <Box
  sx={{
    position: 'relative',
    backgroundImage: `
      linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), 
      url('/images/heroImage.jpg')
    `,
    minHeight: '100vh',
    height: "100px",
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    py: 8,
    marginTop: '0px',
    width: "100%",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    color: '#fff', // ensures text on top is visible
  }}
>
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="center">
          <Grid  size={{xs:12, md:8}}>
            <Box sx={{ textAlign: isMobile ? 'center' : 'left' }}>        
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
                Powering a <Box component="span" sx={{ 
                  color: '#FFAB46',
                }}>Brighter Future</Box> with Solar Energy
              </Typography>

              <Typography variant="h6" color="text.light" paragraph sx={{ mb: 3 }}>
                Delivering reliable solar solutions that reduce costs, promote sustainability, and harness the power of the sun to energize homes, businesses, and communities.
              </Typography>

              
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: isMobile ? 'center' : 'flex-start' }}>
                <Button 
                  variant="contained" 
                  size="large" 
                  endIcon={<SendIcon />}
                  sx={{ borderRadius: 2, px: 4, py: 1, background:"#2E7D4D" }}
                >
                  Get Started
                </Button>
                <Button 
                  variant="contained"
                  size="large" 
                  endIcon={<ChevronRightIcon />}
                  sx={{ borderRadius: 2, px: 4, py: 1, background:"#FFAB46" }}
                >
                  Our Products
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
