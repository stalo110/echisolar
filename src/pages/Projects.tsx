import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Stack,
} from "@mui/material";
import TopNav from "../navigation/TopNav";
import Footer from "../navigation/Footer";
import { HeroSection } from "../components/Projects/Hero";
import { WhyChooseUsSection } from "../components/Home/WhyChooseUsSection";
import { PartnersSection } from "../components/Home/PartnersSection";
import { useTheme } from "../contexts/ThemeContext";

const brandAmber = "#FFAB46";

const sampleProjects = [
  {
    id: 1,
    title: "Benin Solar Rooftop",
    summary:
      "A 5kW rooftop solar installation for a residential home in Benin City. The project provides clean, uninterrupted power and reduces grid dependence by over 60%.",
    images: [
      "/images/solar4.jpg",
      "/images/solar5.jpg",
    ],
  },
  {
    id: 2,
    title: "Lagos Community Microgrid",
    summary:
      "A 50kW hybrid microgrid serving a community clinic and surrounding homes in Lagos. This system integrates solar PV and battery storage for stable, 24/7 energy.",
    images: [
      "/images/solar.jpg",
      "/images/solar2.jpg",
      "/images/solar3.jpg",
          "/images/solar4.jpg",
      "/images/solar5.jpg",
    ],
  },
  {
    id: 3,
    title: "Ibadan Commercial PV",
    summary:
      "A 20kW solar setup for a small business park in Ibadan. The system powers offices, cooling units, and signage while cutting electricity bills by 45%.",
    images: [
      "/images/solar.jpg",
    ],
  },
];

export default function Projects() {
  const { theme, mode } = useTheme();

  return (
    <Box sx={{ 
      bgcolor: theme.palette.background.default, 
      color: theme.palette.text.primary, 
      minHeight: "100vh",
      position: "relative",
      overflow: "hidden"
    }}>
      {/* Dynamic Background Pattern */}
      <Box sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -1,
        opacity: mode === 'dark' ? 0.018 : 0.012,
        backgroundImage: `
          linear-gradient(60deg, ${theme.palette.primary.main}12 25%, transparent 25%),
          linear-gradient(120deg, ${theme.palette.secondary.main}08 25%, transparent 25%),
          linear-gradient(60deg, transparent 75%, ${theme.palette.primary.main}08 75%)
        `,
        backgroundSize: "120px 120px",
        animation: "patternFlow 18s linear infinite",
        "@keyframes patternFlow": {
          "0%": { backgroundPosition: "0 0, 60px 0, 0 60px" },
          "100%": { backgroundPosition: "120px 120px, 180px 120px, 120px 180px" }
        }
      }} />
      <Box sx={{ position: "relative", zIndex: 1 }}>
        <TopNav />
      <HeroSection />

      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 8 } }}>
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            fontWeight: 700,
            color: theme.palette.primary.main,
            mb: 5,
            textAlign: "center",
            fontFamily: "JUST Sans ExBold",
          }}
        >
          Our Solar Projects
        </Typography>

        <Grid container spacing={4}>
          {sampleProjects.map((p) => (
            <Grid size={{ xs: 12, md: 6, lg: 4 }} key={p.id}>
              <Card
                sx={{
                  background: theme.palette.background.paper,
                  borderRadius: 3,
                  border: `1px solid ${theme.palette.divider}`,
                  boxShadow: mode === 'dark' ? "0 4px 20px rgba(0,0,0,0.4)" : "0 4px 20px rgba(0,0,0,0.1)",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: `0 8px 30px ${theme.palette.primary.main}33`,
                  },
                }}
              >
                {/* Image gallery */}
                <Stack
                  direction="row"
                  spacing={1}
                  sx={{
                    p: 1,
                    overflowX: "auto",
                    "&::-webkit-scrollbar": { display: "none" },
                  }}
                >
                  {p.images.map((img, i) => (
                    <CardMedia
                      key={i}
                      component="img"
                      image={img}
                      alt={`${p.title} image ${i + 1}`}
                      sx={{
                        width: "100%",
                        maxWidth: 180,
                        height: 120,
                        borderRadius: 2,
                        objectFit: "cover",
                      }}
                    />
                  ))}
                </Stack>

                <CardContent>
                  <Typography
                    variant="h6"
                    sx={{
                      color: theme.palette.primary.main,
                      fontWeight: "bold",
                      mb: 1.5,
                      fontFamily: "JUST Sans ExBold",
                    }}
                  >
                    {p.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: theme.palette.text.secondary,
                      lineHeight: 1.6,
                      fontSize: "0.95rem",
                      fontFamily: "JUST Sans Regular",
                    }}
                  >
                    {p.summary}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
            <WhyChooseUsSection />
            <PartnersSection />

        <Footer />
      </Box>
    </Box>
  );
}

