import { Box, Container, Typography, Button } from "@mui/material";
import TopNav from "../navigation/TopNav";

const AdminProducts = () => {
  return (
    <Box>
      <TopNav />
      <Container sx={{ py: 6 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3 }}>Admin — Products</Typography>
        <Button variant="contained" color="success">Create New Product</Button>
        <Box mt={2}>
          <Typography color="text.secondary">Product management table goes here.</Typography>
        </Box>
      </Container>
    </Box>
  )
}

export default AdminProducts;
