import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
} from "@mui/material";
import TopNav from "../navigation/TopNav";
import Footer from "../navigation/Footer";
import { HeroSection } from "../components/About/HeroSection";
import { AboutSection } from "../components/Home/AboutSection";
import { PartnersSection } from "../components/Home/PartnersSection";

const About = () => {
  return (
    <Box sx={{ background: "linear-gradient(180deg, #000, #0A0A0A)", color: "#fff" }}>
      <TopNav />
      <HeroSection />

      <Container sx={{ py: 8 }}>
        {/* Title */}
        <Typography
          variant="h3"
          sx={{
            fontWeight: "bold",
            mb: 4,
            textAlign: "center",
            background: "linear-gradient(90deg, #FFAB46, #FFD18A)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          About Echi Solar
        </Typography>

        {/* Intro Section */}
        <Box mt={{ xs: 4, md: 2 }}>
          <AboutSection />
        </Box>

        {/* Mission & Vision */}
        <Grid container spacing={4} sx={{ mt: 6 }}>
          {[
            {
              title: "Our Mission",
              text: "At Echi Solar, our mission is to empower homes and businesses with reliable, affordable, and sustainable solar energy solutions. We are committed to delivering top-quality products and exceptional customer service to help our clients achieve energy independence while contributing to a cleaner environment.",
            },
            {
              title: "Our Vision",
              text: "We envision a future where clean energy is accessible to everyone. Through innovation, education, and a commitment to excellence, we aim to be a leading force in the renewable energy sector, driving the transition to a more sustainable and energy-efficient world.",
            },
          ].map((item) => (
            <Grid size={{ xs: 12, md: 6 }}>
              <Paper
                sx={{
                  p: 3,
                  height: "100%",
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 3,
                  backdropFilter: "blur(8px)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    borderColor: "#FFAB46",
                    boxShadow: "0 0 15px rgba(255,171,70,0.3)",
                    transform: "translateY(-5px)",
                  },
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "bold",
                    color: "#FFAB46",
                    mb: 1.5,
                    textTransform: "uppercase",
                  }}
                >
                  {item.title}
                </Typography>
                <Typography sx={{ color: "rgba(255,255,255,0.8)" }}>
                  {item.text}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* Why Choose Us */}
        <Box sx={{ mt: 10 }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              mb: 4,
              textAlign: "center",
              color: "#0ba21dff",
              background: "linear-gradient(90deg, #0ba21dff, #0ba21dff)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Why Choose Us?
          </Typography>

          <Grid container spacing={4}>
            {[
              {
                title: "Quality Products",
                text: "We source our products from world-leading manufacturers to ensure the highest quality and reliability.",
              },
              {
                title: "Expert Installation",
                text: "Our team of certified professionals ensures a seamless and efficient installation process.",
              },
              {
                title: "Flexible Financing",
                text: "We offer a range of payment options, including installment plans, to make solar energy more accessible.",
              },
            ].map((card, i) => (
              <Grid size={{xs:12, md:4}} key={i}>
                <Paper
                  sx={{
                    p: 3,
                    textAlign: "center",
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: 3,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      borderColor: "#2E7D4D",
                      boxShadow: "0 0 12px rgba(46,125,77,0.4)",
                      transform: "translateY(-5px)",
                    },
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: "bold", color: "#2E7D4D", mb: 1.5 }}
                  >
                    {card.title}
                  </Typography>
                  <Typography sx={{ color: "rgba(255,255,255,0.8)" }}>
                    {card.text}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>

      <PartnersSection />
      <Footer />
    </Box>
  );
};

export default About;
