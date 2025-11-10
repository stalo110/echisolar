import { Box, Container, Typography, Grid } from "@mui/material";

export const PartnersSection = () => {
  const partners = [
    { name: "SolarEdge", logo: "/images/lglogo.png" },
    { name: "LG Solar", logo: "/images/lglogo.png" },
    { name: "Tesla Powerwall", logo: "/images/lglogo.png" },
    { name: "Canadian Solar", logo: "/images/lglogo.png" },
    { name: "SMA Solar", logo: "/images/lglogo.png" },
    { name: "Jinko Solar", logo: "/images/lglogo.png" },
  ];

  return (
    <Box sx={{ py: 8, background: "linear-gradient(180deg, #070707, #0d0d0d)" }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Typography variant="overline" sx={{ color: "#FFAB46", fontWeight: 800, fontFamily: "JUST Sans ExBold" }}>
            Trusted Partnerships
          </Typography>
          <Typography variant="h3" sx={{ fontWeight: 800, color: "#EAEAEA", mt: 1, fontFamily: "JUST Sans ExBold" }}>
            Our Technology Partners
          </Typography>
          <Typography sx={{ color: "rgba(234,234,234,0.7)", maxWidth: 700, mx: "auto", mt: 2, fontFamily: "JUST Sans Regular" }}>
            We partner with world-leading manufacturers to bring you the most reliable and efficient solar technology available.
          </Typography>
        </Box>

        <Grid container spacing={4} justifyContent="center" alignItems="center">
          {partners.map((p, i) => (
            <Grid size={{xs: 6, sm: 4, md: 2}} key={i}>
              <Box
                sx={{
                  textAlign: "center",
                  p: 2,
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
                    // filter: "grayscale(100%) contrast(.9)",
                    opacity: 0.75,
                    transition: "filter .3s ease, opacity .3s ease",
                    "&:hover": { filter: "grayscale(0%)", opacity: 1 },
                    mx: "auto",
                  }}
                />
                <Typography variant="caption" sx={{ display: "block", mt: 1, color: "rgba(234,234,234,0.7)", fontFamily: "JUST Sans Regular" }}>
                  {p.name}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

