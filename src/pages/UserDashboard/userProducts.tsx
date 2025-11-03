import { Box, Typography, Grid, Paper, Button } from "@mui/material";
import UserDashboardLayout from "../../components/User/UserDashboardLayout";

const UserProducts = () => {
  const products = [
    {
      name: "Luxury Hair Serum",
      price: "$60",
      status: "Delivered",
      image: "/images/product1.jpg",
    },
    {
      name: "Moisture Lock Conditioner",
      price: "$45",
      status: "Shipped",
      image: "/images/product2.jpg",
    },
  ];

  return (
    <UserDashboardLayout>
      <Typography
        variant="h4"
        sx={{ fontWeight: "700", color: "#C79B3B", mb: 4 }}
      >
        My Products
      </Typography>

      <Grid container spacing={3}>
        {products.map((product, index) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
            <Paper
            sx={{
              p: 3,
              background: "linear-gradient(135deg, #111, #1f1f1f)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "#f5f5f5",
              borderRadius: 3,
              boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
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
              <Typography variant="h6">{product.name}</Typography>
              <Typography sx={{ color: "#C79B3B", mb: 1 }}>
                {product.price}
              </Typography>
              <Typography variant="body2" sx={{ color: "#ccc", mb: 2 }}>
                Status: {product.status}
              </Typography>
              <Button
                variant="contained"
                sx={{
                  bgcolor: "#C79B3B",
                  color: "#000",
                  fontWeight: "600",
                  "&:hover": { bgcolor: "#e1b860" },
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
