import { Box, Container, Typography, Grid, Card, CardContent } from "@mui/material";
import TopNav from "../navigation/TopNav";
import Footer from "../navigation/Footer";

const sampleProjects = [
  { id: 1, title: "Benin Solar Rooftop", summary: "5kW rooftop installation for residential client" },
  { id: 2, title: "Lagos Community Microgrid", summary: "50kW microgrid for community clinic" },
  { id: 3, title: "Ibadan Commercial PV", summary: "20kW system for a small business park" },
];

export default function Projects() {
  return (
    <Box>
      <TopNav />
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
          Projects
        </Typography>
        <Grid container spacing={3}>
          {sampleProjects.map((p) => (
            <Grid size={{ xs: 12, md: 4 }} key={p.id}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{p.title}</Typography>
                  <Typography variant="body2" color="text.secondary">{p.summary}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      <Footer />
    </Box>
  );
}
