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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Snackbar,
  Alert,
} from "@mui/material";
import { Edit, Delete, Add } from "@mui/icons-material";
import { useState, type ChangeEvent } from "react";
import AdminLayout from "../../components/Admin/AdminLayout";
import { useTheme } from "../../contexts/ThemeContext";

interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  category: string;
  image?: string;
}

const AdminProducts = () => {
  const { theme, mode } = useTheme();
  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      name: "Solar Panel 250W",
      price: 95000,
      stock: 12,
      category: "Solar Panels",
    },
    {
      id: 2,
      name: "Inverter 5KVA",
      price: 220000,
      stock: 8,
      category: "Inverters",
    },
  ]);

  const [open, setOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedDeleteId, setSelectedDeleteId] = useState<number | null>(null);

  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState<Partial<Product>>({
    name: "",
    price: 0,
    stock: 0,
    category: "",
    image: "",
  });

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "info" | "error",
  });

  const handleOpen = (product?: Product) => {
    if (product) {
      setEditingProduct(product);
      setFormData(product);
    } else {
      setEditingProduct(null);
      setFormData({ name: "", price: 0, stock: 0, category: "", image: "" });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingProduct(null);
  };

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev) => ({ ...prev, image: reader.result as string }));
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    if (editingProduct) {
      setProducts((prev) =>
        prev.map((p) =>
          p.id === editingProduct.id ? { ...editingProduct, ...formData } : p
        )
      );
      setSnackbar({
        open: true,
        message: "Product updated successfully!",
        severity: "success",
      });
    } else {
      setProducts((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          name: formData.name || "",
          price: Number(formData.price),
          stock: Number(formData.stock),
          category: formData.category || "",
          image: formData.image || "",
        },
      ]);
      setSnackbar({
        open: true,
        message: "Product added successfully!",
        severity: "success",
      });
    }
    handleClose();
  };

  const confirmDelete = (id: number) => {
    setSelectedDeleteId(id);
    setConfirmOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedDeleteId !== null) {
      setProducts((prev) => prev.filter((p) => p.id !== selectedDeleteId));
      setSnackbar({
        open: true,
        message: "Product deleted successfully!",
        severity: "info",
      });
    }
    setConfirmOpen(false);
    setSelectedDeleteId(null);
  };

  return (
     <AdminLayout>
    <Box sx={{ p: 3, color: theme.palette.text.primary, bgcolor: theme.palette.background.default, minHeight: "100vh" }}>
      <Typography variant="h5" sx={{ fontWeight: "bold", color: theme.palette.primary.main, mb: 3, fontFamily: "JUST Sans ExBold" }}>
        Manage Products
      </Typography>

      <Button
        variant="contained"
        startIcon={<Add />}
        onClick={() => handleOpen()}
        sx={{
          mb: 3,
          bgcolor: theme.palette.primary.main,
          color: mode === 'dark' ? "#000" : "#fff",
          fontWeight: "bold",
          fontFamily: "JUST Sans ExBold",
          "&:hover": { bgcolor: theme.palette.primary.dark },
        }}
      >
        Add Product
      </Button>

      <TableContainer
        component={Paper}
        sx={{
          background: theme.palette.background.paper,
          borderRadius: 3,
          border: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              {["Image", "Name", "Category", "Price", "Stock", "Actions"].map((h) => (
                <TableCell key={h} sx={{ color: theme.palette.primary.main, fontWeight: "bold", fontFamily: "JUST Sans ExBold" }}>
                  {h}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((p) => (
              <TableRow key={p.id}>
                <TableCell>
                  {p.image ? (
                    <img
                      src={p.image}
                      alt={p.name}
                      style={{
                        width: 50,
                        height: 50,
                        borderRadius: "8px",
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    <Box
                      sx={{
                        width: 50,
                        height: 50,
                        bgcolor: theme.palette.divider,
                        borderRadius: "8px",
                      }}
                    />
                  )}
                </TableCell>
                <TableCell sx={{ color: theme.palette.text.primary, fontFamily: "JUST Sans Regular" }}>{p.name}</TableCell>
                <TableCell sx={{ color: theme.palette.text.primary, fontFamily: "JUST Sans Regular" }}>{p.category}</TableCell>
                <TableCell sx={{ color: theme.palette.text.primary, fontFamily: "JUST Sans Regular" }}>₦{p.price.toLocaleString()}</TableCell>
                <TableCell sx={{ color: theme.palette.text.primary, fontFamily: "JUST Sans Regular" }}>{p.stock}</TableCell>
                <TableCell>
                  <IconButton color="inherit" size="small" onClick={() => handleOpen(p)}>
                    <Edit sx={{ color: theme.palette.primary.main }} />
                  </IconButton>
                  <IconButton
                    color="inherit"
                    size="small"
                    onClick={() => confirmDelete(p.id)}
                  >
                    <Delete sx={{ color: "red" }} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add/Edit Modal */}
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        PaperProps={{
          sx: {
            bgcolor: theme.palette.background.paper,
            color: theme.palette.text.primary,
            borderRadius: 3,
          },
        }}
      >
        <DialogTitle sx={{ color: theme.palette.primary.main, fontWeight: "bold", fontFamily: "JUST Sans ExBold" }}>
          {editingProduct ? "Edit Product" : "Add Product"}
        </DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
          <TextField
            label="Product Name"
            name="name"
            value={formData.name || ""}
            onChange={handleInputChange}
            fullWidth
            InputLabelProps={{ style: { color: theme.palette.text.secondary } }}
            InputProps={{
              sx: {
                color: theme.palette.text.primary,
                borderColor: theme.palette.divider,
              },
            }}
          />
          <TextField
            label="Price (₦)"
            name="price"
            type="number"
            value={formData.price || ""}
            onChange={handleInputChange}
            fullWidth
            InputLabelProps={{ style: { color: theme.palette.text.secondary } }}
            InputProps={{ sx: { color: theme.palette.text.primary } }}
          />
          <TextField
            label="Stock"
            name="stock"
            type="number"
            value={formData.stock || ""}
            onChange={handleInputChange}
            fullWidth
            InputLabelProps={{ style: { color: theme.palette.text.secondary } }}
            InputProps={{ sx: { color: theme.palette.text.primary } }}
          />
          <TextField
            select
            label="Category"
            name="category"
            value={formData.category || ""}
            onChange={handleInputChange}
            fullWidth
            InputLabelProps={{ style: { color: theme.palette.text.secondary } }}
            InputProps={{ sx: { color: theme.palette.text.primary } }}
          >
            <MenuItem value="Solar Panels">Solar Panels</MenuItem>
            <MenuItem value="Inverters">Inverters</MenuItem>
            <MenuItem value="Batteries">Batteries</MenuItem>
          </TextField>

          <Box>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Product Image
            </Typography>
            <Button
              variant="outlined"
              component="label"
              sx={{
                borderColor: theme.palette.primary.main,
                color: theme.palette.primary.main,
                "&:hover": { borderColor: theme.palette.primary.dark },
              }}
            >
              Upload Image
              <input hidden accept="image/*" type="file" onChange={handleImageChange} />
            </Button>
            {formData.image && (
              <Box sx={{ mt: 2 }}>
                <img
                  src={formData.image}
                  alt="preview"
                  style={{
                    width: "100%",
                    maxHeight: 200,
                    borderRadius: 8,
                    objectFit: "cover",
                  }}
                />
              </Box>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} sx={{ color: theme.palette.text.secondary }}>
            Cancel
          </Button>
          <Button
            variant="contained"
            sx={{ bgcolor: theme.palette.primary.main, color: mode === 'dark' ? "#000" : "#fff", fontWeight: "bold", fontFamily: "JUST Sans ExBold" }}
            onClick={handleSave}
          >
            {editingProduct ? "Save Changes" : "Add Product"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Confirm Delete Modal */}
      <Dialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        PaperProps={{
          sx: {
            bgcolor: theme.palette.background.paper,
            color: theme.palette.text.primary,
            borderRadius: 3,
            p: 2,
          },
        }}
      >
        <DialogTitle sx={{ color: theme.palette.primary.main, fontWeight: "bold", fontFamily: "JUST Sans ExBold" }}>
          Confirm Deletion
        </DialogTitle>
        <DialogContent>
          <Typography sx={{ fontFamily: "JUST Sans Regular" }}>Are you sure you want to delete this product?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)} sx={{ color: theme.palette.text.secondary }}>
            Cancel
          </Button>
          <Button
            variant="contained"
            sx={{ bgcolor: "red", color: "#fff", fontWeight: "bold", fontFamily: "JUST Sans ExBold" }}
            onClick={handleConfirmDelete}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar Notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
     </AdminLayout>

  );
};

export default AdminProducts;