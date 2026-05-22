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
  const [loading, setLoading] = useState(true);
  const [mainImage, setMainImage] = useState('/images/sample1.jpg');
  const [related, setRelated] = useState<Product[]>([]);
  const { add, clear } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    let active = true;

    const loadProduct = async () => {
      if (!id) {
        navigate('/products', { replace: true });
        return;
      }

      setLoading(true);
      setProduct(null);
      setRelated([]);
      setQty(1);
      setMainImage('/images/sample1.jpg');

      try {
        const nextProduct = await fetchProductById(id);

        if (!active) return;

        if (!nextProduct) {
          navigate('/products', { replace: true });
          return;
        }

        setProduct(nextProduct);
        setMainImage(nextProduct.images?.[0] || '/images/sample1.jpg');
      } catch {
        if (active) {
          navigate('/products', { replace: true });
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    void loadProduct();

    return () => {
      active = false;
    };
  }, [id, navigate]);

  useEffect(() => {
    let active = true;

    if (!product) {
      setRelated([]);
      return () => {
        active = false;
      };
    }

    fetchRelated(product.category, product.id)
      .then((items) => {
        if (active) setRelated(items);
      })
      .catch(() => {
        if (active) setRelated([]);
      });

    return () => {
      active = false;
    };
  }, [product]);

  if (loading) return (
    <Box>
      <TopNav />
      <Container sx={{ py: 6 }}>
        <Typography sx={{ fontFamily: "JUST Sans Regular" }}>Loading...</Typography>
      </Container>
      <Footer />
    </Box>
  );

  if (!product) return null;

  const inStock = product.stock > 0;

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
            <Typography
              sx={{
                mt: 0.5,
                fontWeight: 'bold',
                fontFamily: "JUST Sans ExBold",
                color: inStock ? 'success.main' : 'error.main',
              }}
            >
              {inStock ? `In Stock — ${product.stock} available` : 'Out of Stock'}
            </Typography>

            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mt: 2 }}>
              <TextField
                type="number"
                size="small"
                value={qty}
                disabled={!inStock}
                onChange={(e)=> setQty(Math.min(Math.max(1, Number(e.target.value)), Math.max(1, product.stock)))}
                inputProps={{ min: 1, max: Math.max(1, product.stock) }}
                sx={{ width: 100 }}
              />
              <Button
                variant="contained"
                color="success"
                disabled={!inStock}
                sx={{ fontFamily: "JUST Sans ExBold" }}
                onClick={()=> add({ itemType: "product", productId: product.id, name: product.name, price: product.price, quantity: qty })}
              >
                {inStock ? 'Add to Cart' : 'Out of Stock'}
              </Button>
              <Button
                variant="outlined"
                disabled={!inStock}
                sx={{ fontFamily: "JUST Sans ExBold" }}
                onClick={()=> { clear(); add({ itemType: "product", productId: product.id, name: product.name, price: product.price, quantity: qty }); navigate('/checkout'); }}
              >
                Buy Now
              </Button>
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
