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
import { useTheme } from "../contexts/ThemeContext";

function formatNGN(n: number) {
  return `NGN ${n.toLocaleString()}`;
}

const Cart = () => {
  const { theme, mode } = useTheme();
  const { items, remove, clear, increaseQuantity, decreaseQuantity } = useCart();
  const total = items.reduce((s, i) => s + i.price * i.quantity, 0);

  return (
    <Box sx={{ bgcolor: theme.palette.background.default, minHeight: "100vh", color: theme.palette.text.primary }}>
      <TopNav />

      <Container sx={{ py: 8 }}>
        <Typography
          variant="h4"
          sx={{
            fontFamily: "JUST Sans ExBold",
            mb: 4,
            color: theme.palette.primary.main,
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
              color: theme.palette.text.secondary,
              fontFamily: "JUST Sans Regular",
            }}
          >
            Your cart is empty
          </Typography>
        ) : (
          <TableContainer
            component={Paper}
            sx={{
              background: theme.palette.background.paper,
              border: `1px solid ${theme.palette.divider}`,
              borderRadius: 2,
              boxShadow: mode === 'dark' ? "0 0 15px rgba(0,0,0,0.4)" : "0 0 15px rgba(0,0,0,0.1)",
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
                        color: theme.palette.primary.main,
                        fontFamily: "JUST Sans ExBold",
                        borderBottom: `1px solid ${theme.palette.divider}`,
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
                        backgroundColor: `${theme.palette.primary.main}05`,
                      },
                    }}
                  >
                    <TableCell
                      sx={{
                        color: theme.palette.text.primary,
                        fontFamily: "JUST Sans Regular",
                      }}
                    >
                      {it.name}
                    </TableCell>

                    <TableCell sx={{ color: theme.palette.text.primary }}>
                      <IconButton
                        onClick={() => decreaseQuantity(it.productId)}
                        size="small"
                        sx={{
                          color: theme.palette.text.secondary,
                          "&:hover": { color: theme.palette.primary.main },
                        }}
                      >
                        <RemoveIcon />
                      </IconButton>
                      {it.quantity}
                      <IconButton
                        onClick={() => increaseQuantity(it.productId)}
                        size="small"
                        sx={{
                          color: theme.palette.text.secondary,
                          "&:hover": { color: theme.palette.primary.main },
                        }}
                      >
                        <AddIcon />
                      </IconButton>
                    </TableCell>

                    <TableCell sx={{ color: theme.palette.text.secondary }} align="right">
                      {formatNGN(it.price)}
                    </TableCell>

                    <TableCell sx={{ color: theme.palette.text.primary }} align="right">
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
                        color: theme.palette.primary.main,
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
                        color: theme.palette.secondary.main,
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
              background: theme.palette.secondary.main,
              color: mode === 'dark' ? "#fff" : "#000",
              textTransform: "none",
              fontFamily: "JUST Sans ExBold",
              px: 4,
              "&:hover": {
                background: theme.palette.secondary.dark,
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