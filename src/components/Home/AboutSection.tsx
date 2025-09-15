// import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
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

// About Section Component
export const AboutSection = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box sx={{ py: 8 }}>
      <Container maxWidth="lg">
        <Grid container spacing={6} alignItems="center">
          <Grid   size={{xs:12, md:6}}>
            <Chip icon={<CircleIcon fontSize="small" />} label="About Us" sx={{ mb: 2 }} />
            
            <Typography variant="h3" component="h2" gutterBottom sx={{ fontWeight: 700 }}>
              Crafting Digital Magic, One Pixel at a Time
            </Typography>
            
            <Typography variant="body1" color="text.secondary" paragraph>
              At Pruta Media, we don't just build websites or run ads—we create experiences that captivate, engage, and convert. 
              Our team of digital artisans thrives on transforming ordinary concepts into extraordinary solutions.
            </Typography>
            
            <Box sx={{ my: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 3 }}>
                <LightbulbIcon color="primary" sx={{ mr: 2, mt: 0.5 }} />
                <Box>
                  <Typography variant="h6" gutterBottom>
                    End-to-End Expertise
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    From concept to execution, we provide comprehensive services that cover all aspects of your digital needs.
                  </Typography>
                </Box>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                <ThumbUpIcon color="primary" sx={{ mr: 2, mt: 0.5 }} />
                <Box>
                  <Typography variant="h6" gutterBottom>
                    Results-Driven Approach
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Focused on measurable outcomes, we ensure our solutions bring tangible results for your business success.
                  </Typography>
                </Box>
              </Box>
            </Box>
            
            <Button variant="outlined" endIcon={<ChevronRightIcon />} sx={{ borderRadius: 2 }}>
              More About Us
            </Button>
          </Grid>
          
          <Grid   size={{xs:12, md:6}}>
            <Box sx={{ 
              position: 'relative',
              '&:after': {
                content: '""',
                position: 'absolute',
                width: '80%',
                height: '80%',
                background: 'linear-gradient(45deg, #FF6B6B 30%, #FF8E53 90%)',
                bottom: -16,
                right: -16,
                borderRadius: 2,
                zIndex: -1
              }
            }}>
              <Box 
                component="img"
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
                alt="Team meeting" 
                sx={{ 
                  width: '100%', 
                  borderRadius: 2,
                  boxShadow: 3,
                  display: 'block'
                }} 
              />
              
              <Card sx={{ 
                position: 'absolute', 
                bottom: -20, 
                right: -20, 
                borderRadius: 2,
                boxShadow: 3
              }}>
                <CardContent sx={{ textAlign: 'center', p: 2 }}>
                  <Typography variant="h4" color="primary" fontWeight="bold">
                    200+
                  </Typography>
                  <Typography variant="body2">
                    Happy Clients
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
