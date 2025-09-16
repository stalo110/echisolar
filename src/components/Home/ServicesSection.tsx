// import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  Button,
  IconButton,
  Chip,
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


// Services Section Component
export const ServicesSection = () => {
  const services = [
    {
      icon: '💻',
      title: 'Website Design',
      description: 'Crafting visually stunning, user-friendly websites tailored to your brand\'s needs and objectives.'
    },
    {
      icon: '📈',
      title: 'Digital Marketing',
      description: 'Utilizing SEO, PPC, and content marketing strategies to drive traffic and increase conversions.'
    },
    {
      icon: '🎨',
      title: 'Brand Identity',
      description: 'Developing cohesive visual and strategic elements to create a distinct and memorable presence.'
    },
    {
      icon: '📱',
      title: 'App Development',
      description: 'Designing and developing user-friendly mobile and web applications with seamless performance.'
    },
    {
      icon: '✨',
      title: 'UI/UX Design',
      description: 'Designing intuitive user interfaces that enhance experiences across platforms.'
    },
    {
      icon: '🎥',
      title: 'Video Production',
      description: 'Creating dynamic, high-quality video content that captures your message and enhances your brand.'
    }
  ];

  return (
    <Box sx={{ py: 8, backgroundColor: 'background.default' }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Chip icon={<CircleIcon fontSize="small" />} label="Our Services" sx={{ mb: 2 }} />
          
          <Typography variant="h3" component="h2" gutterBottom sx={{ fontWeight: 700 }}>
            Innovating Your Brand Experience
          </Typography>
          
          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
            We create transformative solutions designed to elevate your brand, ensuring every service leaves a lasting impression.
          </Typography>
        </Box>
        
        <Grid container spacing={3}>
          {services.map((service, index) => (
            <Grid  size={{xs:12, sm:6, md:4}} key={index}>
              <Card 
                sx={{ 
                  height: '100%', 
                  textAlign: 'center',
                  p: 3,
                  borderRadius: 2,
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: 6
                  }
                }}
              >
                <Box sx={{ fontSize: '3rem', mb: 2 }}>
                  {service.icon}
                </Box>
                
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                  {service.title}
                </Typography>
                
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {service.description}
                </Typography>
                
                <Button 
                  variant="text" 
                  endIcon={<ChevronRightIcon />}
                  sx={{ color: 'primary.main' }}
                >
                  Learn More
                </Button>
              </Card>
            </Grid>
          ))}
        </Grid>
        
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 6, flexWrap: 'wrap', gap: 2 }}>
          <Button variant="contained" size="large" startIcon={<SendIcon />} sx={{ borderRadius: 2 , background:"#2E7D4D"}}>
            CONTACT US
          </Button>
          
          <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
            <IconButton color="primary" sx={{ mr: 1 }}>
              <PhoneIcon />
            </IconButton>
            <Box>
              <Typography variant="body1" fontWeight="bold">
                +234 701 809 0107
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Talk to an Expert
              </Typography>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

