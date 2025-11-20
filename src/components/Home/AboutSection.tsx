// import {
//   Box,
//   Container,
//   Typography,
//   Grid,
//   Card,
//   CardContent,
//   Button,
//   Chip,
// } from '@mui/material';
// import { ChevronRight as ChevronRightIcon, SolarPower as SolarPowerIcon, EmojiObjects as EmojiObjectsIcon } from '@mui/icons-material';

// export const AboutSection = () => {
//   return (
//     <Box sx={{ py: 8 }}>
//       <Container maxWidth="lg">
//         <Grid container spacing={6} alignItems="center">
//           <Grid size={{xs:12, md:6}}>
//             <Chip icon={<SolarPowerIcon fontSize="small" />} label="About EchiSolar" sx={{ mb: 2 }} />
            
//             <Typography variant="h3" component="h2" gutterBottom sx={{ fontWeight: 700 }}>
//               Leading Solar Solutions for Nigeria
//             </Typography>
            
//             <Typography variant="body1" paragraph sx={{ color: 'white' }}>
//               At EchiSolar, we're committed to powering Nigeria's future with clean, affordable, and reliable solar energy solutions. 
//               Our expert team designs, installs, and maintains solar systems that help homes and businesses become energy independent.
//             </Typography>
            
//             <Box sx={{ my: 4 }}>
//               <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 3 }}>
//                 <SolarPowerIcon color="primary" sx={{ mr: 2, mt: 0.5 }} />
//                 <Box>
//                   <Typography variant="h6" gutterBottom sx={{ color: 'white' }}>
//                     End-to-End Solar Solutions
//                   </Typography>
//                   <Typography variant="body2" sx={{ color: 'white' }}>
//                     From consultation to installation and maintenance, we provide comprehensive solar services tailored to your needs.
//                   </Typography>
//                 </Box>
//               </Box>
              
//               <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
//                 <EmojiObjectsIcon color="primary" sx={{ mr: 2, mt: 0.5 }} />
//                 <Box>
//                   <Typography variant="h6" gutterBottom sx={{ color: 'white' }}>
//                     Sustainable Energy Future
//                   </Typography>
//                   <Typography variant="body2" sx={{ color: 'white' }}>
//                     We're dedicated to promoting renewable energy adoption and reducing carbon footprints across Nigeria.
//                   </Typography>
//                 </Box>
//               </Box>
//             </Box>
            
//             <Button variant="outlined" endIcon={<ChevronRightIcon />} sx={{ borderRadius: 2, color: 'white', borderColor: 'white' }}>
//               More About Us
//             </Button>
//           </Grid>
          
//           <Grid size={{xs:12, md:6}}>
//             <Box sx={{ 
//               position: 'relative',
//               '&:after': {
//                 content: '""',
//                 position: 'absolute',
//                 width: '80%',
//                 height: '80%',
//                 background: 'linear-gradient(45deg, #2E7D4D 30%, #FFAB46 90%)',
//                 bottom: -16,
//                 right: -16,
//                 borderRadius: 2,
//                 zIndex: -1
//               }
//             }}>
//               <Box 
//                 component="img"
//                 src="/images/solar2.jpg"
//                 alt="Solar Installation" 
//                 sx={{ 
//                   width: '100%', 
//                   borderRadius: 2,
//                   boxShadow: 3,
//                   display: 'block'
//                 }} 
//               />
              
//               <Card sx={{ 
//                 position: 'absolute', 
//                 bottom: -20, 
//                 right: -20, 
//                 borderRadius: 2,
//                 boxShadow: 3,
//                 backgroundColor: '#2E7D4D',
//                 color: 'white'
//               }}>
//                 <CardContent sx={{ textAlign: 'center', p: 2 }}>
//                   <Typography variant="h4" fontWeight="bold">
//                     500+
//                   </Typography>
//                   <Typography variant="body2">
//                     Solar Installations
//                   </Typography>
//                 </CardContent>
//               </Card>
//             </Box>
//           </Grid>
//         </Grid>
//       </Container>
//     </Box>
//   );
// };



import { Box, Container, Typography, Grid, Card, CardContent, Button, Chip } from "@mui/material";
import { ChevronRight as ChevronRightIcon, SolarPower as SolarPowerIcon, EmojiObjects as EmojiObjectsIcon } from "@mui/icons-material";
import { FaSun, FaBolt } from "react-icons/fa";
import { useTheme } from "../../contexts/ThemeContext";
import { Link } from "react-router-dom";

