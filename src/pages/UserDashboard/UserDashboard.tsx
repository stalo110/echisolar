import { Box, Typography, Paper, Grid } from "@mui/material";
import { useAuth } from "../../contexts/AuthContext";
import UserDashboardLayout from "../../components/User/UserDashboardLayout";
import { useTheme } from "../../contexts/ThemeContext";

const UserDashboardPage = () => {
  const { user } = useAuth();
  const { theme, mode } = useTheme();

  const subscription = {
    plan: "6 Month Plan",
    status: "Active",
    nextPayment: "2025-11-30",
  };

  const orders = [
    { id: "1", date: "2025-10-15", total: "₦250,000", status: "Delivered" },
    { id: "2", date: "2025-10-20", total: "₦150,000", status: "Shipped" },
  ];

  return (
    <UserDashboardLayout>
      <Grid container spacing={3}>
        {/* Subscription Details */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper
            sx={{
              p: 3,
              background: theme.palette.background.paper,
              border: `1px solid ${theme.palette.divider}`,
              color: theme.palette.text.primary,
              borderRadius: 3,
              boxShadow: mode === 'dark' ? "0 4px 20px rgba(0,0,0,0.4)" : "0 4px 20px rgba(0,0,0,0.1)",
            }}
          >
            <Typography variant="h6" sx={{ mb: 2, color: theme.palette.primary.main, fontFamily: "JUST Sans ExBold" }}>
              Subscription Details
            </Typography>
            <Typography sx={{ fontFamily: "JUST Sans Regular" }}>
              <strong>Plan:</strong> {subscription.plan}
            </Typography>
            <Typography sx={{ fontFamily: "JUST Sans Regular" }}>
              <strong>Status:</strong> {subscription.status}
            </Typography>
            <Typography sx={{ fontFamily: "JUST Sans Regular" }}>
              <strong>Next Payment:</strong> {subscription.nextPayment}
            </Typography>
          </Paper>
        </Grid>

        {/* User Info */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper
            sx={{
              p: 3,
              background: theme.palette.background.paper,
              border: `1px solid ${theme.palette.divider}`,
              color: theme.palette.text.primary,
              borderRadius: 3,
              boxShadow: mode === 'dark' ? "0 4px 20px rgba(0,0,0,0.4)" : "0 4px 20px rgba(0,0,0,0.1)",
            }}
          >
            <Typography variant="h6" sx={{ mb: 2, color: theme.palette.primary.main, fontFamily: "JUST Sans ExBold" }}>
              User Information
            </Typography>
            <Typography sx={{ fontFamily: "JUST Sans Regular" }}>
              <strong>Name:</strong> {user?.name}
            </Typography>
            <Typography sx={{ fontFamily: "JUST Sans Regular" }}>
              <strong>Email:</strong> {user?.email}
            </Typography>
          </Paper>
        </Grid>

        {/* Order History */}
        <Grid size={{ xs: 12 }}>
          <Paper
            sx={{
              p: 3,
              background: theme.palette.background.paper,
              border: `1px solid ${theme.palette.divider}`,
              color: theme.palette.text.primary,
              borderRadius: 3,
              boxShadow: mode === 'dark' ? "0 4px 20px rgba(0,0,0,0.4)" : "0 4px 20px rgba(0,0,0,0.1)",
            }}
          >
            <Typography variant="h6" sx={{ mb: 2, color: theme.palette.primary.main, fontFamily: "JUST Sans ExBold" }}>
              Order History
            </Typography>
            {orders.map((order) => (
              <Box
                key={order.id}
                sx={{
                  py: 1.5,
                  borderBottom: `1px solid ${theme.palette.divider}`,
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  justifyContent: "space-between",
                  alignItems: { sm: "center" },
                  gap: 1,
                }}
              >
                <Typography sx={{ fontFamily: "JUST Sans ExBold" }}>Order #{order.id}</Typography>
                <Typography variant="body2" color="gray" sx={{ fontFamily: "JUST Sans Regular" }}>
                  {order.date} | {order.status} | <strong>{order.total}</strong>
                </Typography>
              </Box>
            ))}
          </Paper>
        </Grid>
      </Grid>
    </UserDashboardLayout>
  );
};

export default UserDashboardPage;