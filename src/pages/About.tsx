import { Box, Container, Typography, Grid, Paper } from "@mui/material";
import TopNav from "../navigation/TopNav";
import Footer from "../navigation/Footer";

const About = () => {
  return (
    <Box>
      <TopNav />
      <Container sx={{ py: 6 }}>
        <Typography variant="h3" sx={{ fontWeight: 'bold', mb:3 }}>About Echi Solar</Typography>
        <Grid container spacing={2}>
          <Grid size={{ xs:12, md:6 }}>
            <Paper sx={{ p:3 }}>
              <Typography variant="h6">Our Mission</Typography>
              <Typography color="text.secondary">Echi Solar provides reliable solar solutions for homes and businesses. We focus on quality, affordability and local support.</Typography>
            </Paper>
          </Grid>
          <Grid size={{ xs:12, md:6 }}>
            <Paper sx={{ p:3 }}>
              <Typography variant="h6">Why Choose Us</Typography>
              <Typography color="text.secondary">We combine local expertise with global-standard products, simple financing, and excellent service.</Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </Box>
  )
}

export default About;