export const AboutSection = () => {
  const { theme, mode } = useTheme();
  
  return (
    <Box sx={{ 
      py: 10, 
      background: mode === 'dark' ? "#0b0b0b" : theme.palette.background.paper,
      position: "relative",
      overflow: "hidden"
    }}>
      {/* Animated background elements */}
      <Box sx={{
        position: "absolute",
        top: 50,
        left: -50,
        fontSize: 200,
        opacity: 0.05,
        color: theme.palette.primary.main,
        animation: "rotate 20s linear infinite",
        "@keyframes rotate": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" }
        }
      }}>
        <FaSun />
      </Box>
      
      <Box sx={{
        position: "absolute",
        bottom: 100,
        right: -30,
        fontSize: 150,
        opacity: 0.08,
        color: theme.palette.secondary.main,
        animation: "bounce 4s ease-in-out infinite",
        "@keyframes bounce": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" }
        }
      }}>
        <FaBolt />
      </Box>
      <Container maxWidth="lg">
        <Grid container spacing={6} alignItems="center">
          <Grid size={{xs:12, md:6}}>
            <Chip icon={<SolarPowerIcon />} label="About EchiSolar" sx={{ mb: 2, background: `${theme.palette.primary.main}15`, color: theme.palette.primary.main, fontWeight: 700 }} />
            <Typography variant="h2" sx={{ fontWeight: 800, color: theme.palette.text.primary, fontFamily: "JUST Sans ExBold", fontSize: { xs: "1.8rem", md: "3.75rem" } }}>Leading Solar Solutions for Nigeria</Typography>
            <Typography sx={{ color: theme.palette.text.secondary, mt: 2, fontFamily: "JUST Sans Regular" }}>
              At EchiSolar, we're committed to powering Nigeria's future with clean, affordable, and reliable solar energy solutions. Our expert team designs, installs, and maintains solar systems that help homes and businesses become energy independent.
            </Typography>

            <Box sx={{ my: 4 }}>
              <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
                <SolarPowerIcon sx={{ color: theme.palette.secondary.main, mt: 0.5 }} />
                <Box>
                  <Typography sx={{ fontWeight: 800, color: theme.palette.text.primary, fontFamily: "JUST Sans ExBold" }}>End-to-End Solar Solutions</Typography>
                  <Typography sx={{ color: theme.palette.text.secondary, fontFamily: "JUST Sans Regular" }}>From consultation to installation and maintenance, we provide comprehensive solar services tailored to your needs.</Typography>
                </Box>
              </Box>

              <Box sx={{ display: "flex", gap: 2 }}>
                <EmojiObjectsIcon sx={{ color: theme.palette.primary.main, mt: 0.5 }} />
                <Box>
                  <Typography sx={{ fontWeight: 800, color: theme.palette.text.primary, fontFamily: "JUST Sans ExBold" }}>Sustainable Energy Future</Typography>
                  <Typography sx={{ color: theme.palette.text.secondary, fontFamily: "JUST Sans Regular" }}>We're dedicated to promoting renewable energy adoption and reducing carbon footprints across Nigeria.</Typography>
                </Box>
              </Box>
            </Box>

            <Button component={Link} to="/about" variant="outlined" endIcon={<ChevronRightIcon />} sx={{ color: theme.palette.text.primary, borderColor: theme.palette.divider, borderRadius: 2, fontFamily: "JUST Sans ExBold" }}>
              More About Us
            </Button>
          </Grid>

          <Grid size={{xs:12, md:6}}>
            <Box sx={{ position: "relative" }}>
              <Box component="img" src="/images/solar2.jpg" alt="Solar Installation" sx={{ width: "100%", borderRadius: 2, boxShadow: "0 18px 40px rgba(0,0,0,0.6)" }} />
              <Card sx={{ position: "absolute", bottom: -18, right: -18, borderRadius: 2, background: `linear-gradient(90deg,${theme.palette.secondary.main},${theme.palette.secondary.light})`, color: "#fff", boxShadow: `0 10px 30px ${theme.palette.secondary.main}33` }}>
                <CardContent sx={{ p: 2, textAlign: "center", minWidth: 140 }}>
                  <Typography variant="h4" sx={{ fontWeight: 800, fontFamily: "JUST Sans ExBold" }}>500+</Typography>
                  <Typography variant="body2" sx={{ fontFamily: "JUST Sans Regular" }}>Solar Installations</Typography>
                </CardContent>
              </Card>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
