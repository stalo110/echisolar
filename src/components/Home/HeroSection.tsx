import { Box, Container, Typography, Grid, Button, useMediaQuery } from "@mui/material";
import { ChevronRight as ChevronRightIcon, Send as SendIcon } from "@mui/icons-material";
import { useTheme } from "../../contexts/ThemeContext";
import { Link } from "react-router-dom";

export const HeroSection = () => {
  const isMobile = useMediaQuery((muiTheme) => muiTheme.breakpoints.down("md"));
  const { theme } = useTheme();

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
                  fontFamily:"JUST Sans ExBold"
                }}
              >
                Powering a{" "}
                <Box component="span" sx={{ color: theme.palette.primary.main, display: "inline-block" }}>
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
                  fontFamily:"JUST Sans Regular"
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
                  component={Link}
                  to="/register"
                  variant="contained"
                  size="large"
                  endIcon={<SendIcon />}
                  sx={{
                    background: `linear-gradient(90deg, ${theme.palette.secondary.main}, ${theme.palette.secondary.light})`,
                    color: "#fff",
                    px: 4,
                    py: 1.4,
                    borderRadius: 2,
                    fontWeight: 700,
                    fontFamily: "JUST Sans ExBold",
                    boxShadow: "0 8px 30px rgba(46,125,77,0.16)",
                    transition: "transform .18s ease, box-shadow .18s ease",
                    "&:hover": {
                      transform: "translateY(-3px)",
                      boxShadow: "0 14px 40px rgba(46,125,77,0.22)",
                      background: `linear-gradient(90deg, ${theme.palette.secondary.dark}, ${theme.palette.secondary.main})`,
                    },
                  }}
                >
                  Get Started
                </Button>

                <Button
                  component={Link}
                  to="/products"
                  variant="contained"
                  size="large"
                  endIcon={<ChevronRightIcon />}
                  sx={{
                    background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
                    color: "#000",
                    px: 4,
                    py: 1.4,
                    borderRadius: 2,
                    fontWeight: 700,
                    fontFamily: "JUST Sans ExBold",
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
                ].map((s, i) => (
                  <Box key={s.label} sx={{ 
                    textAlign: "center",
                    animation: `fadeInUp 1s ease-out ${i * 0.2}s both`,
                    "@keyframes fadeInUp": {
                      "0%": { opacity: 0, transform: "translateY(30px)" },
                      "100%": { opacity: 1, transform: "translateY(0)" }
                    }
                  }}>
                    <Typography sx={{ 
                      color: theme.palette.primary.main, 
                      fontWeight: 800, 
                      fontSize: "1.6rem", 
                      fontFamily: "JUST Sans ExBold",
                      animation: "countUp 2s ease-out",
                      "@keyframes countUp": {
                        "0%": { transform: "scale(0.5)" },
                        "50%": { transform: "scale(1.1)" },
                        "100%": { transform: "scale(1)" }
                      }
                    }}>
                      {s.value}
                    </Typography>
                    <Typography sx={{ color: "rgba(234,234,234,0.8)", fontFamily: "JUST Sans Regular" }}>{s.label}</Typography>
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
