import { Box, Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import TopNav from "../navigation/TopNav";
import Footer from "../navigation/Footer";
import { useTheme } from "../contexts/ThemeContext";

const NotFound = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();

  return (
    <Box sx={{ bgcolor: theme.palette.background.default, color: theme.palette.text.primary, minHeight: "100vh" }}>
      <TopNav />
      <Container sx={{ py: 10, textAlign: "center" }}>
        <Typography variant="h2" sx={{ fontFamily: "JUST Sans ExBold", color: theme.palette.primary.main }}>
          404
        </Typography>
        <Typography variant="h5" sx={{ mt: 1, fontFamily: "JUST Sans ExBold" }}>
          Page not found
        </Typography>
        <Typography sx={{ mt: 2, color: theme.palette.text.secondary, fontFamily: "JUST Sans Regular" }}>
          The page you are looking for does not exist or has been moved.
        </Typography>
        <Button
          variant="contained"
          sx={{ mt: 4, textTransform: "none", fontFamily: "JUST Sans ExBold" }}
          onClick={() => navigate("/")}
        >
          Go to Homepage
        </Button>
      </Container>
      <Footer />
    </Box>
  );
};

export default NotFound;
