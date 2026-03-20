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
import { Box, Container, Typography, Grid, Card, CardContent, Button } from "@mui/material";
import { alpha } from "@mui/material/styles";
import { SolarPower as SolarPowerIcon, EmojiObjects as EmojiObjectsIcon } from "@mui/icons-material";
import { useTheme } from "../../contexts/ThemeContext";
import { Link } from "react-router-dom";

type AboutSectionProps = {
  showButton?: boolean;
};

export const AboutSection = ({ showButton = true }: AboutSectionProps) => {
  const { theme, mode } = useTheme();
  
  return (
    <Box sx={{ 
      py: 10, 
      background: "transparent",
      position: "relative",
      overflow: "hidden"
    }}>
      <Container maxWidth="lg">
        <Grid container spacing={6} alignItems="center">
          <Grid size={{xs:12, md:6}}>
            <Typography
              variant="h6"
              sx={{
                color: theme.palette.primary.main,
                fontWeight: 700,
                fontFamily: "JUST Sans ExBold",
                textTransform: "uppercase",
                letterSpacing: 2,
                fontSize: { xs: "0.82rem", md: "1.05rem" },
                mb: 2,
              }}
            >
              About EchiSolar
            </Typography>
            <Typography variant="h2" sx={{ fontWeight: 700, color: theme.palette.text.primary, fontFamily: "JUST Sans ExBold", fontSize: { xs: "1.95rem", md: "3.05rem" }, lineHeight: 1.08 }}>
              Leading solar solutions for Nigeria
            </Typography>
            <Typography sx={{ color: theme.palette.text.secondary, mt: 2, fontFamily: "JUST Sans Regular", lineHeight: 1.8 }}>
              At EchiSolar, we're committed to powering Nigeria's future with clean, affordable, and reliable solar energy solutions. Our expert team designs, installs, and maintains solar systems that help homes and businesses become energy independent.
            </Typography>

            <Box sx={{ my: 4 }}>
              <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
                <SolarPowerIcon sx={{ color: theme.palette.secondary.main, mt: 0.5 }} />
                <Box>
                  <Typography sx={{ fontWeight: 700, color: theme.palette.text.primary, fontFamily: "JUST Sans ExBold" }}>End-to-End Solar Solutions</Typography>
                  <Typography sx={{ color: theme.palette.text.secondary, fontFamily: "JUST Sans Regular", lineHeight: 1.8 }}>From consultation to installation and maintenance, we provide comprehensive solar services tailored to your needs.</Typography>
                </Box>
              </Box>

              <Box sx={{ display: "flex", gap: 2 }}>
                <EmojiObjectsIcon sx={{ color: theme.palette.primary.main, mt: 0.5 }} />
                <Box>
                  <Typography sx={{ fontWeight: 700, color: theme.palette.text.primary, fontFamily: "JUST Sans ExBold" }}>Sustainable Energy Future</Typography>
                  <Typography sx={{ color: theme.palette.text.secondary, fontFamily: "JUST Sans Regular", lineHeight: 1.8 }}>We're dedicated to promoting renewable energy adoption and reducing carbon footprints across Nigeria.</Typography>
                </Box>
              </Box>
            </Box>

            {showButton && (
              <Button
                component={Link}
                to="/about"
                variant="outlined"
                sx={{
                  color: theme.palette.text.primary,
                  borderColor: theme.palette.divider,
                  borderRadius: 999,
                  px: 3,
                  fontFamily: "JUST Sans ExBold",
                }}
              >
                More About Us
              </Button>
            )}
          </Grid>

          <Grid size={{xs:12, md:6}}>
            <Box sx={{ position: "relative", p: { md: 1 } }}>
              <Box
                sx={{
                  p: 1.2,
                  borderRadius: 5,
                  border: `1px solid ${theme.palette.divider}`,
                  background: mode === "dark" ? alpha("#10202A", 0.74) : alpha("#FFFFFF", 0.82),
                  boxShadow: mode === "dark" ? "0 24px 58px rgba(3,10,18,0.28)" : "0 20px 52px rgba(15,23,42,0.1)",
                }}
              >
                <Box
                  component="img"
                  src="/images/aboutImage.png"
                  alt="Professional solar installation"
                  sx={{
                    width: "100%",
                    height: { xs: 280, md: 420 },
                    objectFit: "cover",
                    objectPosition: "center",
                    borderRadius: 4,
                    display: "block",
                  }}
                />
              </Box>
              <Card sx={{ position: "absolute", bottom: -10, right: -10, borderRadius: 4, background: `linear-gradient(90deg,${theme.palette.secondary.main},${theme.palette.secondary.light})`, color: "#fff", boxShadow: `0 18px 42px ${alpha(theme.palette.secondary.main, 0.28)}` }}>
                <CardContent sx={{ p: 2, textAlign: "center", minWidth: 140 }}>
                  <Typography variant="h4" sx={{ fontWeight: 700, fontFamily: "JUST Sans ExBold" }}>500+</Typography>
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
