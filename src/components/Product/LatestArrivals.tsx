import { Box, Container, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { fetchProducts } from "../../services/productService";
import type { Product } from "../../services/productService";

export const LatestArrivals = () => {
  const [items, setItems] = useState<Product[]>([]);

  useEffect(() => {
    fetchProducts().then((ps) => setItems(ps.filter((p) => p.isLatestArrival)));
  }, []);

  if (items.length === 0) return null;

  return (
    <Box
      component="section"
      sx={{
        py: 10,
        bgcolor: "#0c0f14",
        color: "#fff",
        position: "relative",
      }}
    >
      <Container>
        <Typography
          variant="h3"
          sx={{
            fontWeight: "bold",
            mb: 6,
            textAlign: "center",
            fontFamily: "JUST Sans ExBold",
            background: 'linear-gradient(90deg, #e48a1cff, #FFAB46)',
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontSize: { xs: "2.2rem", md: "3.8rem" },
          }}
        >
          Latest Arrivals
        </Typography>

        <Grid container spacing={4}>
          {items.map((i) => (
            <Grid size={{xs:12, sm:6, md:4}} key={i.id}>
              <ProductCard product={i} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default LatestArrivals;
