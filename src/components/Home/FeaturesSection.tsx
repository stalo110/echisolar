// // import React, { useState, useEffect } from 'react';
// import {
//   Box,
//   Container,
//   Typography,
//   Grid,
// } from '@mui/material';


// // Features Section Component
// export const FeaturesSection = () => {
//   const features = [
//     {
//       icon: '🏆',
//       title: 'Consistent Quality',
//       description: 'We pride ourselves on delivering high-quality results that consistently meet or exceed expectations, ensuring lasting impact.'
//     },
//     {
//       icon: '👥',
//       title: 'Professional Team',
//       description: 'Our team is made up of experienced professionals who bring expertise and attention to detail to every project.'
//     },
//     {
//       icon: '🔧',
//       title: 'Tailored Solutions',
//       description: 'We offer customized solutions, carefully designed to meet the unique needs of your business and help you achieve your goals.'
//     }
//   ];

//   return (
//     <Box sx={{ py: 8, backgroundColor: '#121212' }}>
//       <Container maxWidth="lg">
//         <Grid container spacing={4}>
//           {features.map((feature, index) => (
//             <Grid size={{xs:12, md:4}} key={index}>
//               <Box sx={{ textAlign: 'center', p: 3 }}>
//                 <Box sx={{ 
//                   fontSize: '3rem', 
//                   mb: 2,
//                   animation: 'pulse 2s infinite',
//                   '@keyframes pulse': {
//                     '0%': { transform: 'scale(1)' },
//                     '50%': { transform: 'scale(1.1)' },
//                     '100%': { transform: 'scale(1)' }
//                   }
//                 }}>
//                   {feature.icon}
//                 </Box>
//                 <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, color: 'white' }}>
//                   {feature.title}
//                 </Typography>
//                 <Typography variant="body1" sx={{ color: 'white' }}>
//                   {feature.description}
//                 </Typography>
//               </Box>
//             </Grid>
//           ))}
//         </Grid>
//       </Container>
//     </Box>
//   );
// };

import { Box, Container, Typography, Grid } from "@mui/material";
import { alpha } from "@mui/material/styles";
import {
  Groups2Outlined,
  TuneOutlined,
  WorkspacePremiumOutlined,
} from "@mui/icons-material";
import { useTheme } from "../../contexts/ThemeContext";

export const FeaturesSection = () => {
  const { theme, mode } = useTheme();
  const features = [
    {
      icon: <WorkspacePremiumOutlined />,
      title: "Consistent Quality",
      desc: "We deliver high-quality results that consistently meet expectations.",
    },
    {
      icon: <Groups2Outlined />,
      title: "Professional Team",
      desc: "Experienced professionals who bring expertise and care.",
    },
    {
      icon: <TuneOutlined />,
      title: "Tailored Solutions",
      desc: "Customized solutions designed to meet your unique needs.",
    },
  ];

  return (
    <Box sx={{ 
      py: 10, 
      background: "transparent",
      position: "relative",
      overflow: "hidden"
    }}>
      <Box sx={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        opacity: mode === "dark" ? 0.14 : 0.22,
        backgroundImage: `
          linear-gradient(${alpha(theme.palette.divider, 0.38)} 1px, transparent 1px),
          linear-gradient(90deg, ${alpha(theme.palette.divider, 0.38)} 1px, transparent 1px)
        `,
        backgroundSize: "88px 88px",
      }} />
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {features.map((f, i) => (
            <Grid size={{ xs: 12, md: 4 }} key={i}>
              <Box sx={{
                textAlign: "center",
                p: 4,
                height: "100%",
                borderRadius: 4,
                border: `1px solid ${theme.palette.divider}`,
                background: mode === "dark" ? alpha("#10202A", 0.74) : alpha("#FFFFFF", 0.8),
                boxShadow: mode === "dark" ? "0 20px 48px rgba(3,10,18,0.22)" : "0 18px 46px rgba(15,23,42,0.08)",
                transition: "transform .3s ease, box-shadow .3s ease, border-color .3s ease",
                "&:hover": {
                  transform: "translateY(-8px)",
                  borderColor: alpha(theme.palette.secondary.main, 0.26),
                  boxShadow: mode === "dark" ? "0 24px 54px rgba(3,10,18,0.3)" : "0 22px 52px rgba(15,23,42,0.12)",
                },
              }}>
                <Box
                  sx={{
                    width: 64,
                    height: 64,
                    mx: "auto",
                    mb: 2,
                    borderRadius: 3,
                    display: "grid",
                    placeItems: "center",
                    fontSize: 34,
                    color: theme.palette.primary.main,
                    background: alpha(theme.palette.primary.main, 0.12),
                    border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                  }}
                >
                  {f.icon}
                </Box>
                <Typography variant="h5" sx={{ fontWeight: 700, color: theme.palette.text.primary, fontFamily: "JUST Sans ExBold", fontSize: "1.35rem" }}>
                  {f.title}
                </Typography>
                <Typography sx={{ color: theme.palette.text.secondary, mt: 1, fontFamily: "JUST Sans Regular", lineHeight: 1.8 }}>
                  {f.desc}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};
