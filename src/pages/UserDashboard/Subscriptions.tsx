import { Typography, Paper, Grid, Chip } from "@mui/material";
import UserDashboardLayout from "../../components/User/UserDashboardLayout";
import { useTheme } from "../../contexts/ThemeContext";

const UserSubscriptions = () => {
  const { theme, mode } = useTheme();
  const activeSubs = [
    {
      plan: "6-Month Solar Plan",
      status: "Active",
      nextPayment: "2025-12-01",
      price: "₦150,000",
    },
  ];

  const pastSubs = [
    {
      plan: "3-Month Solar Plan",
      status: "Expired",
      ended: "2025-09-01",
      price: "₦90,000",
    },
  ];

  return (
    <UserDashboardLayout>
      <Typography
        variant="h4"
        sx={{ fontWeight: "700", color: theme.palette.primary.main, mb: 4, fontFamily: "JUST Sans ExBold" }}
      >
        My Subscriptions
      </Typography>

      <Grid container spacing={3}>
        {activeSubs.map((sub, index) => (
          <Grid size={{ xs: 12, md: 6 }} key={index}>
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
              <Typography variant="h6" sx={{ color: theme.palette.primary.main, fontFamily: "JUST Sans ExBold" }}>
                {sub.plan}
              </Typography>
              <Typography sx={{ fontFamily: "JUST Sans Regular" }}>
                Status: <Chip label={sub.status} color="success" />
              </Typography>
              <Typography sx={{ fontFamily: "JUST Sans Regular" }}>Next Payment: {sub.nextPayment}</Typography>
              <Typography sx={{ fontFamily: "JUST Sans Regular" }}>Amount: {sub.price}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Typography variant="h6" sx={{ mt: 5, mb: 2, color: theme.palette.primary.main, fontFamily: "JUST Sans ExBold" }}>
        Past Subscriptions
      </Typography>
      <Grid container spacing={3}>
        {pastSubs.map((sub, index) => (
          <Grid size={{ xs: 12, md: 6 }} key={index}>
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
              <Typography variant="h6" sx={{ fontFamily: "JUST Sans ExBold" }}>{sub.plan}</Typography>
              <Typography sx={{ fontFamily: "JUST Sans Regular" }}>
                Status: <Chip label={sub.status} color="error" />
              </Typography>
              <Typography sx={{ fontFamily: "JUST Sans Regular" }}>Ended: {sub.ended}</Typography>
              <Typography sx={{ fontFamily: "JUST Sans Regular" }}>Amount: {sub.price}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </UserDashboardLayout>
  );
};

export default UserSubscriptions;