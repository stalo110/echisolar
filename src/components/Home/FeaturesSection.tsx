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

export const FeaturesSection = () => {
  const features = [
    { icon: "🏆", title: "Consistent Quality", desc: "We deliver high-quality results that consistently meet expectations." },
    { icon: "👥", title: "Professional Team", desc: "Experienced professionals who bring expertise and care." },
    { icon: "🔧", title: "Tailored Solutions", desc: "Customized solutions designed to meet your unique needs." },
  ];

  return (
    <Box sx={{ py: 10, background: "#070707" }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {features.map((f, i) => (
            <Grid size={{ xs: 12, md: 4 }} key={i}>
              <Box sx={{
                textAlign: "center",
                p: 4,
                borderRadius: 2,
                background: "linear-gradient(180deg,#0f0f0f,#131313)",
                transition: "transform .4s ease, box-shadow .4s ease",
                "&:hover": { transform: "translateY(-8px)", boxShadow: "0 20px 60px rgba(0,0,0,0.6)" }
              }}>
                <Box sx={{ fontSize: 48, mb: 2, animation: "pulse 2.6s infinite", color: "#FFAB46" }}>
                  {f.icon}
                </Box>
                <Typography variant="h5" sx={{ fontWeight: 800, color: "#EAEAEA" }}>{f.title}</Typography>
                <Typography sx={{ color: "rgba(234,234,234,0.78)", mt: 1 }}>{f.desc}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};
