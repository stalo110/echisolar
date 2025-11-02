// import { Box, Container, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from "@mui/material";
// import TopNav from "../navigation/TopNav";
// import Footer from "../navigation/Footer";
// import { useCart } from "../contexts/CartContext";
// import DeleteIcon from '@mui/icons-material/Delete';
// import AddIcon from '@mui/icons-material/Add';
// import RemoveIcon from '@mui/icons-material/Remove';

// function formatNGN(n: number){ return `NGN ${n.toLocaleString()}` }

// const Cart = () => {
//   const { items, remove, clear, increaseQuantity, decreaseQuantity } = useCart();
//   const total = items.reduce((s, i) => s + i.price * i.quantity, 0);

//   return (
//     <Box>
//       <TopNav/>
//       <Container sx={{ py: 6 }}>
//         <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3, color:"black" }}>Your Cart</Typography>
//         {items.length === 0 ? (
//           <Typography color="#ffffff">Your cart is empty</Typography>
//         ) : (
//           <TableContainer component={Paper} sx={{ mb: 3, backgroundColor: 'white' }}>
//             <Table>
//               <TableHead>
//                 <TableRow>
//                   <TableCell sx={{ color: 'black' }}>Product</TableCell>
//                   <TableCell sx={{ color: 'black' }}>Qty</TableCell>
//                   <TableCell sx={{ color: 'black' }} align="right">Unit</TableCell>
//                   <TableCell sx={{ color: 'black' }} align="right">Total</TableCell>
//                   <TableCell></TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {items.map(it => (
//                   <TableRow key={it.productId}>
//                     <TableCell sx={{ color: 'black' }}>{it.name}</TableCell>
//                     <TableCell sx={{ color: 'black' }}>
//                       <IconButton onClick={() => decreaseQuantity(it.productId)} size="small">
//                         <RemoveIcon />
//                       </IconButton>
//                       {it.quantity}
//                       <IconButton onClick={() => increaseQuantity(it.productId)} size="small">
//                         <AddIcon />
//                       </IconButton>
//                     </TableCell>
//                     <TableCell sx={{ color: 'black' }} align="right">{formatNGN(it.price)}</TableCell>
//                     <TableCell sx={{ color: 'black' }} align="right">{formatNGN(it.price * it.quantity)}</TableCell>
//                     <TableCell align="right"><IconButton onClick={()=> remove(it.productId)}><DeleteIcon sx={{ color: 'red' }} /></IconButton></TableCell>
//                   </TableRow>
//                 ))}
//                 <TableRow>
//                   <TableCell colSpan={3} align="right"><strong style={{ color: 'black' }}>Subtotal</strong></TableCell>
//                   <TableCell align="right"><strong style={{ color: 'black' }}>{formatNGN(total)}</strong></TableCell>
//                   <TableCell />
//                 </TableRow>
//               </TableBody>
//             </Table>
//           </TableContainer>
//         )}

//         <Box sx={{ display: 'flex', gap: 2 }}>
//           <Button variant="contained" color="error" onClick={()=> clear()}>Clear Cart</Button>
//           <Button variant="contained" color="success" href="/checkout" disabled={items.length===0}>Proceed to Checkout</Button>
//         </Box>
//       </Container>
//       <Footer />
//     </Box>
//   )
// }

// export default Cart;


