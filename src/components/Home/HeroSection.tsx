import { Box, Container, Typography, Grid, Button, useMediaQuery } from "@mui/material";
import { ChevronRight as ChevronRightIcon, Send as SendIcon } from "@mui/icons-material";

export const HeroSection = () => {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const AMBER = "#FFAB46";
  const GREEN = "#2E7D4D";

  return (
    <Box
      sx={{
        position: "relative",
        backgroundImage: `
          linear-gradient(180deg, rgba(5,6,8,0.65), rgba(5,6,8,0.75)),
          url('/images/heroImage.jpg')
        `,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        color: "#EAEAEA",
        minHeight: "80vh",
        display: "flex",
        alignItems: "center",
        py: { xs: 6, md: 12 },
      }}
    >
      <Container maxWidth="lg">
        <Grid container>
          <Grid size={{xs:12, md:8}}>
            <Box sx={{ textAlign: isMobile ? "center" : "left" }}>
              <Typography
                component="h1"
                variant="h1"
                sx={{
                  fontWeight: 800,
                  fontSize: { xs: "2.2rem", md: "3.8rem" },
                  lineHeight: 1.05,
                  mb: 2,
                  letterSpacing: "-0.02em",
                  textShadow: "0 6px 24px rgba(2,2,2,0.6)",
                }}
              >
                Powering a{" "}
                <Box component="span" sx={{ color: AMBER, display: "inline-block" }}>
                  Brighter Future
                </Box>{" "}
                with Solar Energy
              </Typography>

              <Typography
                variant="h6"
                sx={{
                  maxWidth: 760,
                  color: "rgba(234,234,234,0.92)",
                  fontWeight: 400,
                  mb: 4,
                }}
              >
                Delivering reliable solar solutions that reduce costs, promote sustainability,
                and harness the power of the sun to energize homes, businesses, and communities.
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  justifyContent: isMobile ? "center" : "flex-start",
                  flexWrap: "wrap",
                }}
              >
                <Button
                  variant="contained"
                  size="large"
                  endIcon={<SendIcon />}
                  sx={{
                    background: `linear-gradient(90deg, ${GREEN}, #289b5a)`,
                    color: "#fff",
                    px: 4,
                    py: 1.4,
                    borderRadius: 2,
                    fontWeight: 700,
                    boxShadow: "0 8px 30px rgba(46,125,77,0.16)",
                    transition: "transform .18s ease, box-shadow .18s ease",
                    "&:hover": {
                      transform: "translateY(-3px)",
                      boxShadow: "0 14px 40px rgba(46,125,77,0.22)",
                      background: `linear-gradient(90deg, #245c41, ${GREEN})`,
                    },
                  }}
                >
                  Get Started
                </Button>

                <Button
                  variant="contained"
                  size="large"
                  endIcon={<ChevronRightIcon />}
                  sx={{
                    background: `linear-gradient(90deg, ${AMBER}, #ffbf6d)`,
                    color: "#000",
                    px: 4,
                    py: 1.4,
                    borderRadius: 2,
                    fontWeight: 700,
                    boxShadow: "0 8px 30px rgba(255,171,70,0.12)",
                    "&:hover": {
                      transform: "translateY(-3px)",
                      boxShadow: "0 14px 40px rgba(255,171,70,0.18)",
                    },
                  }}
                >
                  Our Products
                </Button>
              </Box>

              {/* Stats */}
              <Box
                sx={{
                  display: "flex",
                  gap: 4,
                  mt: 6,
                  flexWrap: "wrap",
                  justifyContent: isMobile ? "center" : "flex-start",
                }}
              >
                {[
                  { label: "Happy Customers", value: "500+" },
                  { label: "Installed Capacity", value: "5MW+" },
                  { label: "Average Savings", value: "85%" },
                ].map((s) => (
                  <Box key={s.label} sx={{ textAlign: "center" }}>
                    <Typography sx={{ color: AMBER, fontWeight: 800, fontSize: "1.6rem" }}>
                      {s.value}
                    </Typography>
                    <Typography sx={{ color: "rgba(234,234,234,0.8)" }}>{s.label}</Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
