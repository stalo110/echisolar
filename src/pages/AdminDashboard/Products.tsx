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
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { useEffect, useState, type ChangeEvent } from "react";
import AdminLayout from "../../components/Admin/AdminLayout";
import { useTheme } from "../../contexts/ThemeContext";
import {
  createAdminProduct,
  deleteAdminProduct,
  fetchAdminProducts,
  type Product,
  updateAdminProduct,
} from "../../services/productService";

type ProductForm = {
  name: string;
  description: string;
  price: string;
  stock: string;
  categoryId: string;
  imageFile: File | null;
  imagePreview: string;
  isLatestArrival: boolean;
};

const createEmptyFormData = (): ProductForm => ({
  name: "",
  description: "",
  price: "",
  stock: "",
  categoryId: "1",
  imageFile: null,
  imagePreview: "",
  isLatestArrival: false,
});

const revokeBlobUrl = (value?: string) => {
  if (value?.startsWith("blob:")) {
    URL.revokeObjectURL(value);
  }
};

const CATEGORY_OPTIONS = [
  { id: 1, label: "Panels" },
  { id: 2, label: "Inverters" },
  { id: 3, label: "Batteries" },
  { id: 4, label: "Solar Cameras" },
  { id: 5, label: "Accessories" },
  { id: 6, label: "Solar Streetlights" },
];

const getCategoryLabel = (categoryId?: number) => {
  return CATEGORY_OPTIONS.find((item) => item.id === categoryId)?.label || "General";
};

