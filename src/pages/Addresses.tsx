import { Box, Container, Typography, Paper, Button } from "@mui/material";
import TopNav from "../navigation/TopNav";
import Footer from "../navigation/Footer";

const Addresses = () => {
  return (
    <Box>
      <TopNav />
      <Container sx={{ py: 6 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3, fontFamily: "JUST Sans ExBold" }}>Shipping Addresses</Typography>
        <Paper sx={{ p:2 }}><Typography sx={{ fontFamily: "JUST Sans Regular" }}>List and manage shipping addresses here.</Typography></Paper>
        <Box mt={2}><Button variant="contained" sx={{ fontFamily: "JUST Sans ExBold" }}>Add New Address</Button></Box>
      </Container>
      <Footer />
    </Box>
  )
}

export default Addresses;
