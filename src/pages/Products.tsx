import { Box, Container, Grid, Typography, TextField, InputAdornment, Select, MenuItem } from "@mui/material";
import TopNav from "../navigation/TopNav";
import Footer from "../navigation/Footer";
import { useEffect, useState } from "react";
import { fetchProducts } from "../services/productService";
import type { Product } from "../services/productService";
import ProductCard from "../components/ProductCard";

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');

  useEffect(()=>{
    fetchProducts().then(setProducts);
  },[])

  const filtered = products.filter(p => p.name.toLowerCase().includes(query.toLowerCase()) && (category === 'all' || p.category === category));

  return (
    <Box>
      <TopNav />
      <Container sx={{ py: 6 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3 }}>
          Shop — Products
        </Typography>

        <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
          <TextField placeholder="Search products" value={query} onChange={(e)=> setQuery(e.target.value)} size="small" InputProps={{ startAdornment: <InputAdornment position="start">🔍</InputAdornment> }} />
          <Select value={category} onChange={(e)=> setCategory(e.target.value)} size="small">
            <MenuItem value="all">All Categories</MenuItem>
            <MenuItem value="Panels">Panels</MenuItem>
            <MenuItem value="Inverters">Inverters</MenuItem>
            <MenuItem value="Batteries">Batteries</MenuItem>
            <MenuItem value="Accessories">Accessories</MenuItem>
            <MenuItem value="Controllers">Controllers</MenuItem>
          </Select>
        </Box>

        <Grid container spacing={2}>
          {filtered.map(p => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={p.id}>
              <ProductCard product={p} />
            </Grid>
          ))}
        </Grid>
      </Container>
      <Footer />
    </Box>
  )
}

export default Products;
