import {
  Box,
  Typography,
  Paper,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
} from "@mui/material";
import { Edit, Delete, Add } from "@mui/icons-material";
import { useState } from "react";

const brandAmber = "#FFAB46";
// const brandGreen = "#2E7D4D";

interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  category: string;
}

const AdminProducts = () => {
  const [products, setProducts] = useState<Product[]>([
    { id: 1, name: "Solar Panel 250W", price: 95000, stock: 12, category: "Solar Panels" },
    { id: 2, name: "Inverter 5KVA", price: 220000, stock: 8, category: "Inverters" },
  ]);

  const handleDelete = (id: number) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <Box sx={{ p: 3, color: "#fff", bgcolor: "#0D0D0D", minHeight: "100vh" }}>
      <Typography variant="h5" sx={{ fontWeight: "bold", color: brandAmber, mb: 3 }}>
        Manage Products
      </Typography>

      <Button
        variant="contained"
        startIcon={<Add />}
        sx={{
          mb: 3,
          bgcolor: brandAmber,
          color: "#000",
          fontWeight: "bold",
          "&:hover": { bgcolor: "#FF9C25" },
        }}
      >
        Add Product
      </Button>

      <TableContainer
        component={Paper}
        sx={{
          background: "rgba(255,255,255,0.05)",
          borderRadius: 3,
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              {["Name", "Category", "Price", "Stock", "Actions"].map((h) => (
                <TableCell key={h} sx={{ color: brandAmber, fontWeight: "bold" }}>
                  {h}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((p) => (
              <TableRow key={p.id}>
                <TableCell sx={{ color: "#fff" }}>{p.name}</TableCell>
                <TableCell sx={{ color: "#fff" }}>{p.category}</TableCell>
                <TableCell sx={{ color: "#fff" }}>₦{p.price.toLocaleString()}</TableCell>
                <TableCell sx={{ color: "#fff" }}>{p.stock}</TableCell>
                <TableCell>
                  <IconButton color="inherit" size="small">
                    <Edit sx={{ color: brandAmber }} />
                  </IconButton>
                  <IconButton color="inherit" size="small" onClick={() => handleDelete(p.id)}>
                    <Delete sx={{ color: "red" }} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default AdminProducts;
