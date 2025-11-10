import { Box, Container, Typography } from "@mui/material";
import TopNav from "../navigation/TopNav";
import Footer from "../navigation/Footer";
import { useLocation } from "react-router-dom";

const PaymentStatus = () => {
  const { search } = useLocation();
  return (
    <Box>
      <TopNav />
      <Container sx={{ py: 6 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3, fontFamily: "JUST Sans ExBold" }}>Payment Status</Typography>
        <Typography color="text.secondary" sx={{ fontFamily: "JUST Sans Regular" }}>Result: {search || 'unknown'}</Typography>
      </Container>
      <Footer />
    </Box>
  )
}

export default PaymentStatus;
