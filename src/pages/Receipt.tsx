import { Box, Container, Typography, Paper } from "@mui/material";
import TopNav from "../navigation/TopNav";
import Footer from "../navigation/Footer";
import { useParams } from "react-router-dom";

const Receipt = () => {
  const { id } = useParams();
  return (
    <Box>
      <TopNav />
      <Container sx={{ py: 6 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3 }}>Receipt #{id}</Typography>
        <Paper sx={{ p:3 }}>
          <Typography>Receipt details and payment summary will be shown here.</Typography>
        </Paper>
      </Container>
      <Footer />
    </Box>
  )
}

export default Receipt;
