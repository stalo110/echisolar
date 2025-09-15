// import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
} from '@mui/material';


// Features Section Component
export const FeaturesSection = () => {
  const features = [
    {
      icon: '🏆',
      title: 'Consistent Quality',
      description: 'We pride ourselves on delivering high-quality results that consistently meet or exceed expectations, ensuring lasting impact.'
    },
    {
      icon: '👥',
      title: 'Professional Team',
      description: 'Our team is made up of experienced professionals who bring expertise and attention to detail to every project.'
    },
    {
      icon: '🔧',
      title: 'Tailored Solutions',
      description: 'We offer customized solutions, carefully designed to meet the unique needs of your business and help you achieve your goals.'
    }
  ];

  return (
    <Box sx={{ py: 8, backgroundColor: 'background.paper' }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid size={{xs:12, md:4}} key={index}>
              <Box sx={{ textAlign: 'center', p: 3 }}>
                <Box sx={{ 
                  fontSize: '3rem', 
                  mb: 2,
                  animation: 'pulse 2s infinite',
                  '@keyframes pulse': {
                    '0%': { transform: 'scale(1)' },
                    '50%': { transform: 'scale(1.1)' },
                    '100%': { transform: 'scale(1)' }
                  }
                }}>
                  {feature.icon}
                </Box>
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                  {feature.title}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {feature.description}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};