import {
  Box,
  Container,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import TopNav from "../navigation/TopNav";
import Footer from "../navigation/Footer";
import { useCart } from "../contexts/CartContext";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

function formatNGN(n: number) {
  return `NGN ${n.toLocaleString()}`;
}

const Cart = () => {
  const { items, remove, clear, increaseQuantity, decreaseQuantity } = useCart();
  const total = items.reduce((s, i) => s + i.price * i.quantity, 0);

  return (
    <Box sx={{ bgcolor: "#0b0b0b", minHeight: "100vh", color: "#fff" }}>
      <TopNav />

      <Container sx={{ py: 8 }}>
        <Typography
          variant="h4"
          sx={{
            fontFamily: "JUST Sans ExBold",
            mb: 4,
            color: "var(--brand-amber)",
            textAlign: "center",
            letterSpacing: "1px",
          }}
        >
          Your Cart
        </Typography>

        {items.length === 0 ? (
          <Typography
            sx={{
              textAlign: "center",
              color: "#ccc",
              fontFamily: "JUST Sans Regular",
            }}
          >
            Your cart is empty
          </Typography>
        ) : (
          <TableContainer
            component={Paper}
            sx={{
              background: "#1a1a1a",
              border: "1px solid #333",
              borderRadius: 2,
              boxShadow: "0 0 15px rgba(0,0,0,0.4)",
              mb: 4,
            }}
          >
            <Table>
              <TableHead>
                <TableRow>
                  {["Product", "Qty", "Unit", "Total", ""].map((h) => (
                    <TableCell
                      key={h}
                      sx={{
                        color: "var(--brand-amber)",
                        fontFamily: "JUST Sans ExBold",
                        borderBottom: "1px solid #333",
                        fontSize: "0.95rem",
                      }}
                    >
                      {h}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {items.map((it) => (
                  <TableRow
                    key={it.productId}
                    sx={{
                      "&:hover": {
                        backgroundColor: "rgba(255, 171, 70, 0.05)",
                      },
                    }}
                  >
                    <TableCell
                      sx={{
                        color: "#eee",
                        fontFamily: "JUST Sans Regular",
                      }}
                    >
                      {it.name}
                    </TableCell>

                    <TableCell sx={{ color: "#ddd" }}>
                      <IconButton
                        onClick={() => decreaseQuantity(it.productId)}
                        size="small"
                        sx={{
                          color: "#aaa",
                          "&:hover": { color: "var(--brand-amber)" },
                        }}
                      >
                        <RemoveIcon />
                      </IconButton>
                      {it.quantity}
                      <IconButton
                        onClick={() => increaseQuantity(it.productId)}
                        size="small"
                        sx={{
                          color: "#aaa",
                          "&:hover": { color: "var(--brand-amber)" },
                        }}
                      >
                        <AddIcon />
                      </IconButton>
                    </TableCell>

                    <TableCell sx={{ color: "#ccc" }} align="right">
                      {formatNGN(it.price)}
                    </TableCell>

                    <TableCell sx={{ color: "#fff" }} align="right">
                      {formatNGN(it.price * it.quantity)}
                    </TableCell>

                    <TableCell align="right">
                      <IconButton
                        onClick={() => remove(it.productId)}
                        sx={{
                          color: "#ff5555",
                          "&:hover": { color: "#ff7777" },
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}

                <TableRow>
                  <TableCell colSpan={3} align="right">
                    <Typography
                      sx={{
                        color: "var(--brand-amber)",
                        fontFamily: "JUST Sans ExBold",
                      }}
                    >
                      Subtotal
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography
                      sx={{
                        fontFamily: "JUST Sans ExBold",
                        color: "var(--brand-green)",
                      }}
                    >
                      {formatNGN(total)}
                    </Typography>
                  </TableCell>
                  <TableCell />
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        )}

        <Box
          sx={{
            display: "flex",
            gap: 2,
            justifyContent: "center",
            flexWrap: "wrap",
            mt: 4,
          }}
        >
          <Button
            variant="contained"
            onClick={() => clear()}
            sx={{
              background: "#ff5555",
              color: "#fff",
              textTransform: "none",
              fontFamily: "JUST Sans ExBold",
              px: 4,
              "&:hover": { background: "#ff7777" },
            }}
          >
            Clear Cart
          </Button>

          <Button
            variant="contained"
            href="/checkout"
            disabled={items.length === 0}
            sx={{
              background: "var(--brand-green)",
              color: "#fff",
              textTransform: "none",
              fontFamily: "JUST Sans ExBold",
              px: 4,
              "&:hover": {
                background: "#36a15f",
              },
            }}
          >
            Proceed to Checkout
          </Button>
        </Box>
      </Container>

      <Footer />
    </Box>
  );
};

export default Cart;
