import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Link,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import {
  TrackChanges,
  Visibility,
  WorkspacePremium,
  Engineering,
  AccountBalanceWallet,
} from "@mui/icons-material";
import TopNav from "../navigation/TopNav";
import Footer from "../navigation/Footer";
import { HeroSection } from "../components/About/HeroSection";
import { AboutSection } from "../components/Home/AboutSection";
import { PartnersSection } from "../components/Home/PartnersSection";
// import { TeamSection } from "../components/Home/TeamSection";
import { useTheme } from "../contexts/ThemeContext";
import { COMPANY_ADDRESS, COMPANY_PHONE, COMPANY_WHATSAPP_URL } from "../config/company";

const About = () => {
  const { theme, mode } = useTheme();
  const missionVisionCards = [
    {
      title: "Our Mission",
      label: "Purpose-led delivery",
      text: "At Echi Solar, our mission is to empower homes and businesses with reliable, affordable, and sustainable solar energy solutions. We are committed to delivering top-quality products and exceptional customer service to help our clients achieve energy independence while contributing to a cleaner environment.",
      icon: <TrackChanges sx={{ fontSize: 34 }} />,
      accent: theme.palette.primary.main,
      secondaryAccent: theme.palette.secondary.main,
    },
    {
      title: "Our Vision",
      label: "Long-term impact",
      text: "We envision a future where clean energy is accessible to everyone. Through innovation, education, and a commitment to excellence, we aim to be a leading force in the renewable energy sector, driving the transition to a more sustainable and energy-efficient world.",
      icon: <Visibility sx={{ fontSize: 34 }} />,
      accent: theme.palette.secondary.main,
      secondaryAccent: theme.palette.primary.main,
    },
  ];

  const whyChooseCards = [
    {
      title: "Quality Products",
      label: "Tier-one reliability",
      text: "We source our products from world-leading manufacturers to ensure the highest quality and reliability.",
      icon: <WorkspacePremium sx={{ fontSize: 30 }} />,
      accent: theme.palette.primary.main,
    },
    {
      title: "Expert Installation",
      label: "Precision execution",
      text: "Our team of certified professionals ensures a seamless and efficient installation process.",
      icon: <Engineering sx={{ fontSize: 30 }} />,
      accent: theme.palette.secondary.main,
    },
    {
      title: "Flexible Financing",
      label: "Accessible investment",
      text: "We offer a range of payment options, including installment plans, to make solar energy more accessible.",
      icon: <AccountBalanceWallet sx={{ fontSize: 30 }} />,
      accent: theme.palette.primary.light,
    },
  ];
  
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
        {/* Intro Section */}
        <Box>
          <AboutSection showButton={false} />
        </Box>

        {/* Mission & Vision */}
        <Grid container spacing={4} sx={{ mt: 6 }}>
          {missionVisionCards.map((item) => (
            <Grid size={{ xs: 12, md: 6 }} key={item.title}>
              <Paper
                sx={{
                  p: { xs: 3, md: 4 },
                  height: "100%",
                  position: "relative",
                  overflow: "hidden",
                  background:
                    mode === "dark"
                      ? "linear-gradient(180deg, rgba(255,255,255,0.07), rgba(255,255,255,0.03))"
                      : "linear-gradient(180deg, rgba(255,255,255,0.98), rgba(245,248,247,0.92))",
                  border: `1px solid ${theme.palette.divider}`,
                  borderRadius: 4,
                  backdropFilter: "blur(12px)",
                  transition: "all 0.3s ease",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    inset: 0,
                    background: `radial-gradient(circle at top right, ${alpha(item.accent, mode === "dark" ? 0.2 : 0.1)}, transparent 45%)`,
                    pointerEvents: "none",
                  },
                  "&:hover": {
                    borderColor: theme.palette.primary.main,
                    boxShadow: `0 24px 50px ${alpha(item.accent, mode === "dark" ? 0.26 : 0.14)}`,
                    transform: "translateY(-5px)",
                  },
                }}
              >
                <Box sx={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", gap: 2.5, height: "100%" }}>
                  <Box sx={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 2 }}>
                    <Box
                      sx={{
                        width: 72,
                        height: 72,
                        borderRadius: "24px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#fff",
                        background: `linear-gradient(135deg, ${item.accent}, ${item.secondaryAccent})`,
                        boxShadow: `0 20px 35px ${alpha(item.accent, mode === "dark" ? 0.34 : 0.2)}`,
                      }}
                    >
                      {item.icon}
                    </Box>
                    <Typography
                      variant="caption"
                      sx={{
                        px: 1.5,
                        py: 0.75,
                        borderRadius: 999,
                        color: item.accent,
                        bgcolor: alpha(item.accent, mode === "dark" ? 0.14 : 0.08),
                        border: `1px solid ${alpha(item.accent, 0.22)}`,
                        fontFamily: "JUST Sans ExBold",
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                      }}
                    >
                      {item.label}
                    </Typography>
                  </Box>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: "bold",
                      color: theme.palette.text.primary,
                      textTransform: "uppercase",
                      fontFamily: "JUST Sans ExBold",
                    }}
                  >
                    {item.title}
                  </Typography>
                  <Typography sx={{ color: theme.palette.text.secondary, fontFamily: "JUST Sans Regular", lineHeight: 1.8 }}>
                    {item.text}
                  </Typography>
                </Box>
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
            {whyChooseCards.map((card, i) => (
              <Grid size={{xs:12, md:4}} key={i}>
                <Paper
                  sx={{
                    p: { xs: 3, md: 3.5 },
                    textAlign: "left",
                    position: "relative",
                    overflow: "hidden",
                    minHeight: "100%",
                    background:
                      mode === "dark"
                        ? "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.03))"
                        : "linear-gradient(180deg, rgba(255,255,255,0.96), rgba(245,248,247,0.9))",
                    border: `1px solid ${theme.palette.divider}`,
                    borderRadius: 4,
                    transition: "all 0.3s ease",
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      top: -60,
                      right: -40,
                      width: 180,
                      height: 180,
                      borderRadius: "50%",
                      background: `radial-gradient(circle, ${alpha(card.accent, mode === "dark" ? 0.22 : 0.12)}, transparent 68%)`,
                    },
                    "&:hover": {
                      borderColor: card.accent,
                      boxShadow: `0 24px 45px ${alpha(card.accent, mode === "dark" ? 0.22 : 0.12)}`,
                      transform: "translateY(-5px)",
                    },
                  }}
                >
                  <Box sx={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", gap: 2.5, height: "100%" }}>
                    <Box
                      sx={{
                        width: 64,
                        height: 64,
                        borderRadius: "20px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        bgcolor: alpha(card.accent, mode === "dark" ? 0.16 : 0.1),
                        color: card.accent,
                        border: `1px solid ${alpha(card.accent, 0.24)}`,
                      }}
                    >
                      {card.icon}
                    </Box>
                    <Box>
                      <Typography
                        variant="caption"
                        sx={{
                          display: "inline-flex",
                          mb: 1,
                          color: card.accent,
                          fontFamily: "JUST Sans ExBold",
                          letterSpacing: "0.08em",
                          textTransform: "uppercase",
                        }}
                      >
                        {card.label}
                      </Typography>
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: "bold", color: theme.palette.text.primary, mb: 1.25, fontFamily: "JUST Sans ExBold" }}
                      >
                        {card.title}
                      </Typography>
                      <Typography sx={{ color: theme.palette.text.secondary, fontFamily: "JUST Sans Regular", lineHeight: 1.8 }}>
                        {card.text}
                      </Typography>
                    </Box>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Paper
          sx={{
            mt: 8,
            p: { xs: 3, md: 4 },
            borderRadius: 3,
            border: `1px solid ${theme.palette.divider}`,
            background: mode === "dark" ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.02)",
          }}
        >
          <Typography sx={{ fontFamily: "JUST Sans ExBold", color: theme.palette.primary.main, mb: 1.5 }}>
            Visit or Contact Us
          </Typography>
          <Typography sx={{ fontFamily: "JUST Sans Regular", color: theme.palette.text.secondary }}>
            Address: {COMPANY_ADDRESS}
          </Typography>
          <Typography sx={{ fontFamily: "JUST Sans Regular", color: theme.palette.text.secondary, mt: 1 }}>
            WhatsApp/Phone:{" "}
            <Link href={COMPANY_WHATSAPP_URL} target="_blank" underline="hover" color={theme.palette.primary.main}>
              {COMPANY_PHONE}
            </Link>
          </Typography>
        </Paper>
      </Container>

      {/* <TeamSection /> */}
        <PartnersSection />
        <Footer />
      </Box>
    </Box>
  );
};

export default About;
