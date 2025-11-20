import { Box, Container, Typography } from "@mui/material";
import { useTheme } from "../../contexts/ThemeContext";
import Marquee from "react-fast-marquee";

export const PartnersSection = () => {
  const { theme, mode } = useTheme();
  const partners = [
    { name: "SolarEdge", logo: "/images/lglogo.png" },
    { name: "LG Solar", logo: "/images/lglogo.png" },
    { name: "Tesla Powerwall", logo: "/images/lglogo.png" },
    { name: "Canadian Solar", logo: "/images/lglogo.png" },
    { name: "SMA Solar", logo: "/images/lglogo.png" },
    { name: "Jinko Solar", logo: "/images/lglogo.png" },
  ];

  return (
    <Box sx={{ 
      py: 8, 
      background: mode === 'dark' ? "linear-gradient(180deg, #070707, #0d0d0d)" : "linear-gradient(180deg, #f8f9fa, #e9ecef)",
      position: "relative",
      overflow: "hidden"
    }}>
      {/* Hexagonal Pattern Background */}
      <Box sx={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        opacity: mode === 'dark' ? 0.02 : 0.015,
        backgroundImage: `
          radial-gradient(circle at 50% 50%, ${theme.palette.primary.main}30 2px, transparent 2px),
          radial-gradient(circle at 25% 25%, ${theme.palette.secondary.main}20 1px, transparent 1px)
        `,
        backgroundSize: "80px 80px, 40px 40px",
        animation: "drift 15s ease-in-out infinite",
        "@keyframes drift": {
          "0%, 100%": { transform: "translateX(0) translateY(0)" },
          "50%": { transform: "translateX(20px) translateY(-10px)" }
        }
      }} />
      <Container maxWidth="lg">
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Typography variant="h6" sx={{ color: theme.palette.primary.main, fontWeight: 800, fontFamily: "JUST Sans ExBold", textTransform: "uppercase", letterSpacing: 2, fontSize: { xs: "0.9rem", md: "1.25rem" } }}>
            Trusted Partnerships
          </Typography>
          <Typography variant="h2" sx={{ fontWeight: 800, color: theme.palette.text.primary, mt: 1, fontFamily: "JUST Sans ExBold", fontSize: { xs: "2.2rem", md: "3.8rem" } }}>
            Our Technology Partners
          </Typography>
          <Typography sx={{ color: theme.palette.text.secondary, maxWidth: 700, mx: "auto", mt: 2, fontFamily: "JUST Sans Regular" }}>
            We partner with world-leading manufacturers to bring you the most reliable and efficient solar technology available.
          </Typography>
        </Box>

        <Marquee speed={50} gradient={false} pauseOnHover={true}>
          {partners.map((p, i) => (
            <Box
              key={i}
              sx={{
                textAlign: "center",
                p: 3,
                mx: 4,
                borderRadius: 2,
                transition: "transform .28s ease, box-shadow .28s ease",
                "&:hover": { transform: "translateY(-6px)", boxShadow: "0 10px 30px rgba(0,0,0,0.6)" },
              }}
            >
              <Box
                component="img"
                src={p.logo}
                alt={p.name}
                sx={{
                  height: 64,
                  opacity: 0.75,
                  transition: "filter .3s ease, opacity .3s ease",
                  "&:hover": { filter: "grayscale(0%)", opacity: 1 },
                  mx: "auto",
                }}
              />
              <Typography variant="caption" sx={{ display: "block", mt: 1, color: theme.palette.text.secondary, fontFamily: "JUST Sans Regular" }}>
                {p.name}
              </Typography>
            </Box>
          ))}
        </Marquee>
      </Container>
    </Box>
  );
};

