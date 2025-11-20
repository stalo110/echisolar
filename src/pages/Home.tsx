// import { Box } from "@mui/material";
// import Footer from "../navigation/Footer";
// import { FeaturesSection } from "../components/Home/FeaturesSection";
// import { AboutSection } from "../components/Home/AboutSection";
// import { ServicesSection } from "../components/Home/ServicesSection";
// import { HeroSection } from "../components/Home/HeroSection";
// import LatestArrivals from "../components/LatestArrivals";
// import TopNav from "../navigation/TopNav";

// const Home = () => {
//   return (
//     <Box>
//       <TopNav />
//       <HeroSection />
//   <LatestArrivals />
//       <FeaturesSection />
//       <Box mt={{xs: 4, md: 2}}>
//         <AboutSection />
//       </Box>
//       <Box mt={{xs:-24, md:-14}}>
//         <ServicesSection />
//       </Box>

//       <Footer />
//     </Box>
//   )
// }

// export default Home;

import { Box } from "@mui/material";
import Footer from "../navigation/Footer";
import { FeaturesSection } from "../components/Home/FeaturesSection";
import { AboutSection } from "../components/Home/AboutSection";
import { ServicesSection } from "../components/Home/ServicesSection";
import { HeroSection } from "../components/Home/HeroSection";
import LatestArrivals from "../components/Product/LatestArrivals";
import TopNav from "../navigation/TopNav";
import { WhyChooseUsSection } from "../components/Home/WhyChooseUsSection";
import { PartnersSection } from "../components/Home/PartnersSection";
import { TestimonialsSection } from "../components/Home/TestimonialsSection";
import { PaymentOptionsSection } from "../components/Home/PaymentOptionsSection";
import { TeamSection } from "../components/Home/TeamSection";
import { useTheme } from "../contexts/ThemeContext";

const Home = () => {
  const { theme, mode } = useTheme();
  
  return (
    <Box sx={{ 
      position: "relative",
      background: mode === 'dark' 
        ? "linear-gradient(180deg, #000, #0A0A0A)" 
        : "linear-gradient(180deg, #f8f9fa, #ffffff)", 
      color: theme.palette.text.primary,
      minHeight: "100vh",
      overflow: "hidden"
    }}>
      {/* Animated Background Elements */}
      <Box sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -1,
        opacity: mode === 'dark' ? 0.03 : 0.02,
        backgroundImage: `
          radial-gradient(circle at 20% 50%, ${theme.palette.primary.main} 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, ${theme.palette.secondary.main} 0%, transparent 50%),
          radial-gradient(circle at 40% 80%, ${theme.palette.primary.main} 0%, transparent 50%)
        `,
        animation: "backgroundMove 20s ease-in-out infinite",
        "@keyframes backgroundMove": {
          "0%, 100%": { transform: "translateX(0) translateY(0)" },
          "33%": { transform: "translateX(-20px) translateY(-10px)" },
          "66%": { transform: "translateX(20px) translateY(10px)" }
        }
      }} />
      
      {/* Geometric Pattern Overlay */}
      <Box sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -1,
        opacity: mode === 'dark' ? 0.02 : 0.015,
        backgroundImage: `
          linear-gradient(45deg, ${theme.palette.primary.main}15 25%, transparent 25%),
          linear-gradient(-45deg, ${theme.palette.secondary.main}15 25%, transparent 25%),
          linear-gradient(45deg, transparent 75%, ${theme.palette.primary.main}15 75%),
          linear-gradient(-45deg, transparent 75%, ${theme.palette.secondary.main}15 75%)
        `,
        backgroundSize: "60px 60px",
        backgroundPosition: "0 0, 0 30px, 30px -30px, -30px 0px",
        animation: "patternShift 30s linear infinite",
        "@keyframes patternShift": {
          "0%": { backgroundPosition: "0 0, 0 30px, 30px -30px, -30px 0px" },
          "100%": { backgroundPosition: "60px 60px, 60px 90px, 90px 30px, 30px 60px" }
        }
      }} />
      
      {/* Floating Orbs */}
      <Box sx={{
        position: "fixed",
        top: "10%",
        left: "5%",
        width: "300px",
        height: "300px",
        borderRadius: "50%",
        background: `radial-gradient(circle, ${theme.palette.primary.main}20, transparent 70%)`,
        zIndex: -1,
        animation: "float1 15s ease-in-out infinite",
        "@keyframes float1": {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "50%": { transform: "translate(50px, -30px) scale(1.1)" }
        }
      }} />
      
      <Box sx={{
        position: "fixed",
        bottom: "15%",
        right: "10%",
        width: "200px",
        height: "200px",
        borderRadius: "50%",
        background: `radial-gradient(circle, ${theme.palette.secondary.main}25, transparent 70%)`,
        zIndex: -1,
        animation: "float2 12s ease-in-out infinite reverse",
        "@keyframes float2": {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "50%": { transform: "translate(-40px, 20px) scale(0.9)" }
        }
      }} />
      
      {/* Grid Lines */}
      <Box sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -1,
        opacity: mode === 'dark' ? 0.01 : 0.008,
        backgroundImage: `
          linear-gradient(${theme.palette.divider} 1px, transparent 1px),
          linear-gradient(90deg, ${theme.palette.divider} 1px, transparent 1px)
        `,
        backgroundSize: "100px 100px",
        animation: "gridMove 25s linear infinite",
        "@keyframes gridMove": {
          "0%": { transform: "translate(0, 0)" },
          "100%": { transform: "translate(100px, 100px)" }
        }
      }} />
      <TopNav />
      <HeroSection />
      <LatestArrivals />
      <FeaturesSection />
      <WhyChooseUsSection />
      <PartnersSection />
             <AboutSection />
           <ServicesSection />
      <TestimonialsSection />
      <TeamSection />
      <PaymentOptionsSection />
      <Footer />
    </Box>
  );
};

export default Home;
