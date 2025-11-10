import { Box, Container, Grid, Typography, Button, TextField, Card, CardContent } from "@mui/material";
import TopNav from "../navigation/TopNav";
import Footer from "../navigation/Footer";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchProductById, fetchRelated } from "../services/productService";
import type { Product } from "../services/productService";
import { useCart } from "../contexts/CartContext";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [qty, setQty] = useState(1);
  const { add, clear } = useCart();
  const navigate = useNavigate();

  useEffect(()=>{
    if(id) fetchProductById(id).then(p => setProduct(p));
  },[id])

  if(!product) return (
    <Box>
      <TopNav />
      <Container sx={{ py: 6 }}>
        <Typography sx={{ fontFamily: "JUST Sans Regular" }}>Loading...</Typography>
      </Container>
      <Footer />
    </Box>
  )

  const [mainImage, setMainImage] = useState(product.images?.[0] || '/images/sample1.jpg');
  const [related, setRelated] = useState<typeof product[]>([]);

  useEffect(()=>{
    fetchRelated(product.category, product.id).then(setRelated);
  },[product])

  return (
    <Box>
      <TopNav />
      <Container sx={{ py: 6 }}>
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Box>
              <Box component="img" src={mainImage} alt={product.name} sx={{ width: '100%', borderRadius: 2 }} />
              <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                {(product.images || []).map((src, idx) => (
                  <Box key={idx} component="img" src={src} onClick={()=> setMainImage(src)} sx={{ width: 80, height: 60, objectFit: 'cover', borderRadius: 1, cursor: 'pointer', border: src === mainImage ? '2px solid var(--brand-green)' : '1px solid #eee' }} />
                ))}
              </Box>
            </Box>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="h4" sx={{ fontWeight: 'bold', fontFamily: "JUST Sans ExBold" }}>{product.name}</Typography>
            <Typography color="text.secondary" sx={{ my: 2, fontFamily: "JUST Sans Regular" }}>{product.description}</Typography>
            <Typography variant="h6" sx={{ fontWeight: 'bold', fontFamily: "JUST Sans ExBold" }}>NGN {product.price.toLocaleString()}</Typography>
            <Typography color="text.secondary" sx={{ fontFamily: "JUST Sans Regular" }}>Stock: {product.stock}</Typography>

            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mt: 2 }}>
              <TextField type="number" size="small" value={qty} onChange={(e)=> setQty(Math.max(1, Number(e.target.value)))} sx={{ width: 100 }} />
              <Button variant="contained" color="success" sx={{ fontFamily: "JUST Sans ExBold" }} onClick={()=> add({ productId: product.id, name: product.name, price: product.price, quantity: qty })}>Add to Cart</Button>
              <Button variant="outlined" sx={{ fontFamily: "JUST Sans ExBold" }} onClick={()=> { clear(); add({ productId: product.id, name: product.name, price: product.price, quantity: qty }); navigate('/checkout'); }}>Buy Now</Button>
            </Box>
          </Grid>
        </Grid>

        {related.length > 0 && (
          <Box sx={{ mt: 6 }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold', mb:2, fontFamily: "JUST Sans ExBold" }}>Related Products</Typography>
            <Grid container spacing={2}>
              {related.map(r => (
                <Grid size={{ xs: 12, sm: 6, md: 3 }} key={r.id}>
                  <Card>
                    <Box component="img" src={r.images?.[0]} sx={{ width: '100%', height: 140, objectFit: 'cover' }} />
                    <CardContent>
                      <Typography variant="subtitle1" sx={{ fontFamily: "JUST Sans ExBold" }}>{r.name}</Typography>
                      <Typography color="text.secondary" sx={{ fontFamily: "JUST Sans Regular" }}>NGN {r.price.toLocaleString()}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </Container>
      <Footer />
    </Box>
  )
}

export default ProductDetail;
