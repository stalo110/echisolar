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
      icon: <LightbulbIcon fontSize="large" color="primary" />, 
      title: 'Solar System Design',
      description: 'Custom PV system design, site assessments and shading analysis to maximize energy yield.'
    },
    {
      icon: <CheckCircleIcon fontSize="large" color="primary" />,
      title: 'Installation & Commissioning',
      description: 'Professional on-site installation of solar panels, inverters and balance-of-system components.'
    },
    {
      icon: <ThumbUpIcon fontSize="large" color="primary" />,
      title: 'Maintenance & Support',
      description: 'Preventive maintenance, system checks, and rapid troubleshooting to keep systems performing.'
    },
    {
      icon: <QuoteIcon fontSize="large" color="primary" />,
      title: 'Battery & Energy Storage',
      description: 'Lithium and lead-acid battery options, storage sizing and integration with solar systems.'
    },
    {
      icon: <ChevronRightIcon fontSize="large" color="primary" />,
      title: 'Inverters & Components',
      description: 'Supply and installation of high-quality inverters, charge controllers and mounting systems.'
    },
    {
      icon: <PhoneIcon fontSize="large" color="primary" />,
      title: 'Financing & Installment Plans',
      description: 'Flexible payment options including installment plans and financing partnerships for homeowners and businesses.'
    }
  ];

  return (
    <Box sx={{ py: 8, backgroundColor: 'background.default' }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="overline" sx={{ color: 'primary.main', fontWeight: 700 }}>Our Services</Typography>
          <Typography variant="h3" component="h2" gutterBottom sx={{ fontWeight: 700 }}>
            Clean, reliable solar solutions
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 700, mx: 'auto' }}>
            We design, install and maintain solar energy systems for homes and businesses, backed by monitoring and flexible payment options.
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {services.map((service, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
              <Card sx={{ height: '100%', p: 3, borderRadius: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                  {service.icon}
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>{service.title}</Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">{service.description}</Typography>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 6, gap: 2, flexWrap: 'wrap' }}>
          <Button variant="contained" size="large" startIcon={<SendIcon />} sx={{ borderRadius: 2 , background: "#2E7D4D" }}>
            Contact Sales
          </Button>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton color="primary" sx={{ mr: 1 }}>
              <PhoneIcon />
            </IconButton>
            <Box>
              <Typography variant="body1" fontWeight="bold">+234 701 809 0107</Typography>
              <Typography variant="body2" color="text.secondary">Talk to an Expert</Typography>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

