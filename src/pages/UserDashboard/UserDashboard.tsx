import { Box, Typography, Paper, Grid } from "@mui/material";
import { useAuth } from "../../contexts/AuthContext";
import UserDashboardLayout from "../../components/User/UserDashboardLayout";

const UserDashboardPage = () => {
  const { user } = useAuth();

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
              background: "linear-gradient(135deg, #111, #1f1f1f)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "#f5f5f5",
              borderRadius: 3,
              boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
            }}
          >
            <Typography variant="h6" sx={{ mb: 2, color: "#FFAB46" }}>
              Subscription Details
            </Typography>
            <Typography>
              <strong>Plan:</strong> {subscription.plan}
            </Typography>
            <Typography>
              <strong>Status:</strong> {subscription.status}
            </Typography>
            <Typography>
              <strong>Next Payment:</strong> {subscription.nextPayment}
            </Typography>
          </Paper>
        </Grid>

        {/* User Info */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper
            sx={{
              p: 3,
              background: "linear-gradient(135deg, #111, #1f1f1f)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "#f5f5f5",
              borderRadius: 3,
              boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
            }}
          >
            <Typography variant="h6" sx={{ mb: 2, color: "#FFAB46" }}>
              User Information
            </Typography>
            <Typography>
              <strong>Name:</strong> {user?.name}
            </Typography>
            <Typography>
              <strong>Email:</strong> {user?.email}
            </Typography>
          </Paper>
        </Grid>

        {/* Order History */}
        <Grid size={{ xs: 12 }}>
          <Paper
            sx={{
              p: 3,
              background: "linear-gradient(135deg, #111, #1f1f1f)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "#f5f5f5",
              borderRadius: 3,
              boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
            }}
          >
            <Typography variant="h6" sx={{ mb: 2, color: "#FFAB46" }}>
              Order History
            </Typography>
            {orders.map((order) => (
              <Box
                key={order.id}
                sx={{
                  py: 1.5,
                  borderBottom: "1px solid rgba(255,255,255,0.1)",
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  justifyContent: "space-between",
                  alignItems: { sm: "center" },
                  gap: 1,
                }}
              >
                <Typography>Order #{order.id}</Typography>
                <Typography variant="body2" color="gray">
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
