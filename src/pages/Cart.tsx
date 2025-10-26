import { Box, Container, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from "@mui/material";
import TopNav from "../navigation/TopNav";
import Footer from "../navigation/Footer";
import { useCart } from "../contexts/CartContext";
import DeleteIcon from '@mui/icons-material/Delete';

function formatNGN(n: number){ return `NGN ${n.toLocaleString()}` }

const Cart = () => {
  const { items, remove, clear } = useCart();
  const total = items.reduce((s, i) => s + i.price * i.quantity, 0);

  return (
    <Box>
      <TopNav />
      <Container sx={{ py: 6 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3 }}>Your Cart</Typography>
        {items.length === 0 ? (
          <Typography color="text.secondary">Your cart is empty</Typography>
        ) : (
          <TableContainer component={Paper} sx={{ mb:3 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Product</TableCell>
                  <TableCell>Qty</TableCell>
                  <TableCell align="right">Unit</TableCell>
                  <TableCell align="right">Total</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {items.map(it => (
                  <TableRow key={it.productId}>
                    <TableCell>{it.name}</TableCell>
                    <TableCell>{it.quantity}</TableCell>
                    <TableCell align="right">{formatNGN(it.price)}</TableCell>
                    <TableCell align="right">{formatNGN(it.price * it.quantity)}</TableCell>
                    <TableCell align="right"><IconButton onClick={()=> remove(it.productId)}><DeleteIcon /></IconButton></TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell colSpan={3} align="right"><strong>Subtotal</strong></TableCell>
                  <TableCell align="right"><strong>{formatNGN(total)}</strong></TableCell>
                  <TableCell />
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        )}

        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button variant="outlined" color="inherit" onClick={()=> clear()}>Clear Cart</Button>
          <Button variant="contained" color="success" href="/checkout" disabled={items.length===0}>Proceed to Checkout</Button>
        </Box>
      </Container>
      <Footer />
    </Box>
  )
}

export default Cart;
