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

const Home = () => {
  return (
    <Box>
      <TopNav />
      <HeroSection />
      <LatestArrivals />
      <FeaturesSection />
      <WhyChooseUsSection />
      <PartnersSection />
      <Box mt={{ xs: 4, md: 2 }}>
        <AboutSection />
      </Box>
      <Box mt={{ xs: -24, md: -14 }}>
        <ServicesSection />
      </Box>
      <TestimonialsSection />
      <PaymentOptionsSection />
      <Footer />
    </Box>
  );
};

export default Home;
