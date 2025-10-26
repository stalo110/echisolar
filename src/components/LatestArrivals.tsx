import { Box, Container, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { fetchProducts } from "../services/productService";
import type { Product } from "../services/productService";

export const LatestArrivals = () => {
  const [items, setItems] = useState<Product[]>([]);
  useEffect(()=>{
    fetchProducts().then(ps => setItems(ps.filter(p => p.isLatestArrival)));
  },[])

  if(items.length === 0) return null;

  return (
    <Box component="section" sx={{ py: 6, bgcolor: '#fff7ed' }}>
      <Container>
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb:3 }}>Latest Arrivals</Typography>
        <Grid container spacing={2}>
          {items.map(i => (
            <Grid size={{ xs:12, sm:6, md:4 }} key={i.id}>
              <ProductCard product={i} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  )
}

export default LatestArrivals;