const AdminProducts = () => {
  const { theme, mode } = useTheme();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedDeleteId, setSelectedDeleteId] = useState<string | null>(null);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState<ProductForm>(createEmptyFormData);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "info" | "error",
  });

  const loadProducts = async () => {
    setLoading(true);
    try {
      const data = await fetchAdminProducts();
      setProducts(data);
    } catch {
      setSnackbar({ open: true, message: "Unable to load products.", severity: "error" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    return () => {
      revokeBlobUrl(formData.imagePreview);
    };
  }, [formData.imagePreview]);

  const handleOpen = (product?: Product) => {
    setFormData((prev) => {
      revokeBlobUrl(prev.imagePreview);
      if (product) {
        return {
          name: product.name || "",
          description: product.description || "",
          price: String(product.price || ""),
          stock: String(product.stock || ""),
          categoryId: String(product.categoryId || 1),
          imageFile: null,
          imagePreview: product.images?.[0] || "",
          isLatestArrival: Boolean(product.isLatestArrival),
        };
      }

      return createEmptyFormData();
    });

    if (product) {
      setEditingProduct(product);
    } else {
      setEditingProduct(null);
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingProduct(null);
    setFormData((prev) => {
      revokeBlobUrl(prev.imagePreview);
      return createEmptyFormData();
    });
  };

  const handleSnackbarClose = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);
    setFormData((prev) => {
      revokeBlobUrl(prev.imagePreview);
      return { ...prev, imageFile: file, imagePreview: previewUrl };
    });
  };

  const handleSave = async () => {
    if (!formData.name.trim() || !formData.price || !formData.stock) {
      setSnackbar({
        open: true,
        message: "Please fill in name, price, and stock.",
        severity: "error",
      });
      return;
    }

    try {
      const payload = {
        name: formData.name.trim(),
        description: formData.description.trim() || "",
        price: Number(formData.price),
        stock: Number(formData.stock),
        categoryId: Number(formData.categoryId),
        images: formData.imageFile ? [formData.imageFile] : undefined,
        isLatestArrival: formData.isLatestArrival,
        isActive: true,
      };

      if (editingProduct) {
        await updateAdminProduct(editingProduct.id, payload);
        setSnackbar({ open: true, message: "Product updated successfully.", severity: "success" });
      } else {
        await createAdminProduct(payload);
        setSnackbar({ open: true, message: "Product added successfully.", severity: "success" });
      }

      handleClose();
      await loadProducts();
    } catch {
      setSnackbar({ open: true, message: "Unable to save product.", severity: "error" });
    }
  };

  const confirmDelete = (id: string) => {
    setSelectedDeleteId(id);
    setConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedDeleteId) return;
    try {
      await deleteAdminProduct(selectedDeleteId);
      setSnackbar({
        open: true,
        message: "Product archived successfully.",
        severity: "info",
      });
      await loadProducts();
    } catch {
      setSnackbar({
        open: true,
        message: "Unable to delete product.",
        severity: "error",
      });
    } finally {
      setConfirmOpen(false);
      setSelectedDeleteId(null);
    }
  };

  return (
    <AdminLayout>
      <Box sx={{ p: 3, color: theme.palette.text.primary, bgcolor: theme.palette.background.default, minHeight: "100vh" }}>
        <Typography variant="h5" sx={{ fontWeight: "bold", color: theme.palette.primary.main, mb: 3, fontFamily: "JUST Sans ExBold" }}>
          Manage Products
        </Typography>

        <Button
          variant="contained"
          onClick={() => handleOpen()}
          sx={{
            mb: 3,
            bgcolor: theme.palette.primary.main,
            color: mode === "dark" ? "#000" : "#fff",
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
                {["Image", "Name", "Category", "Price", "Stock", "Latest", "Actions"].map((header) => (
                  <TableCell key={header} sx={{ color: theme.palette.primary.main, fontWeight: "bold", fontFamily: "JUST Sans ExBold" }}>
                    {header}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    {product.images?.[0] ? (
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        style={{
                          width: 50,
                          height: 50,
                          borderRadius: "8px",
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      <Box sx={{ width: 50, height: 50, bgcolor: theme.palette.divider, borderRadius: "8px" }} />
                    )}
                  </TableCell>
                  <TableCell sx={{ color: theme.palette.text.primary, fontFamily: "JUST Sans Regular" }}>{product.name}</TableCell>
                  <TableCell sx={{ color: theme.palette.text.primary, fontFamily: "JUST Sans Regular" }}>
                    {getCategoryLabel(product.categoryId)}
                  </TableCell>
                  <TableCell sx={{ color: theme.palette.text.primary, fontFamily: "JUST Sans Regular" }}>
                    ₦{Number(product.price || 0).toLocaleString()}
                  </TableCell>
                  <TableCell sx={{ color: theme.palette.text.primary, fontFamily: "JUST Sans Regular" }}>{product.stock}</TableCell>
                  <TableCell sx={{ color: theme.palette.text.primary, fontFamily: "JUST Sans Regular" }}>
                    {product.isLatestArrival ? "Yes" : "No"}
                  </TableCell>
                  <TableCell>
                    <IconButton color="inherit" size="small" onClick={() => handleOpen(product)}>
                      <Edit sx={{ color: theme.palette.primary.main }} />
                    </IconButton>
                    <IconButton color="inherit" size="small" onClick={() => confirmDelete(product.id)}>
                      <Delete sx={{ color: "red" }} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {!products.length && (
            <Typography sx={{ p: 2, color: theme.palette.text.secondary, fontFamily: "JUST Sans Regular" }}>
              {loading ? "Loading products..." : "No products found."}
            </Typography>
          )}
        </TableContainer>

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
              value={formData.name}
              onChange={handleInputChange}
              fullWidth
              InputLabelProps={{ style: { color: theme.palette.text.secondary } }}
              InputProps={{ sx: { color: theme.palette.text.primary } }}
            />
            <TextField
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              multiline
              rows={3}
              fullWidth
              InputLabelProps={{ style: { color: theme.palette.text.secondary } }}
              InputProps={{ sx: { color: theme.palette.text.primary } }}
            />
            <TextField
              label="Price (₦)"
              name="price"
              type="number"
              value={formData.price}
              onChange={handleInputChange}
              fullWidth
              InputLabelProps={{ style: { color: theme.palette.text.secondary } }}
              InputProps={{ sx: { color: theme.palette.text.primary } }}
            />
            <TextField
              label="Stock"
              name="stock"
              type="number"
              value={formData.stock}
              onChange={handleInputChange}
              fullWidth
              InputLabelProps={{ style: { color: theme.palette.text.secondary } }}
              InputProps={{ sx: { color: theme.palette.text.primary } }}
            />
            <TextField
              select
              label="Category"
              name="categoryId"
              value={formData.categoryId}
              onChange={handleInputChange}
              fullWidth
              InputLabelProps={{ style: { color: theme.palette.text.secondary } }}
              InputProps={{ sx: { color: theme.palette.text.primary } }}
            >
              {CATEGORY_OPTIONS.map((option) => (
                <MenuItem key={option.id} value={String(option.id)}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>

            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.isLatestArrival}
                  onChange={(event) =>
                    setFormData((prev) => ({
                      ...prev,
                      isLatestArrival: event.target.checked,
                    }))
                  }
                />
              }
              label="Mark as latest arrival"
            />

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
              {formData.imagePreview && (
                <Box sx={{ mt: 2 }}>
                  <img
                    src={formData.imagePreview}
                    alt="preview"
                    style={{ width: "100%", maxHeight: 200, borderRadius: 8, objectFit: "cover" }}
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
              sx={{ bgcolor: theme.palette.primary.main, color: mode === "dark" ? "#000" : "#fff", fontWeight: "bold", fontFamily: "JUST Sans ExBold" }}
              onClick={handleSave}
            >
              {editingProduct ? "Save Changes" : "Add Product"}
            </Button>
          </DialogActions>
        </Dialog>

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
            <Typography sx={{ fontFamily: "JUST Sans Regular" }}>Are you sure you want to archive this product?</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setConfirmOpen(false)} sx={{ color: theme.palette.text.secondary }}>
              Cancel
            </Button>
            <Button variant="contained" sx={{ bgcolor: "red", color: "#fff", fontWeight: "bold", fontFamily: "JUST Sans ExBold" }} onClick={handleConfirmDelete}>
              Archive
            </Button>
          </DialogActions>
        </Dialog>

        <Snackbar
          open={snackbar.open}
          autoHideDuration={3000}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert onClose={handleSnackbarClose} severity={snackbar.severity} sx={{ width: "100%" }}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Box>
    </AdminLayout>
  );
};

export default AdminProducts;
