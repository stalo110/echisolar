import { Box, Container, Typography, Grid, Card } from "@mui/material";
import { alpha } from "@mui/material/styles";
import { useTheme } from "../../contexts/ThemeContext";
import {
  Lightbulb as LightbulbIcon,
  CheckCircle as CheckCircleIcon,
  ThumbUp as ThumbUpIcon,
  FormatQuote as QuoteIcon,
  ChevronRight as ChevronRightIcon,
  // Send as SendIcon,
} from "@mui/icons-material";
import { FaWhatsapp } from "react-icons/fa";
import { COMPANY_PHONE, COMPANY_WHATSAPP_URL } from "../../config/company";

export const ServicesSection = () => {
  const { theme, mode } = useTheme();
  const displayPhone = COMPANY_PHONE.replace(
    /^(\+\d{3})(\d{3})(\d{3})(\d{4})$/,
    "$1 $2 $3 $4"
  );
  const services = [
    { icon: <LightbulbIcon />, title: "Solar System Design", desc: "Custom PV system design, shading analysis, maximize energy yield." },
    { icon: <CheckCircleIcon />, title: "Installation & Commissioning", desc: "Professional on-site installation of panels & inverters." },
    { icon: <ThumbUpIcon />, title: "Maintenance & Support", desc: "Preventive maintenance, checks and rapid troubleshooting." },
    { icon: <QuoteIcon />, title: "Battery & Energy Storage", desc: "Battery options, sizing and integration with solar systems." },
    { icon: <ChevronRightIcon />, title: "Inverters & Components", desc: "High-quality inverters & mounting systems supply." },
    { icon: <FaWhatsapp />, title: "Financing & Plans", desc: "Flexible payment options and financing partnerships." },
  ];

  return (
    <Box sx={{ py: 10, background: "transparent" }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Typography variant="h6" sx={{ color: theme.palette.primary.main, fontWeight: 700, fontFamily: "JUST Sans ExBold", textTransform: "uppercase", letterSpacing: 2, fontSize: { xs: "0.82rem", md: "1.05rem" } }}>
            Our Services
          </Typography>
          <Typography variant="h2" sx={{ fontWeight: 700, color: theme.palette.text.primary, mt: 1, fontFamily: "JUST Sans ExBold", fontSize: { xs: "1.95rem", md: "3.1rem" } }}>
            Clean, reliable solar solutions
          </Typography>
          <Typography sx={{ color: theme.palette.text.secondary, maxWidth: 780, mx: "auto", mt: 2, fontFamily: "JUST Sans Regular", lineHeight: 1.8 }}>
            We design, install and maintain solar systems for homes and businesses, backed by monitoring and flexible payment options.
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {services.map((s, i) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={i}>
              <Card
                sx={{
                  p: 3.2,
                  height: "100%",
                  borderRadius: 4,
                  border: `1px solid ${theme.palette.divider}`,
                  background: mode === "dark" ? alpha("#10202A", 0.76) : alpha("#FFFFFF", 0.8),
                  backdropFilter: "blur(14px)",
                  color: theme.palette.text.primary,
                  boxShadow: mode === "dark" ? "0 20px 48px rgba(3,10,18,0.26)" : "0 18px 42px rgba(15,23,42,0.08)",
                  transition: "transform .28s ease, box-shadow .28s ease, border-color .28s ease",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    borderColor: alpha(theme.palette.secondary.main, 0.32),
                    boxShadow: mode === "dark" ? "0 24px 54px rgba(3,10,18,0.34)" : "0 22px 52px rgba(15,23,42,0.11)",
                  },
                }}
              >
                <Box sx={{ display: "flex", gap: 2, alignItems: "flex-start", mb: 1.5 }}>
                  <Box
                    sx={{
                      width: 52,
                      height: 52,
                      borderRadius: 3,
                      display: "grid",
                      placeItems: "center",
                      background: alpha(theme.palette.primary.main, 0.12),
                      color: theme.palette.primary.main,
                      border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                      flexShrink: 0,
                    }}
                  >
                    {s.icon}
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 700, fontFamily: "JUST Sans ExBold", lineHeight: 1.35 }}>
                    {s.title}
                  </Typography>
                </Box>
                <Typography sx={{ color: theme.palette.text.secondary, fontFamily: "JUST Sans Regular", lineHeight: 1.75 }}>
                  {s.desc}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box
          component="a"
          href={COMPANY_WHATSAPP_URL}
          target="_blank"
          rel="noreferrer"
          sx={{
            mt: 6,
            mx: "auto",
            maxWidth: 1040,
            px: { xs: 2, md: 4 },
            py: { xs: 2.25, md: 2.8 },
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: { xs: "column", md: "row" },
            gap: 2.5,
            textDecoration: "none",
            borderRadius: 5,
            border: "1px solid rgba(0, 166, 81, 0.72)",
            background: "linear-gradient(135deg, #020B08 0%, #03110B 55%, #071810 100%)",
            boxShadow: "0 24px 56px rgba(1, 10, 7, 0.36)",
            transition: "transform 0.25s ease, box-shadow 0.25s ease",
            "&:hover": {
              transform: "translateY(-4px)",
              boxShadow: "0 28px 62px rgba(1, 10, 7, 0.45)",
            },
          }}
        >
          <Box
            sx={{
              px: { xs: 2.4, md: 4.4 },
              py: { xs: 1.5, md: 1.8 },
              minWidth: { md: 320 },
              borderRadius: 3.5,
              background: "linear-gradient(90deg, #00A63F 0%, #0CB24A 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 1.3,
            }}
          >
            <FaWhatsapp style={{ color: "#ffffff", fontSize: 22 }} />
            <Typography
              sx={{
                color: "#ffffff",
                fontWeight: 700,
                fontFamily: "JUST Sans ExBold",
                fontSize: { xs: "1rem", md: "1.55rem" },
                letterSpacing: "-0.01em",
                textAlign: "center",
              }}
            >
              CHAT ON WHATSAPP
            </Typography>
          </Box>

          <Typography
            sx={{
              color: "#ffffff",
              fontWeight: 700,
              fontFamily: "JUST Sans ExBold",
              fontSize: { xs: "1.5rem", sm: "2rem", md: "3.3rem" },
              lineHeight: 1,
              letterSpacing: "-0.03em",
              textAlign: "center",
            }}
          >
            {displayPhone}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};
