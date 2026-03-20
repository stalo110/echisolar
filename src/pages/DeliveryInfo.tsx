import { Box, Container, Paper, Typography } from "@mui/material";
import TopNav from "../navigation/TopNav";
import Footer from "../navigation/Footer";
import { useTheme } from "../contexts/ThemeContext";
import { COMPANY_ADDRESS, COMPANY_PHONE } from "../config/company";

const DeliveryInfo = () => {
  const { theme } = useTheme();

  return (
    <Box sx={{ bgcolor: theme.palette.background.default, color: theme.palette.text.primary, minHeight: "100vh" }}>
      <TopNav />
      <Container sx={{ py: 7 }}>
        <Typography variant="h4" sx={{ fontFamily: "JUST Sans ExBold", mb: 3, color: theme.palette.primary.main }}>
          FAQ / Delivery Information
        </Typography>
        <Paper
          sx={{
            p: { xs: 3, md: 4 },
            borderRadius: 3,
            border: `1px solid ${theme.palette.divider}`,
            background: theme.palette.background.paper,
          }}
        >
          <Typography sx={{ fontFamily: "JUST Sans ExBold", mb: 1.5 }}>Do you offer free delivery?</Typography>
          <Typography sx={{ fontFamily: "JUST Sans Regular", color: theme.palette.text.secondary, mb: 3 }}>
            Yes. Delivery support is available based on your order location and campaign terms. After payment, chat with us on WhatsApp for delivery confirmation.
          </Typography>

          <Typography sx={{ fontFamily: "JUST Sans ExBold", mb: 1.5 }}>How do I track my order?</Typography>
          <Typography sx={{ fontFamily: "JUST Sans Regular", color: theme.palette.text.secondary, mb: 3 }}>
            Sign in to your dashboard and open your order history to monitor payment and fulfillment status in real time.
          </Typography>

          <Typography sx={{ fontFamily: "JUST Sans ExBold", mb: 1.5 }}>Delivery contact</Typography>
          <Typography sx={{ fontFamily: "JUST Sans Regular", color: theme.palette.text.secondary }}>
            Phone/WhatsApp: {COMPANY_PHONE}
          </Typography>
          <Typography sx={{ fontFamily: "JUST Sans Regular", color: theme.palette.text.secondary, mt: 1 }}>
            Pickup/office address: {COMPANY_ADDRESS}
          </Typography>
        </Paper>
      </Container>
      <Footer />
    </Box>
  );
};

export default DeliveryInfo;
