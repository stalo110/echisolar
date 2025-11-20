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
import { TeamSection } from "../components/Home/TeamSection";
import { useTheme } from "../contexts/ThemeContext";

const About = () => {
  const { theme, mode } = useTheme();
  
  return (
    <Box sx={{ 
      background: mode === 'dark' 
        ? "linear-gradient(180deg, #000, #0A0A0A)" 
        : "linear-gradient(180deg, #f8f9fa, #ffffff)", 
      color: theme.palette.text.primary,
      minHeight: "100vh",
      position: "relative",
      overflow: "hidden"
    }}>
      {/* Professional Background Elements */}
      <Box sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -1,
        opacity: mode === 'dark' ? 0.015 : 0.01,
        backgroundImage: `
          conic-gradient(from 45deg at 30% 70%, ${theme.palette.primary.main}20, transparent 50%),
          conic-gradient(from 225deg at 70% 30%, ${theme.palette.secondary.main}15, transparent 50%)
        `,
        backgroundSize: "600px 600px, 400px 400px",
        animation: "slowRotate 30s linear infinite",
        "@keyframes slowRotate": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" }
        }
      }} />
      <Box sx={{ position: "relative", zIndex: 1 }}>
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
            background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontFamily: "JUST Sans ExBold",
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
            <Grid size={{ xs: 12, md: 6 }} key={item.title}>
              <Paper
                sx={{
                  p: 3,
                  height: "100%",
                  background: mode === 'dark' ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.02)",
                  border: `1px solid ${theme.palette.divider}`,
                  borderRadius: 3,
                  backdropFilter: "blur(8px)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    borderColor: theme.palette.primary.main,
                    boxShadow: `0 0 15px ${theme.palette.primary.main}50`,
                    transform: "translateY(-5px)",
                  },
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "bold",
                    color: theme.palette.primary.main,
                    mb: 1.5,
                    textTransform: "uppercase",
                    fontFamily: "JUST Sans ExBold",
                  }}
                >
                  {item.title}
                </Typography>
                <Typography sx={{ color: theme.palette.text.secondary, fontFamily: "JUST Sans Regular" }}>
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
              background: `linear-gradient(90deg, ${theme.palette.secondary.main}, ${theme.palette.secondary.light})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontFamily: "JUST Sans ExBold",
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
                    background: mode === 'dark' ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.02)",
                    border: `1px solid ${theme.palette.divider}`,
                    borderRadius: 3,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      borderColor: theme.palette.secondary.main,
                      boxShadow: `0 0 12px ${theme.palette.secondary.main}66`,
                      transform: "translateY(-5px)",
                    },
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: "bold", color: theme.palette.secondary.main, mb: 1.5, fontFamily: "JUST Sans ExBold" }}
                  >
                    {card.title}
                  </Typography>
                  <Typography sx={{ color: theme.palette.text.secondary, fontFamily: "JUST Sans Regular" }}>
                    {card.text}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>

      <TeamSection />
        <PartnersSection />
        <Footer />
      </Box>
    </Box>
  );
};

export default About;