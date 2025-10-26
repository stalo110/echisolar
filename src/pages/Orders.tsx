import { Box, Container, Typography } from "@mui/material";
import TopNav from "../navigation/TopNav";
import Footer from "../navigation/Footer";

const Orders = () => {
  return (
    <Box>
      <TopNav />
      <Container sx={{ py: 6 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3 }}>My Orders</Typography>
        <Typography color="text.secondary">List of past and active orders will appear here.</Typography>
      </Container>
      <Footer />
    </Box>
  )
}

export default Orders;
