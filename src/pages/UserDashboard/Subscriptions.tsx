import { Typography, Paper, Grid, Chip } from "@mui/material";
import UserDashboardLayout from "../../components/User/UserDashboardLayout";

const UserSubscriptions = () => {
  const activeSubs = [
    {
      plan: "6-Month Premium",
      status: "Active",
      nextPayment: "2025-12-01",
      price: "$150",
    },
  ];

  const pastSubs = [
    {
      plan: "3-Month Standard",
      status: "Expired",
      ended: "2025-09-01",
      price: "$90",
    },
  ];

  return (
    <UserDashboardLayout>
      <Typography
        variant="h4"
        sx={{ fontWeight: "700", color: "#C79B3B", mb: 4 }}
      >
        My Subscriptions
      </Typography>

      <Grid container spacing={3}>
        {activeSubs.map((sub, index) => (
          <Grid size={{ xs: 12, md: 6 }} key={index}>
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
              <Typography variant="h6" sx={{ color: "#C79B3B" }}>
                {sub.plan}
              </Typography>
              <Typography>
                Status: <Chip label={sub.status} color="success" />
              </Typography>
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
          <Grid size={{ xs: 12, md: 6 }} key={index}>
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
              <Typography variant="h6">{sub.plan}</Typography>
              <Typography>
                Status: <Chip label={sub.status} color="error" />
              </Typography>
              <Typography>Ended: {sub.ended}</Typography>
              <Typography>Amount: {sub.price}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </UserDashboardLayout>
  );
};

export default UserSubscriptions;
