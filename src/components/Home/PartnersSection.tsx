import { Box, Container, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";
import { useTheme } from "../../contexts/ThemeContext";
import Marquee from "react-fast-marquee";

export const PartnersSection = () => {
  const { theme, mode } = useTheme();
  const partners = [
    {
      name: "Camitel",
      lightLogo: "/images/partners/Camitel-Black 6.png",
      darkLogo: "/images/partners/Camitel-White 6.png",
    },
    {
      name: "Isulink",
      lightLogo: "/images/partners/Isulink-Black 1.png",
      darkLogo: "/images/partners/Isulink-White 1.png",
    },
    {
      name: "JA Solar",
      lightLogo: "/images/partners/JASolar-Black 3.png",
      darkLogo: "/images/partners/JASolar-White 3.png",
    },
    {
      name: "Jinko Solar",
      lightLogo: "/images/partners/Jinko-Black 2.png",
      darkLogo: "/images/partners/Jinko-White 2.png",
    },
    {
      name: "Pentagon Solar",
      lightLogo: "/images/partners/Pentagon-Black 4.png",
      darkLogo: "/images/partners/Pentagon-White 4.png",
    },
    {
      name: "PowerChina",
      lightLogo: "/images/partners/Powerchina-Black 5.png",
      darkLogo: "/images/partners/Powerchina-White 5.png",
    },
  ];

  return (
    <Box sx={{ 
      py: 8, 
      background: "transparent",
      position: "relative",
      overflow: "hidden"
    }}>
      <Box sx={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        opacity: mode === "dark" ? 0.16 : 0.24,
        backgroundImage: `
          linear-gradient(${alpha(theme.palette.divider, 0.42)} 1px, transparent 1px),
          linear-gradient(90deg, ${alpha(theme.palette.divider, 0.42)} 1px, transparent 1px)
        `,
        backgroundSize: "88px 88px",
      }} />
      <Container maxWidth="lg">
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Typography variant="h6" sx={{ color: theme.palette.primary.main, fontWeight: 700, fontFamily: "JUST Sans ExBold", textTransform: "uppercase", letterSpacing: 2, fontSize: { xs: "0.82rem", md: "1.05rem" } }}>
            Trusted Partnerships
          </Typography>
          <Typography variant="h2" sx={{ fontWeight: 700, color: theme.palette.text.primary, mt: 1, fontFamily: "JUST Sans ExBold", fontSize: { xs: "1.95rem", md: "3.1rem" } }}>
            Our Technology Partners
          </Typography>
          <Typography sx={{ color: theme.palette.text.secondary, maxWidth: 700, mx: "auto", mt: 2, fontFamily: "JUST Sans Regular", lineHeight: 1.8 }}>
            We partner with world-leading manufacturers to bring you the most reliable and efficient solar technology available.
          </Typography>
        </Box>

        <Marquee speed={42} gradient={false} pauseOnHover={true}>
          {partners.map((p, i) => (
            <Box
              key={i}
              sx={{
                textAlign: "center",
                p: 3,
                mx: 1.75,
                borderRadius: 4,
                minWidth: 220,
                border: `1px solid ${theme.palette.divider}`,
                background: mode === "dark" ? alpha("#10202A", 0.7) : alpha("#FFFFFF", 0.78),
                backdropFilter: "blur(14px)",
                boxShadow: mode === "dark" ? "0 20px 48px rgba(3,10,18,0.32)" : "0 18px 46px rgba(15,23,42,0.08)",
                transition: "transform .28s ease, box-shadow .28s ease, border-color .28s ease",
                "&:hover": {
                  transform: "translateY(-6px)",
                  borderColor: alpha(theme.palette.primary.main, 0.38),
                  boxShadow: mode === "dark" ? "0 24px 56px rgba(3,10,18,0.38)" : "0 22px 52px rgba(15,23,42,0.12)",
                },
              }}
            >
              <Box
                component="img"
                src={mode === "dark" ? p.darkLogo : p.lightLogo}
                alt={p.name}
                sx={{
                  height: 58,
                  width: 172,
                  objectFit: "contain",
                  opacity: 0.95,
                  mx: "auto",
                }}
              />
              <Typography variant="caption" sx={{ display: "block", mt: 1.5, color: theme.palette.text.secondary, fontFamily: "JUST Sans Regular", fontSize: "0.82rem" }}>
                {p.name}
              </Typography>
            </Box>
          ))}
        </Marquee>
      </Container>
    </Box>
  );
};
