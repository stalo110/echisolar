import { Box, Container, Typography, Grid, useMediaQuery } from "@mui/material";

export const HeroSection = () => {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("md"));

  return (
    <Box
      sx={{
        position: "relative",
        backgroundImage: `
          linear-gradient(180deg, rgba(0,0,0,0.75), rgba(0,0,0,0.9)),
          url('/images/projectsHeroImage.jpg')
        `,
        minHeight: "75vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        color: "#fff",
        overflow: "hidden",
        py: 8,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="center">
          <Grid size={{xs:12, md:8}}>
            <Box sx={{ textAlign: isMobile ? "center" : "left" }}>
              <Typography
                variant="h1"
                sx={{
                  fontWeight: 800,
                  fontSize: isMobile ? "2.8rem" : "4rem",
                  background: "linear-gradient(90deg, #FFAB46, #FFD18A)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  textShadow: "0 0 15px rgba(255,171,70,0.4)",
                }}
              >
                Our Projects
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  mt: 2,
                  color: "rgba(255,255,255,0.8)",
                  maxWidth: 600,
                }}
              >
                Check out the projects we have excuted so far.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* Decorative glow overlay */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background:
            "radial-gradient(circle at 20% 80%, rgba(46,125,77,0.25), transparent 70%)",
          pointerEvents: "none",
        }}
      />
    </Box>
  );
};
