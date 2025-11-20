import { Box, Container, Grid, Typography, Button, Chip } from "@mui/material";
import TopNav from "../navigation/TopNav";
import Footer from "../navigation/Footer";
import { useEffect, useState } from "react";
import { fetchProducts } from "../services/productService";
import type { Product } from "../services/productService";
import ProductCard from "../components/Product/ProductCard";
import { HeroSection } from "../components/Product/HeroSection";
import ProductFilter from "../components/Product/Filter";
import { useTheme } from "../contexts/ThemeContext";
import { FaSolarPanel, FaBolt, FaBatteryFull, FaCog, FaTools } from "react-icons/fa";

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [query, setQuery] = useState<string>("");
  const [category, setCategory] = useState<string>("all");
  const [maxPrice, setMaxPrice] = useState<string>("");
  const [showCount, setShowCount] = useState(6);

  const categories = [
    { name: "all", label: "All Products", icon: <FaTools />, count: 0 },
    { name: "Panels", label: "Solar Panels", icon: <FaSolarPanel />, count: 0 },
    { name: "Inverters", label: "Inverters", icon: <FaBolt />, count: 0 },
    { name: "Batteries", label: "Batteries", icon: <FaBatteryFull />, count: 0 },
    { name: "Controllers", label: "Controllers", icon: <FaCog />, count: 0 },
    { name: "Accessories", label: "Accessories", icon: <FaTools />, count: 0 },
  ];

  useEffect(() => {
    fetchProducts().then(setProducts);
  }, []);

  const checkPrice = (price: number, maxPriceStr: string) => {
    if (!maxPriceStr || maxPriceStr === "") return true;
    const maxPriceNum = Number(maxPriceStr);
    if (isNaN(maxPriceNum)) return true;
    return price <= maxPriceNum;
  };

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(query.toLowerCase()) &&
      (category === "all" || p.category === category) &&
      checkPrice(p.price, maxPrice)
  );

  const { theme, mode } = useTheme();

  // Update category counts
  const categoriesWithCounts = categories.map(cat => ({
    ...cat,
    count: cat.name === "all" ? products.length : products.filter(p => p.category === cat.name).length
  }));

  const displayedProducts = filtered.slice(0, showCount);
  const hasMore = filtered.length > showCount;

  return (
    <Box sx={{ 
      bgcolor: theme.palette.background.default, 
      minHeight: "100vh",
      position: "relative",
      overflow: "hidden"
    }}>
      {/* Professional Background Pattern */}
      <Box sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -1,
        opacity: mode === 'dark' ? 0.02 : 0.015,
        backgroundImage: `
          radial-gradient(circle at 25% 25%, ${theme.palette.primary.main}15 0%, transparent 50%),
          radial-gradient(circle at 75% 75%, ${theme.palette.secondary.main}10 0%, transparent 50%),
          linear-gradient(45deg, transparent 40%, ${theme.palette.primary.main}05 50%, transparent 60%)
        `,
        backgroundSize: "400px 400px, 300px 300px, 200px 200px",
        animation: "backgroundFloat 25s ease-in-out infinite",
        "@keyframes backgroundFloat": {
          "0%, 100%": { transform: "translate(0, 0) rotate(0deg)" },
          "33%": { transform: "translate(-10px, -15px) rotate(1deg)" },
          "66%": { transform: "translate(10px, 15px) rotate(-1deg)" }
        }
      }} />
      
      <TopNav />
      <HeroSection />
      
      <Container sx={{ py: 6, position: "relative", zIndex: 1 }}>
        {/* Category Chips */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" sx={{ 
            fontWeight: "bold", 
            mb: 3, 
            fontFamily: "JUST Sans ExBold", 
            color: theme.palette.text.primary,
            fontSize: { xs: "2rem", md: "2.5rem" }
          }}>
            Shop — Products
          </Typography>
          
          <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mb: 3 }}>
            {categoriesWithCounts.map((cat) => (
              <Chip
                key={cat.name}
                icon={cat.icon}
                label={`${cat.label} (${cat.count})`}
                onClick={() => setCategory(cat.name)}
                variant={category === cat.name ? "filled" : "outlined"}
                sx={{
                  fontFamily: "JUST Sans Regular",
                  bgcolor: category === cat.name ? theme.palette.primary.main : "transparent",
                  color: category === cat.name ? (mode === 'dark' ? "#000" : "#fff") : theme.palette.text.primary,
                  borderColor: theme.palette.primary.main,
                  "&:hover": {
                    bgcolor: theme.palette.primary.main,
                    color: mode === 'dark' ? "#000" : "#fff"
                  }
                }}
              />
            ))}
          </Box>
        </Box>

        <ProductFilter
          setQuery={setQuery}
          setCategory={setCategory}
          setMaxPrice={setMaxPrice}
        />

        {/* Products Grid */}
        <Grid container spacing={3}>
          {displayedProducts.map((p, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={p.id}>
              <Box sx={{
                animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
                "@keyframes fadeInUp": {
                  "0%": { opacity: 0, transform: "translateY(30px)" },
                  "100%": { opacity: 1, transform: "translateY(0)" }
                }
              }}>
                <ProductCard product={p} />
              </Box>
            </Grid>
          ))}
        </Grid>

        {/* View More Button */}
        {hasMore && (
          <Box sx={{ textAlign: "center", mt: 6 }}>
            <Button
              variant="contained"
              onClick={() => setShowCount(prev => prev + 6)}
              sx={{
                background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
                color: mode === 'dark' ? "#000" : "#fff",
                fontFamily: "JUST Sans ExBold",
                px: 4,
                py: 1.5,
                borderRadius: 3,
                boxShadow: `0 8px 25px ${theme.palette.primary.main}30`,
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: `0 12px 35px ${theme.palette.primary.main}40`
                }
              }}
            >
              View More Products ({filtered.length - showCount} remaining)
            </Button>
          </Box>
        )}

        {/* Results Summary */}
        <Box sx={{ mt: 4, textAlign: "center" }}>
          <Typography sx={{ 
            color: theme.palette.text.secondary, 
            fontFamily: "JUST Sans Regular"
          }}>
            Showing {displayedProducts.length} of {filtered.length} products
            {category !== "all" && ` in ${categoriesWithCounts.find(c => c.name === category)?.label}`}
          </Typography>
        </Box>
      </Container>
      
      <Footer />
    </Box>
  );
};

export default Products;
