import { Box, Container, Typography, Paper, Grid, Chip } from "@mui/material";
import TopNav from "../navigation/TopNav";
import Footer from "../navigation/Footer";
import DashboardSidebar from "../components/DashboardSidebar";

const Subscriptions = () => {
  const activeSubs = [
    { plan: "6-Month Premium", status: "Active", nextPayment: "2025-12-01", price: "$150" },
  ];

  const pastSubs = [
    { plan: "3-Month Standard", status: "Expired", ended: "2025-09-01", price: "$90" },
  ];

  return (
    <Box sx={{ bgcolor: "#0B0C10", color: "#fff", minHeight: "100vh" }}>
      <TopNav />
      <Container sx={{ py: 6 }}>
        <Grid container spacing={3}>
          {/* Sidebar */}
          <Grid sx={{xs:12, md:3}}>
            <DashboardSidebar />
          </Grid>

          {/* Content */}
          <Grid sx={{xs:12, md:9}}>
            <Typography variant="h4" sx={{ fontWeight: "700", color: "#C79B3B", mb: 4 }}>
              My Subscriptions
            </Typography>

            <Grid container spacing={3}>
              {activeSubs.map((sub, index) => (
                <Grid sx={{xs:12, md:6}} key={index}>
                  <Paper sx={{ p: 3, bgcolor: "#1F2833", borderRadius: 3 }}>
                    <Typography variant="h6" sx={{ color: "#C79B3B" }}>{sub.plan}</Typography>
                    <Typography>Status: <Chip label={sub.status} color="success" /></Typography>
                    <Typography>Next Payment: {sub.nextPayment}</Typography>
                    <Typography>Amount: {sub.price}</Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>

            <Typography variant="h6" sx={{ mt: 5, mb: 2, color: "#C79B3B" }}>
              Past Subscriptions
            </Typography>
            <Grid container spacing={3}>
              {pastSubs.map((sub, index) => (
                <Grid sx={{xs:12, md:6}} key={index}>
                  <Paper sx={{ p: 3, bgcolor: "#1F2833", borderRadius: 3 }}>
                    <Typography variant="h6">{sub.plan}</Typography>
                    <Typography>Status: <Chip label={sub.status} color="error" /></Typography>
                    <Typography>Ended: {sub.ended}</Typography>
                    <Typography>Amount: {sub.price}</Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </Box>
  );
};

export default Subscriptions;

