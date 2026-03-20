import { Box, Container, Typography, Grid, Button, useMediaQuery } from "@mui/material";
import { alpha } from "@mui/material/styles";
import { useTheme } from "../../contexts/ThemeContext";
import { Link } from "react-router-dom";

export const HeroSection = () => {
  const isMobile = useMediaQuery((muiTheme) => muiTheme.breakpoints.down("md"));
  const { theme, mode } = useTheme();

  return (
    <Box
      sx={{
        position: "relative",
        backgroundImage: `
          linear-gradient(110deg, rgba(7,17,27,0.94) 0%, rgba(7,17,27,0.84) 42%, rgba(7,17,27,0.54) 100%),
          url('/images/solar4.jpg')
        `,
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundAttachment: "fixed",
        color: "#EAEAEA",
        minHeight: "78vh",
        display: "flex",
        alignItems: "center",
        py: { xs: 7, md: 11 },
        borderBottom: `1px solid ${alpha(theme.palette.divider, 0.5)}`,
      }}
    >
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            radial-gradient(circle at 18% 18%, ${alpha(theme.palette.secondary.main, 0.22)} 0%, transparent 30%),
            radial-gradient(circle at 82% 16%, ${alpha(theme.palette.primary.main, 0.22)} 0%, transparent 22%)
          `,
        }}
      />
      <Container maxWidth="lg">
        <Grid container>
          <Grid size={{xs:12, md:8}}>
            <Box sx={{ textAlign: isMobile ? "center" : "left", position: "relative", zIndex: 1 }}>
              <Box
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 1.25,
                  px: 2.2,
                  py: 1,
                  mb: 2.5,
                  borderRadius: 999,
                  border: `1px solid ${alpha("#FFFFFF", 0.18)}`,
                  background: alpha(mode === "dark" ? "#07111B" : "#ffffff", 0.42),
                  backdropFilter: "blur(14px)",
                }}
              >
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    backgroundColor: theme.palette.secondary.light,
                    boxShadow: `0 0 0 6px ${alpha(theme.palette.secondary.light, 0.12)}`,
                  }}
                />
                <Typography
                  sx={{
                    color: "rgba(244,247,248,0.84)",
                    fontSize: "0.82rem",
                    fontWeight: 600,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    fontFamily: "JUST Sans ExBold",
                  }}
                >
                  Solar systems built for homes and business
                </Typography>
              </Box>
              <Typography
                component="h1"
                variant="h1"
                sx={{
                  fontWeight: 700,
                  fontSize: { xs: "2rem", md: "3.3rem", lg: "3.75rem" },
                  lineHeight: 1.02,
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
                sx={{
                  maxWidth: 760,
                  color: "rgba(234,234,234,0.92)",
                  fontWeight: 400,
                  fontSize: { xs: "1rem", md: "1.08rem" },
                  lineHeight: 1.8,
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
                  sx={{
                    background: `linear-gradient(90deg, ${theme.palette.secondary.main}, ${theme.palette.secondary.light})`,
                    color: "#fff",
                    px: 4,
                    py: 1.4,
                    borderRadius: 999,
                    fontWeight: 600,
                    fontFamily: "JUST Sans ExBold",
                    boxShadow: "0 18px 40px rgba(46,125,77,0.2)",
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
                  sx={{
                    background: alpha("#ffffff", 0.08),
                    color: "#fff",
                    px: 4,
                    py: 1.4,
                    borderRadius: 999,
                    fontWeight: 600,
                    fontFamily: "JUST Sans ExBold",
                    border: `1px solid ${alpha("#ffffff", 0.16)}`,
                    backdropFilter: "blur(14px)",
                    "&:hover": {
                      transform: "translateY(-3px)",
                      background: alpha("#ffffff", 0.14),
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
                  <Box key={s.label} sx={{
                    minWidth: { xs: 132, md: 148 },
                    px: 2.5,
                    py: 2.2,
                    borderRadius: 4,
                    textAlign: "center",
                    border: `1px solid ${alpha("#FFFFFF", 0.12)}`,
                    background: alpha("#07111B", 0.42),
                    backdropFilter: "blur(14px)",
                  }}>
                    <Typography sx={{ 
                      color: theme.palette.primary.main, 
                      fontWeight: 700, 
                      fontSize: { xs: "1.35rem", md: "1.6rem" }, 
                      fontFamily: "JUST Sans ExBold",
                    }}>
                      {s.value}
                    </Typography>
                    <Typography sx={{ color: "rgba(234,234,234,0.8)", fontFamily: "JUST Sans Regular", fontSize: "0.92rem" }}>
                      {s.label}
                    </Typography>
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
