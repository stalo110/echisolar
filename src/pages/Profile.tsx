import { Box, Container, Typography, Grid, Paper, Button, Avatar, Divider } from "@mui/material";
import TopNav from "../navigation/TopNav";
import Footer from "../navigation/Footer";
import DashboardSidebar from "../components/DashboardSidebar";

const Profile = () => {
  const user = {
    name: "John Doe",
    email: "john@example.com",
    phone: "+1 234 567 890",
    address: "123 Luxury Avenue, Lagos, Nigeria",
    joined: "March 2024",
  };

  return (
    <Box sx={{ bgcolor: "#0B0C10", color: "#fff", minHeight: "100vh" }}>
      <TopNav />
      <Container sx={{ py: 6 }}>
        <Grid container spacing={3}>
          {/* Sidebar */}
          <Grid sx={{xs:12, md:3}}>
            <DashboardSidebar />
          </Grid>

          {/* Profile Details */}
          <Grid sx={{xs:12, md:9}}>
            <Typography variant="h4" sx={{ fontWeight: "700", color: "#C79B3B", mb: 4 }}>
              My Profile
            </Typography>

            <Grid container spacing={3}>
              {/* Summary Card */}
              <Grid sx={{xs:12, md:5}}>
                <Paper
                  sx={{
                    bgcolor: "#1F2833",
                    p: 3,
                    borderRadius: 3,
                    boxShadow: "0 0 25px rgba(0,0,0,0.4)",
                  }}
                >
                  <Box sx={{ textAlign: "center" }}>
                    <Avatar
                      sx={{
                        width: 100,
                        height: 100,
                        mb: 2,
                        mx: "auto",
                        bgcolor: "#C79B3B",
                        fontSize: 32,
                      }}
                    >
                      {user.name.charAt(0)}
                    </Avatar>
                    <Typography variant="h6">{user.name}</Typography>
                    <Typography variant="body2" sx={{ color: "#ccc" }}>
                      {user.email}
                    </Typography>
                  </Box>

                  <Divider sx={{ my: 3, borderColor: "rgba(255,255,255,0.1)" }} />

                  <Typography variant="body2"><strong>Phone:</strong> {user.phone}</Typography>
                  <Typography variant="body2"><strong>Address:</strong> {user.address}</Typography>
                  <Typography variant="body2"><strong>Member since:</strong> {user.joined}</Typography>
                </Paper>
              </Grid>

              {/* Account Overview */}
              <Grid sx={{xs:12, md:7}}>
                <Paper
                  sx={{
                    bgcolor: "#1F2833",
                    p: 3,
                    borderRadius: 3,
                    boxShadow: "0 0 25px rgba(0,0,0,0.4)",
                  }}
                >
                  <Typography variant="h6" sx={{ color: "#C79B3B", mb: 2 }}>
                    Account Overview
                  </Typography>
                  <Typography sx={{ mb: 1 }}>Orders: 12</Typography>
                  <Typography sx={{ mb: 1 }}>Wishlist Items: 8</Typography>
                  <Typography sx={{ mb: 1 }}>Active Subscription: Yes</Typography>
                  <Typography sx={{ mb: 1 }}>Total Spent: $1,200</Typography>

                  <Box mt={3}>
                    <Button
                      variant="contained"
                      sx={{
                        bgcolor: "#C79B3B",
                        color: "#000",
                        fontWeight: "600",
                        "&:hover": { bgcolor: "#e1b860" },
                      }}
                    >
                      Edit Profile
                    </Button>
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </Box>
  );
};

export default Profile;
