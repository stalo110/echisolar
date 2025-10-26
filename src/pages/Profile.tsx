import { Box, Container, Typography, Grid, Paper, Button } from "@mui/material";
import TopNav from "../navigation/TopNav";
import Footer from "../navigation/Footer";

const Profile = () => {
  return (
    <Box>
      <TopNav />
      <Container sx={{ py: 6 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3 }}>My Profile</Typography>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Paper sx={{ p:2 }}>Profile summary and addresses</Paper>
          </Grid>
          <Grid size={{ xs: 12, md: 8 }}>
            <Paper sx={{ p:2 }}>Orders, wishlist and settings</Paper>
          </Grid>
        </Grid>
        <Box mt={2}><Button variant="outlined">Edit Profile</Button></Box>
      </Container>
      <Footer />
    </Box>
  )
}

export default Profile;
