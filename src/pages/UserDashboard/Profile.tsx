import {
  Box,
  Typography,
  Grid,
  Paper,
  Button,
  Avatar,
  Divider,
} from "@mui/material";
import UserDashboardLayout from "../../components/User/UserDashboardLayout";
import { useTheme } from "../../contexts/ThemeContext";

const Profile = () => {
  const { theme, mode } = useTheme();
  const user = {
    name: "John Doe",
    email: "john@example.com",
    phone: "+1 234 567 890",
    address: "123 Luxury Avenue, Lagos, Nigeria",
    joined: "March 2024",
  };

  return (
    <UserDashboardLayout>
      <Typography
        variant="h4"
        sx={{ fontWeight: "700", color: theme.palette.primary.main, mb: 4, fontFamily: "JUST Sans ExBold" }}
      >
        My Profile
      </Typography>

      <Grid container spacing={3}>
        {/* Summary Card */}
        <Grid size={{ xs: 12, md: 5 }}>
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
            <Box sx={{ textAlign: "center" }}>
              <Avatar
                sx={{
                  width: 100,
                  height: 100,
                  mb: 2,
                  mx: "auto",
                  bgcolor: theme.palette.primary.main,
                  fontSize: 32,
                }}
              >
                {user.name.charAt(0)}
              </Avatar>
              <Typography variant="h6" sx={{ fontFamily: "JUST Sans ExBold" }}>{user.name}</Typography>
              <Typography variant="body2" sx={{ color: theme.palette.text.secondary, fontFamily: "JUST Sans Regular" }}>
                {user.email}
              </Typography>
            </Box>

            <Divider sx={{ my: 3, borderColor: theme.palette.divider }} />

            <Typography variant="body2" sx={{ fontFamily: "JUST Sans Regular" }}>
              <strong>Phone:</strong> {user.phone}
            </Typography>
            <Typography variant="body2" sx={{ fontFamily: "JUST Sans Regular" }}>
              <strong>Address:</strong> {user.address}
            </Typography>
            <Typography variant="body2" sx={{ fontFamily: "JUST Sans Regular" }}>
              <strong>Member since:</strong> {user.joined}
            </Typography>
          </Paper>
        </Grid>

        {/* Account Overview */}
        <Grid size={{ xs: 12, md: 7 }}>
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
            <Typography variant="h6" sx={{ color: theme.palette.primary.main, mb: 2, fontFamily: "JUST Sans ExBold" }}>
              Account Overview
            </Typography>
            <Typography sx={{ mb: 1, fontFamily: "JUST Sans Regular" }}>Orders: 12</Typography>
            <Typography sx={{ mb: 1, fontFamily: "JUST Sans Regular" }}>Wishlist Items: 8</Typography>
            <Typography sx={{ mb: 1, fontFamily: "JUST Sans Regular" }}>Active Subscription: Yes</Typography>
            <Typography sx={{ mb: 1, fontFamily: "JUST Sans Regular" }}>Total Spent: $1,200</Typography>

            <Box mt={3}>
              <Button
                variant="contained"
                sx={{
                  bgcolor: theme.palette.primary.main,
                  color: mode === 'dark' ? "#000" : "#fff",
                  fontWeight: "600",
                  fontFamily: "JUST Sans ExBold",
                  "&:hover": { bgcolor: theme.palette.primary.dark },
                }}
              >
                Edit Profile
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </UserDashboardLayout>
  );
};

export default Profile;