import { Box, Typography, Grid, Paper } from "@mui/material";
import { AdminLayout } from "../components/Admin/AdminLayout";

const AdminDashboard = () => {
  return (
    <AdminLayout>
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" gutterBottom>Dashboard Overview</Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, textAlign: 'center' }}>
              <Typography variant="h6">Total Products</Typography>
              <Typography variant="h3">150</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, textAlign: 'center' }}>
              <Typography variant="h6">Total Users</Typography>
              <Typography variant="h3">500</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, textAlign: 'center' }}>
              <Typography variant="h6">Pending Orders</Typography>
              <Typography variant="h3">12</Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </AdminLayout>
  );
};

export default AdminDashboard;
