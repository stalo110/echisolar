// import {
//   Box,
//   Container,
//   Typography,
//   Grid,
//   useMediaQuery
// } from '@mui/material';

// export const HeroSection = () => {
//   const isMobile = useMediaQuery((theme) => theme.breakpoints.down('md'));

//   return (
//     <Box
//       sx={{
//         position: 'relative',
//         backgroundImage: `
//           linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), 
//           url('/images/AboutHeroImage.jpg')
//         `,
//         minHeight: '70vh',
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//         overflow: 'hidden',
//         py: 8,
//         marginTop: '0px',
//         width: "100%",
//         backgroundSize: 'cover',
//         backgroundPosition: 'center',
//         backgroundAttachment: 'fixed',
//         color: '#fff',
//       }}
//     >
//       <Container maxWidth="lg">
//         <Grid container spacing={4} alignItems="center">
//           <Grid size={{xs:12, md:8}}>
//             <Box sx={{ textAlign: isMobile ? 'center' : 'left' }}>        
//               <Typography 
//                 variant="h1" 
//                 component="h1" 
//                 gutterBottom 
//                 sx={{ 
//                   fontWeight: 700,
//                   fontSize: isMobile ? '2.5rem' : '3.5rem',
//                   lineHeight: 1.2,
//                   textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
//                 }}
//               >
//                 About Us
//               </Typography>

//             </Box>
//           </Grid>
//         </Grid>
//       </Container>
//     </Box>
//   );
// };

import {
  Box,
  Container,
  Typography,
  Grid,
  useMediaQuery
} from "@mui/material";

export const HeroSection = () => {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("md"));

  return (
    <Box
      sx={{
        position: "relative",
        backgroundImage: `
          linear-gradient(180deg, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.9) 100%),
          url('/images/AboutHeroImage.jpg')
        `,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        color: "#fff",
        minHeight: "75vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: isMobile ? "center" : "left",
        overflow: "hidden",
        px: 3,
        py: 10,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography
              variant="h1"
              sx={{
                fontSize: isMobile ? "2.5rem" : "3.8rem",
                fontWeight: 800,
                lineHeight: 1.2,
                background: "linear-gradient(90deg, #FFAB46, #FFD18A)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                textShadow: "0 0 15px rgba(255,171,70,0.4)",
                fontFamily: "JUST Sans ExBold",
              }}
            >
              About Echi Solar
            </Typography>

            <Typography
              variant="h6"
              sx={{
                mt: 2,
                color: "rgba(255,255,255,0.8)",
                maxWidth: 600,
                lineHeight: 1.6,
                fontFamily: "JUST Sans Regular",
              }}
            >
              Empowering communities with sustainable energy and driving Nigeria’s clean energy future.
            </Typography>
          </Grid>
        </Grid>
      </Container>

      {/* Decorative Glow Overlay */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background:
            "radial-gradient(circle at 20% 80%, rgba(46,125,77,0.25), transparent 70%)",
          pointerEvents: "none",
        }}
      />
    </Box>
  );
};
