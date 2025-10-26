import { Box, Container, Typography, Paper, Button } from "@mui/material";
import TopNav from "../navigation/TopNav";
import Footer from "../navigation/Footer";

const Addresses = () => {
  return (
    <Box>
      <TopNav />
      <Container sx={{ py: 6 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3 }}>Shipping Addresses</Typography>
        <Paper sx={{ p:2 }}>List and manage shipping addresses here.</Paper>
        <Box mt={2}><Button variant="contained">Add New Address</Button></Box>
      </Container>
      <Footer />
    </Box>
  )
}

export default Addresses;
