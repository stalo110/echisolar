import { Box, Container, Typography, Grid, Card, CardContent, Button } from "@mui/material";
import { alpha } from "@mui/material/styles";
import { SolarPower as SolarPowerIcon, EmojiObjects as EmojiObjectsIcon } from "@mui/icons-material";
import { useTheme } from "../../contexts/ThemeContext";
import { Link } from "react-router-dom";

type AboutSectionProps = {
  showButton?: boolean;
};

export const AboutSection = ({ showButton = true }: AboutSectionProps) => {
  const { theme, mode } = useTheme();
  
  return (
    <Box sx={{ 
      py: 10, 
      background: "transparent",
      position: "relative",
      overflow: "hidden"
    }}>
      <Container maxWidth="lg">
        <Grid container spacing={6} alignItems="center">
          <Grid size={{xs:12, md:6}}>
            <Typography
              variant="h6"
              sx={{
                color: theme.palette.primary.main,
                fontWeight: 600,
                fontFamily: "JUST Sans ExBold",
                textTransform: "uppercase",
                letterSpacing: 2,
                fontSize: { xs: "0.82rem", md: "1.05rem" },
                mb: 2,
              }}
            >
              About EchiSolar
            </Typography>
            <Typography variant="h2" sx={{ fontWeight: 600, color: theme.palette.text.primary, fontFamily: "JUST Sans ExBold", fontSize: { xs: "1.95rem", md: "3.05rem" }, lineHeight: 1.08 }}>
              Leading solar solutions for Nigeria
            </Typography>
            <Typography sx={{ color: theme.palette.text.secondary, mt: 2, fontFamily: "JUST Sans Regular", lineHeight: 1.8 }}>
              EchiSolar designs, installs, and supports dependable solar systems for homes and businesses across Nigeria.
            </Typography>

            <Box sx={{ my: 4 }}>
              <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
                <SolarPowerIcon sx={{ color: theme.palette.secondary.main, mt: 0.5 }} />
                <Box>
                  <Typography sx={{ fontWeight: 600, color: theme.palette.text.primary, fontFamily: "JUST Sans ExBold" }}>End-to-End Solar Solutions</Typography>
                  <Typography sx={{ color: theme.palette.text.secondary, fontFamily: "JUST Sans Regular", lineHeight: 1.8 }}>We handle consultation, installation, and maintenance in one streamlined service.</Typography>
                </Box>
              </Box>

              <Box sx={{ display: "flex", gap: 2 }}>
                <EmojiObjectsIcon sx={{ color: theme.palette.primary.main, mt: 0.5 }} />
                <Box>
                  <Typography sx={{ fontWeight: 600, color: theme.palette.text.primary, fontFamily: "JUST Sans ExBold" }}>Sustainable Energy Future</Typography>
                  <Typography sx={{ color: theme.palette.text.secondary, fontFamily: "JUST Sans Regular", lineHeight: 1.8 }}>Our solutions lower energy costs and support a cleaner future.</Typography>
                </Box>
              </Box>
            </Box>

            {showButton && (
              <Button
                component={Link}
                to="/about"
                variant="outlined"
                sx={{
                  color: theme.palette.text.primary,
                  borderColor: theme.palette.divider,
                  borderRadius: 999,
                  px: 3,
                  fontFamily: "JUST Sans ExBold",
                }}
              >
                More About Us
              </Button>
            )}
          </Grid>

          <Grid size={{xs:12, md:6}}>
            <Box sx={{ position: "relative", p: { md: 1 } }}>
              <Box
                sx={{
                  p: 1.2,
                  borderRadius: 5,
                  border: `1px solid ${theme.palette.divider}`,
                  background: mode === "dark" ? alpha("#10202A", 0.74) : alpha("#FFFFFF", 0.82),
                  boxShadow: mode === "dark" ? "0 24px 58px rgba(3,10,18,0.28)" : "0 20px 52px rgba(15,23,42,0.1)",
                }}
              >
                <Box
                  component="img"
                  src="/images/prince_project.jpeg"
                  alt="Professional solar installation"
                  sx={{
                    width: "100%",
                    height: { xs: 280, md: 420 },
                    objectFit: "cover",
                    objectPosition: "center",
                    borderRadius: 4,
                    display: "block",
                  }}
                />
              </Box>
              <Card sx={{ position: "absolute", bottom: -10, right: -10, borderRadius: 4, background: `linear-gradient(90deg,${theme.palette.secondary.main},${theme.palette.secondary.light})`, color: "#fff", boxShadow: `0 18px 42px ${alpha(theme.palette.secondary.main, 0.28)}` }}>
                <CardContent sx={{ p: 2, textAlign: "center", minWidth: 140 }}>
                  <Typography variant="h4" sx={{ fontWeight: 700, fontFamily: "JUST Sans ExBold" }}>500+</Typography>
                  <Typography variant="body2" sx={{ fontFamily: "JUST Sans Regular" }}>Solar Installations</Typography>
                </CardContent>
              </Card>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
