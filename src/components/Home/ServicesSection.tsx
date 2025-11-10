import { Box, Container, Typography, Grid, Card, IconButton } from "@mui/material";
import {
  Lightbulb as LightbulbIcon,
  CheckCircle as CheckCircleIcon,
  ThumbUp as ThumbUpIcon,
  FormatQuote as QuoteIcon,
  ChevronRight as ChevronRightIcon,
  Phone as PhoneIcon,
  Send as SendIcon,
} from "@mui/icons-material";

export const ServicesSection = () => {
  const services = [
    { icon: <LightbulbIcon />, title: "Solar System Design", desc: "Custom PV system design, shading analysis, maximize energy yield." },
    { icon: <CheckCircleIcon />, title: "Installation & Commissioning", desc: "Professional on-site installation of panels & inverters." },
    { icon: <ThumbUpIcon />, title: "Maintenance & Support", desc: "Preventive maintenance, checks and rapid troubleshooting." },
    { icon: <QuoteIcon />, title: "Battery & Energy Storage", desc: "Battery options, sizing and integration with solar systems." },
    { icon: <ChevronRightIcon />, title: "Inverters & Components", desc: "High-quality inverters & mounting systems supply." },
    { icon: <PhoneIcon />, title: "Financing & Plans", desc: "Flexible payment options and financing partnerships." },
  ];

  return (
    <Box sx={{ py: 10, background: "#070707" }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Typography variant="overline" sx={{ color: "#FFAB46", fontWeight: 800, fontFamily: "JUST Sans ExBold" }}>Our Services</Typography>
          <Typography variant="h3" sx={{ fontWeight: 800, color: "#EAEAEA", mt: 1, fontFamily: "JUST Sans ExBold" }}>Clean, reliable solar solutions</Typography>
          <Typography sx={{ color: "rgba(234,234,234,0.75)", maxWidth: 780, mx: "auto", mt: 2, fontFamily: "JUST Sans Regular" }}>
            We design, install and maintain solar systems for homes and businesses, backed by monitoring and flexible payment options.
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {services.map((s, i) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={i}>
              <Card
                sx={{
                  p: 3,
                  height: "100%",
                  borderRadius: 2,
                  background: "linear-gradient(180deg,#111,#161616)",
                  color: "#EAEAEA",
                  transition: "transform .28s ease, box-shadow .28s ease",
                  "&:hover": { transform: "translateY(-8px)", boxShadow: "0 18px 40px rgba(0,0,0,0.6)" },
                }}
              >
                <Box sx={{ display: "flex", gap: 2, alignItems: "flex-start", mb: 1 }}>
                  <IconButton
                    sx={{
                      background: "rgba(255,255,255,0.03)",
                      color: "#FFAB46",
                      "&:hover": { filter: "drop-shadow(0 6px 16px rgba(255,171,70,0.18))" },
                    }}
                    size="large"
                  >
                    {s.icon}
                  </IconButton>
                  <Typography variant="h6" sx={{ fontWeight: 800, fontFamily: "JUST Sans ExBold" }}>{s.title}</Typography>
                </Box>
                <Typography sx={{ color: "rgba(234,234,234,0.75)", fontFamily: "JUST Sans Regular" }}>{s.desc}</Typography>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 6 }}>
          <Box component="button" sx={{
            border: "none",
            px: 4,
            py: 1.2,
            borderRadius: 2,
            background: "linear-gradient(90deg,#2E7D4D,#289b5a)",
            color: "#fff",
            fontWeight: 800,
            fontFamily: "JUST Sans ExBold",
            cursor: "pointer",
            boxShadow: "0 10px 30px rgba(46,125,77,0.14)",
            "&:hover": { transform: "translateY(-3px)" }
          }}>
            Contact Sales
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <IconButton sx={{ background: "rgba(255,255,255,0.03)", color: "#FFAB46" }}>
              <SendIcon />
            </IconButton>
            <Box>
              <Typography sx={{ fontWeight: 700, color: "#EAEAEA", fontFamily: "JUST Sans ExBold" }}>+234 701 809 0107</Typography>
              <Typography sx={{ color: "rgba(234,234,234,0.7)", fontFamily: "JUST Sans Regular" }}>Talk to an Expert</Typography>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

