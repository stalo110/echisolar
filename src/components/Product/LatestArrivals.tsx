import { Box, Container, Grid, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";
import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { fetchProducts } from "../../services/productService";
import type { Product } from "../../services/productService";
import { useTheme } from "../../contexts/ThemeContext";

export const LatestArrivals = () => {
  const [items, setItems] = useState<Product[]>([]);
  const { theme, mode } = useTheme();

  useEffect(() => {
    fetchProducts().then((ps) => setItems(ps.filter((p) => p.isLatestArrival)));
  }, []);

  if (items.length === 0) return null;

  return (
    <Box
      component="section"
      sx={{
        py: 10,
        bgcolor: "transparent",
        color: theme.palette.text.primary,
        position: "relative",
      }}
    >
      <Container>
        <Typography
          sx={{
            color: theme.palette.primary.main,
            textTransform: "uppercase",
            letterSpacing: 2,
            textAlign: "center",
            fontWeight: 700,
            fontFamily: "JUST Sans ExBold",
            fontSize: { xs: "0.82rem", md: "1.05rem" },
          }}
        >
          New in stock
        </Typography>
        <Typography
          variant="h3"
          sx={{
            fontWeight: 700,
            mt: 1,
            mb: 6,
            textAlign: "center",
            fontFamily: "JUST Sans ExBold",
            color: theme.palette.text.primary,
            fontSize: { xs: "1.95rem", md: "3.05rem" },
          }}
        >
          Latest Arrivals
        </Typography>

        <Box
          sx={{
            p: { xs: 1.5, md: 2.2 },
            borderRadius: 5,
            border: `1px solid ${theme.palette.divider}`,
            background: mode === "dark" ? alpha("#10202A", 0.66) : alpha("#FFFFFF", 0.76),
            boxShadow: mode === "dark" ? "0 24px 58px rgba(3,10,18,0.24)" : "0 20px 52px rgba(15,23,42,0.08)",
          }}
        >
          <Grid container spacing={4}>
          {items.map((i) => (
            <Grid size={{xs:12, sm:6, md:4}} key={i.id}>
              <ProductCard product={i} />
            </Grid>
          ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default LatestArrivals;
