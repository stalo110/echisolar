import { Box, Typography, Grid, Paper, Button } from "@mui/material";
import UserDashboardLayout from "../../components/User/UserDashboardLayout";
import { useTheme } from "../../contexts/ThemeContext";

const UserProducts = () => {
  const { theme, mode } = useTheme();
  const products = [
    {
      name: "Solar Panel 250W",
      price: "₦95,000",
      status: "Delivered",
      image: "/images/solar.jpg",
    },
    {
      name: "Inverter 5KVA",
      price: "₦220,000",
      status: "Shipped",
      image: "/images/solar2.jpg",
    },
  ];

  return (
    <UserDashboardLayout>
      <Typography
        variant="h4"
        sx={{ fontWeight: "700", color: theme.palette.primary.main, mb: 4, fontFamily: "JUST Sans ExBold" }}
      >
        My Products
      </Typography>

      <Grid container spacing={3}>
        {products.map((product, index) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
            <Paper
            sx={{
              p: 3,
              background: theme.palette.background.paper,
              border: `1px solid ${theme.palette.divider}`,
              color: theme.palette.text.primary,
              borderRadius: 3,
              boxShadow: mode === 'dark' ? "0 4px 20px rgba(0,0,0,0.4)" : "0 4px 20px rgba(0,0,0,0.1)",
            }}
          >
              <Box
                component="img"
                src={product.image}
                alt={product.name}
                sx={{
                  width: "100%",
                  height: 160,
                  objectFit: "cover",
                  borderRadius: 2,
                  mb: 2,
                }}
              />
              <Typography variant="h6" sx={{ fontFamily: "JUST Sans ExBold" }}>{product.name}</Typography>
              <Typography sx={{ color: theme.palette.primary.main, mb: 1, fontFamily: "JUST Sans ExBold" }}>
                {product.price}
              </Typography>
              <Typography variant="body2" sx={{ color: theme.palette.text.secondary, mb: 2, fontFamily: "JUST Sans Regular" }}>
                Status: {product.status}
              </Typography>
              <Button
                variant="contained"
                sx={{
                  bgcolor: theme.palette.primary.main,
                  color: mode === 'dark' ? "#000" : "#fff",
                  fontWeight: "600",
                  fontFamily: "JUST Sans ExBold",
                  "&:hover": { bgcolor: theme.palette.primary.dark },
                }}
              >
                View Details
              </Button>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </UserDashboardLayout>
  );
};

export default UserProducts;