// import { Box, Button, Dialog, DialogContent, DialogTitle, IconButton, Typography, Rating, TextField } from "@mui/material";
// import CloseIcon from "@mui/icons-material/Close";
// import type { Product } from "../../services/productService";
// import { useState } from "react";
// import { useCart } from "../../contexts/CartContext";

// interface ProductModalProps {
//     product: Product;
//     open: boolean;
//     onClose: () => void;
// }

// const ProductModal = ({ product, open, onClose }: ProductModalProps) => {
//     const { add } = useCart();
//     const [quantity, setQuantity] = useState(1);

//     if (!product) return null;

//     const handleAddToCart = () => {
//         add({ productId: product.id, name: product.name, price: product.price, quantity });
//         onClose();
//     };

//     return (
//         <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
//             <DialogTitle>
//                 <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                     <Typography variant="h6">{product.name}</Typography>
//                     <IconButton onClick={onClose}>
//                         <CloseIcon />
//                     </IconButton>
//                 </Box>
//             </DialogTitle>
//             <DialogContent>
//                 <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>
//                     <Box sx={{ flex: 1 }}>
//                         <img src={product.images?.[0] || './images/solar.jpg'} alt={product.name} style={{ width: '100%', height: 'auto', borderRadius: 8 }} />
//                     </Box>
//                     <Box sx={{ flex: 1 }}>
//                         <Typography variant="h5" gutterBottom>{product.name}</Typography>
//                         <Rating value={product.rating} readOnly />
//                         <Typography variant="h6" color="primary" sx={{ my: 2 }}>${(product.price * quantity).toFixed(2)}</Typography>
//                         <Typography variant="body1" paragraph>{product.description}</Typography>
//                         <Typography variant="body2"><strong>Category:</strong> {product.category}</Typography>
//                         <Typography variant="body2"><strong>Availability:</strong> {product.availability ? 'In Stock' : 'Out of Stock'}</Typography>
//                         <Box sx={{ display: 'flex', alignItems: 'center', mt: 3 }}>
//                             <TextField
//                                 type="number"
//                                 label="Quantity"
//                                 value={quantity}
//                                 onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
//                                 inputProps={{ min: 1 }}
//                                 sx={{ width: 100, mr: 2 }}
//                             />
//                             <Button variant="contained" color="primary" onClick={handleAddToCart}>
//                                 Add to Cart
//                             </Button>
//                         </Box>
//                     </Box>
//                 </Box>
//             </DialogContent>
//         </Dialog>
//     );
// };

// export default ProductModal;


import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
  Rating,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import type { Product } from "../../services/productService";
import { useState } from "react";
import { useCart } from "../../contexts/CartContext";

interface ProductModalProps {
  product: Product;
  open: boolean;
  onClose: () => void;
}

const ProductModal = ({ product, open, onClose }: ProductModalProps) => {
  const { add } = useCart();
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  const handleAddToCart = () => {
    add({
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity,
    });
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          background: "linear-gradient(180deg, #0A0A0A, #111)",
          color: "#fff",
          borderRadius: 3,
          border: "1px solid rgba(255,255,255,0.08)",
          backdropFilter: "blur(8px)",
          boxShadow: "0 0 25px rgba(255,171,70,0.2)",
        },
      }}
    >
      <DialogTitle>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              background: "linear-gradient(90deg, #FFAB46, #FFD18A)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {product.name}
          </Typography>
          <IconButton onClick={onClose} sx={{ color: "#fff" }}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 4,
          }}
        >
          <Box sx={{ flex: 1 }}>
            <img
              src={product.images?.[0] || "./images/solar.jpg"}
              alt={product.name}
              style={{
                width: "100%",
                borderRadius: 12,
                boxShadow: "0 0 20px rgba(255,171,70,0.2)",
              }}
            />
          </Box>

          <Box sx={{ flex: 1 }}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 700 }}>
              {product.name}
            </Typography>
            <Rating value={product.rating} readOnly />
            <Typography
              variant="h6"
              sx={{
                my: 2,
                color: "#FFAB46",
                fontWeight: "bold",
              }}
            >
              ${(product.price * quantity).toFixed(2)}
            </Typography>

            <Typography variant="body1" paragraph color="rgba(255,255,255,0.85)">
              {product.description}
            </Typography>
            <Typography variant="body2" color="rgba(255,255,255,0.7)">
              <strong>Category:</strong> {product.category}
            </Typography>
            <Typography variant="body2" color="rgba(255,255,255,0.7)">
              <strong>Availability:</strong>{" "}
              {product.availability ? "In Stock" : "Out of Stock"}
            </Typography>

            <Box sx={{ display: "flex", alignItems: "center", mt: 3 }}>
              <TextField
                type="number"
                label="Quantity"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
                inputProps={{ min: 1 }}
                sx={{
                  width: 100,
                  mr: 2,
                  input: { color: "#fff" },
                  label: { color: "rgba(255,255,255,0.7)" },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "rgba(255,255,255,0.2)",
                    },
                    "&:hover fieldset": { borderColor: "#FFAB46" },
                  },
                }}
              />
              <Button
                variant="contained"
                onClick={handleAddToCart}
                sx={{
                  background: "linear-gradient(90deg, #FFAB46, #FFD18A)",
                  color: "#000",
                  fontWeight: "bold",
                  px: 3,
                  "&:hover": {
                    background: "linear-gradient(90deg, #FFD18A, #FFAB46)",
                  },
                }}
              >
                Add to Cart
              </Button>
            </Box>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ProductModal;
