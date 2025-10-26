import { Box, Container, Grid, Paper, Typography } from "@mui/material";
import TopNav from "../navigation/TopNav";

const AdminDashboard = () => {
  return (
    <Box>
      <TopNav />
      <Container sx={{ py: 6 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3 }}>Admin Dashboard</Typography>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 4 }}><Paper sx={{ p:2 }}>Total Sales</Paper></Grid>
          <Grid size={{ xs: 12, md: 4 }}><Paper sx={{ p:2 }}>Orders</Paper></Grid>
          <Grid size={{ xs: 12, md: 4 }}><Paper sx={{ p:2 }}>Top Products</Paper></Grid>
        </Grid>
      </Container>
    </Box>
  )
}

export default AdminDashboard;
