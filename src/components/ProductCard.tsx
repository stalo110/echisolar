import { Card, CardContent, CardMedia, Typography, CardActions, Button, Box } from "@mui/material";
import type { Product } from "../services/productService";
import { useCart } from "../contexts/CartContext";

export const ProductCard = ({ product }: { product: Product }) => {
  const { add } = useCart();
  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardMedia component="img" height="180" image={product.images?.[0] || '/images/sample1.jpg'} alt={product.name} />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6">{product.name}</Typography>
        <Typography color="text.secondary" sx={{ mb: 1 }}>{product.category}</Typography>
        <Typography color="text.primary" sx={{ fontWeight: 'bold' }}>NGN {product.price.toLocaleString()}</Typography>
      </CardContent>
      <CardActions>
        <Box sx={{ display: 'flex', gap: 1, width: '100%', px: 2, pb: 2 }}>
          <Button size="small" href={`/products/${product.id}`}>View</Button>
          <Button size="small" variant="contained" onClick={()=> add({ productId: product.id, name: product.name, price: product.price, quantity: 1 })} sx={{ ml: 'auto', background: 'var(--brand-green)' }}>Add to Cart</Button>
        </Box>
      </CardActions>
    </Card>
  )
}

export default ProductCard;
