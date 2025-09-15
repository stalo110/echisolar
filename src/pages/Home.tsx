
import { Box } from "@mui/material";
import Footer from "../navigation/Footer";
import { FeaturesSection } from "../components/Home/FeaturesSection";
import { AboutSection } from "../components/Home/AboutSection";
import { ServicesSection } from "../components/Home/ServicesSection";
import { HeroSection } from "../components/Home/HeroSection";
import TopNav from "../navigation/TopNav";


const Home = () => {
  return (
    <Box>
      <TopNav />
      <HeroSection />
      <FeaturesSection />
      <Box mt={{xs: 4, md: 2}}>
        <AboutSection />
      </Box>
      <Box mt={{xs:-24, md:-14}}>
        <ServicesSection />
      </Box>
     
      <Footer />
    </Box>
  )
}

export default Home;