import { Box, Container, Grid, Typography } from "@mui/material";
import TopNav from "../navigation/TopNav";
import Footer from "../navigation/Footer";
import { useEffect, useState } from "react";
import { fetchProducts } from "../services/productService";
import type { Product } from "../services/productService";
import ProductCard from "../components/Product/ProductCard";
import { HeroSection } from "../components/Product/HeroSection";
import ProductFilter from "../components/Product/Filter";

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [query, setQuery] = useState<string>("");
  const [category, setCategory] = useState<string>("all");
  const [priceRange, setPriceRange] = useState<string>("all");

  useEffect(() => {
    fetchProducts().then(setProducts);
  }, []);

  const checkPrice = (price: number, range: string) => {
    if (range === "all") return true;
    if (range === "200000+") return price >= 200000;
    const [min, max] = range.split("-").map(Number);
    return price >= min && price <= max;
  };

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(query.toLowerCase()) &&
      (category === "all" || p.category === category) &&
      checkPrice(p.price, priceRange)
  );

  return (
    <Box>
      <TopNav />
      <HeroSection />
      <Container sx={{ py: 6 }}>
        <Typography variant="h4" sx={{ fontWeight: "bold", mb: 3, fontFamily: "JUST Sans ExBold" }}>
          Shop — Products
        </Typography>

        <ProductFilter
          setQuery={setQuery}
          setCategory={setCategory}
          setPriceRange={setPriceRange}
        />

        <Grid container spacing={2}>
          {filtered.map((p) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={p.id}>
              <ProductCard product={p} />
            </Grid>
          ))}
        </Grid>
      </Container>
      <Footer />
    </Box>
  );
};

export default Products;
