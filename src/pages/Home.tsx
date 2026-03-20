import { Box } from "@mui/material";
import { alpha } from "@mui/material/styles";
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
import { useTheme } from "../contexts/ThemeContext";

const Home = () => {
  const { theme, mode } = useTheme();
  
  return (
    <Box sx={{ 
      position: "relative",
      background: mode === "dark"
        ? "linear-gradient(180deg, #07111B 0%, #0A1722 40%, #0B1319 100%)"
        : "linear-gradient(180deg, #F4F7F7 0%, #FFFFFF 45%, #F2F7F6 100%)",
      color: theme.palette.text.primary,
      minHeight: "100vh",
      overflow: "hidden"
    }}>
      <Box sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -1,
        backgroundImage: `
          radial-gradient(circle at top, ${alpha(theme.palette.secondary.main, mode === "dark" ? 0.18 : 0.12)} 0%, transparent 32%),
          radial-gradient(circle at 85% 18%, ${alpha(theme.palette.primary.main, mode === "dark" ? 0.16 : 0.1)} 0%, transparent 24%),
          linear-gradient(180deg, transparent 0%, ${alpha(theme.palette.background.default, mode === "dark" ? 0.24 : 0.08)} 100%)
        `,
      }} />

      <Box sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -1,
        opacity: mode === "dark" ? 0.22 : 0.32,
        backgroundImage: `
          linear-gradient(${alpha(theme.palette.divider, 0.32)} 1px, transparent 1px),
          linear-gradient(90deg, ${alpha(theme.palette.divider, 0.32)} 1px, transparent 1px)
        `,
        backgroundSize: "96px 96px",
      }} />

      <Box sx={{
        position: "fixed",
        bottom: "8%",
        right: "4%",
        width: { xs: 220, md: 340 },
        height: { xs: 220, md: 340 },
        borderRadius: "50%",
        background: `radial-gradient(circle, ${alpha(theme.palette.primary.main, mode === "dark" ? 0.16 : 0.1)}, transparent 70%)`,
        zIndex: -1,
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
      {/* <TeamSection /> */}
      <PaymentOptionsSection />
      <Footer />
    </Box>
  );
};

export default Home;
