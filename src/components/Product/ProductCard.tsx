import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActions,
  Button,
  Box,
} from "@mui/material";
import type { Product } from "../../services/productService";
import { useCart } from "../../contexts/CartContext";
import { useState } from "react";
import ProductModal from "./ProductModal";
import { useTheme } from "../../contexts/ThemeContext";

export const ProductCard = ({ product }: { product: Product }) => {
  const { add } = useCart();
  const { theme, mode } = useTheme();
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Card
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          bgcolor: theme.palette.background.paper,
          borderRadius: 3,
          border: `1px solid ${theme.palette.divider}`,
          backdropFilter: "blur(8px)",
          boxShadow: mode === 'dark' ? "0 0 20px rgba(0,0,0,0.3)" : "0 0 20px rgba(0,0,0,0.1)",
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
          "&:hover": {
            transform: "translateY(-6px)",
            boxShadow: `0 0 30px ${theme.palette.primary.main}25`,
          },
        }}
      >
        <CardMedia
          component="img"
          height="200"
          image={product.images?.[0] || "./images/solar.jpg"}
          alt={product.name}
          sx={{
            borderTopLeftRadius: 12,
            borderTopRightRadius: 12,
            objectFit: "cover",
            filter: "brightness(0.9)",
          }}
        />

        <CardContent sx={{ flexGrow: 1, px: 3, py: 2 }}>
          <Typography
            variant="h6"
            sx={{
              fontFamily: "JUST Sans ExBold",
              color: theme.palette.text.primary,
              mb: 0.5,
              letterSpacing: "0.5px",
            }}
          >
            {product.name}
          </Typography>
          <Typography
            sx={{ color: theme.palette.text.secondary, mb: 1, fontSize: "0.9rem", fontFamily: "JUST Sans Regular" }}
          >
            {product.category}
          </Typography>
          <Typography
            sx={{
              color: theme.palette.primary.main,
              fontWeight: "bold",
              fontSize: "1.1rem",
              fontFamily: "JUST Sans ExBold",
            }}
          >
            ₦{product.price.toLocaleString()}
          </Typography>
        </CardContent>

        <CardActions sx={{ px: 3, pb: 3 }}>
          <Box sx={{ display: "flex", gap: 1, width: "100%" }}>
            <Button
              onClick={handleOpen}
              sx={{
                textTransform: "none",
                fontWeight: "bold",
                fontFamily: "JUST Sans Regular",
                color: theme.palette.primary.main,
                border: `1px solid ${theme.palette.primary.main}`,
                borderRadius: "10px",
                px: 2,
                "&:hover": {
                  backgroundColor: `${theme.palette.primary.main}10`,
                },
              }}
            >
              View
            </Button>

            <Button
              variant="contained"
              onClick={() =>
                add({
                  productId: product.id,
                  name: product.name,
                  price: product.price,
                  quantity: 1,
                })
              }
              sx={{
                ml: "auto",
                background: theme.palette.secondary.main,
                fontWeight: "bold",
                fontFamily: "JUST Sans ExBold",
                textTransform: "none",
                borderRadius: "10px",
                px: 2.5,
                "&:hover": {
                  backgroundColor: theme.palette.secondary.dark,
                },
              }}
            >
              Add to Cart
            </Button>
          </Box>
        </CardActions>
      </Card>

      <ProductModal product={product} open={open} onClose={handleClose} />
    </>
  );
};

export default ProductCard;
