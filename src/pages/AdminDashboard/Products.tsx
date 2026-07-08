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
  CircularProgress,
  useMediaQuery,
  useTheme as useMuiTheme,
  Stack,
  Chip,
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
  imageFiles: File[];
  imagePreviews: string[];
  isLatestArrival: boolean;
};

const createEmptyFormData = (): ProductForm => ({
  name: "",
  description: "",
  price: "",
  stock: "",
  categoryId: "1",
  imageFiles: [],
  imagePreviews: [],
  isLatestArrival: false,
});

const revokeBlobUrls = (urls: string[]) => {
  urls.forEach((url) => {
    if (url.startsWith("blob:")) URL.revokeObjectURL(url);
  });
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
  const muiTheme = useMuiTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down("sm"));
  const adminHeadingColor = mode === "dark" ? theme.palette.text.primary : theme.palette.primary.main;
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
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
      revokeBlobUrls(formData.imagePreviews);
    };
  }, [formData.imagePreviews]);

  const handleOpen = (product?: Product) => {
    setFormData((prev) => {
      revokeBlobUrls(prev.imagePreviews);
      if (product) {
        return {
          name: product.name || "",
          description: product.description || "",
          price: String(product.price || ""),
          stock: String(product.stock || ""),
          categoryId: String(product.categoryId || 1),
          imageFiles: [],
          imagePreviews: product.images || [],
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
      revokeBlobUrls(prev.imagePreviews.filter((u) => u.startsWith("blob:")));
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
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    const newPreviews = files.map((f) => URL.createObjectURL(f));
    setFormData((prev) => ({
      ...prev,
      imageFiles: [...prev.imageFiles, ...files].slice(0, 6),
      imagePreviews: [...prev.imagePreviews, ...newPreviews].slice(0, 6),
    }));
    // reset input so same files can be re-selected if removed
    e.target.value = "";
  };

  const handleRemoveImage = (index: number) => {
    setFormData((prev) => {
      const preview = prev.imagePreviews[index];
      if (preview.startsWith("blob:")) URL.revokeObjectURL(preview);
      return {
        ...prev,
        imageFiles: prev.imageFiles.filter((_, i) => i !== index),
        imagePreviews: prev.imagePreviews.filter((_, i) => i !== index),
      };
    });
  };

  const handleSave = async () => {
    if (saving) return;

    if (!formData.name.trim() || !formData.price || !formData.stock) {
      setSnackbar({
        open: true,
        message: "Please fill in name, price, and stock.",
        severity: "error",
      });
      return;
    }

    setSaving(true);
    try {
      const payload = {
        name: formData.name.trim(),
        description: formData.description.trim() || "",
        price: Number(formData.price),
        stock: Number(formData.stock),
        categoryId: Number(formData.categoryId),
        images: formData.imageFiles.length
          ? formData.imageFiles
          : formData.imagePreviews.filter((u) => !u.startsWith("blob:")).length
          ? formData.imagePreviews.filter((u) => !u.startsWith("blob:"))
          : undefined,
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
    } finally {
      setSaving(false);
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
        <Typography variant="h5" sx={{ fontWeight: "bold", color: adminHeadingColor, mb: 3, fontFamily: "JUST Sans ExBold" }}>
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

        {isMobile ? (
          <Stack spacing={2}>
            {products.length === 0 && (
              <Typography sx={{ color: theme.palette.text.secondary, fontFamily: "JUST Sans Regular" }}>
                {loading ? "Loading products..." : "No products found."}
              </Typography>
            )}
            {products.map((product) => (
              <Paper key={product.id} sx={{ p: 2, borderRadius: 2, border: `1px solid ${theme.palette.divider}`, bgcolor: theme.palette.background.paper }}>
                <Box sx={{ display: "flex", gap: 2, alignItems: "flex-start" }}>
                  {product.images?.[0] ? (
                    <img src={product.images[0]} alt={product.name} style={{ width: 56, height: 56, borderRadius: 8, objectFit: "cover", flexShrink: 0 }} />
                  ) : (
                    <Box sx={{ width: 56, height: 56, bgcolor: theme.palette.divider, borderRadius: 8, flexShrink: 0 }} />
                  )}
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography sx={{ fontFamily: "JUST Sans ExBold", color: theme.palette.text.primary, fontSize: "0.95rem" }}>{product.name}</Typography>
                    <Typography sx={{ fontFamily: "JUST Sans Regular", color: theme.palette.text.secondary, fontSize: "0.82rem" }}>{getCategoryLabel(product.categoryId)}</Typography>
                    <Box sx={{ display: "flex", gap: 1, mt: 0.5, flexWrap: "wrap" }}>
                      <Chip label={`₦${Number(product.price || 0).toLocaleString()}`} size="small" sx={{ fontFamily: "JUST Sans ExBold", bgcolor: theme.palette.primary.main, color: mode === "dark" ? "#000" : "#fff", fontSize: "0.75rem" }} />
                      <Chip label={`Stock: ${product.stock}`} size="small" variant="outlined" sx={{ fontFamily: "JUST Sans Regular", fontSize: "0.75rem" }} />
                      {product.isLatestArrival && <Chip label="Latest" size="small" color="success" sx={{ fontFamily: "JUST Sans Regular", fontSize: "0.75rem" }} />}
                    </Box>
                  </Box>
                  <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
                    <IconButton size="small" onClick={() => handleOpen(product)}><Edit sx={{ color: theme.palette.primary.main, fontSize: 18 }} /></IconButton>
                    <IconButton size="small" onClick={() => confirmDelete(product.id)}><Delete sx={{ color: "red", fontSize: 18 }} /></IconButton>
                  </Box>
                </Box>
              </Paper>
            ))}
          </Stack>
        ) : (
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
                  <TableCell key={header} sx={{ color: adminHeadingColor, fontWeight: "bold", fontFamily: "JUST Sans ExBold" }}>
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
                      <img src={product.images[0]} alt={product.name} style={{ width: 50, height: 50, borderRadius: "8px", objectFit: "cover" }} />
                    ) : (
                      <Box sx={{ width: 50, height: 50, bgcolor: theme.palette.divider, borderRadius: "8px" }} />
                    )}
                  </TableCell>
                  <TableCell sx={{ color: theme.palette.text.primary, fontFamily: "JUST Sans Regular" }}>{product.name}</TableCell>
                  <TableCell sx={{ color: theme.palette.text.primary, fontFamily: "JUST Sans Regular" }}>{getCategoryLabel(product.categoryId)}</TableCell>
                  <TableCell sx={{ color: theme.palette.text.primary, fontFamily: "JUST Sans Regular" }}>₦{Number(product.price || 0).toLocaleString()}</TableCell>
                  <TableCell sx={{ color: theme.palette.text.primary, fontFamily: "JUST Sans Regular" }}>{product.stock}</TableCell>
                  <TableCell sx={{ color: theme.palette.text.primary, fontFamily: "JUST Sans Regular" }}>{product.isLatestArrival ? "Yes" : "No"}</TableCell>
                  <TableCell>
                    <IconButton color="inherit" size="small" onClick={() => handleOpen(product)}><Edit sx={{ color: theme.palette.primary.main }} /></IconButton>
                    <IconButton color="inherit" size="small" onClick={() => confirmDelete(product.id)}><Delete sx={{ color: "red" }} /></IconButton>
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
        )}

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
          <DialogTitle sx={{ color: adminHeadingColor, fontWeight: "bold", fontFamily: "JUST Sans ExBold" }}>
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
                Product Images ({formData.imagePreviews.length}/6)
              </Typography>
              <Button
                variant="outlined"
                component="label"
                disabled={formData.imagePreviews.length >= 6}
                sx={{
                  borderColor: theme.palette.primary.main,
                  color: theme.palette.primary.main,
                  "&:hover": { borderColor: theme.palette.primary.dark },
                }}
              >
                Upload Images
                <input hidden accept="image/*" type="file" multiple onChange={handleImageChange} />
              </Button>
              {formData.imagePreviews.length > 0 && (
                <Box sx={{ mt: 2, display: "flex", flexWrap: "wrap", gap: 1 }}>
                  {formData.imagePreviews.map((src, idx) => (
                    <Box key={idx} sx={{ position: "relative", width: 90, height: 80 }}>
                      <img
                        src={src}
                        alt={`preview-${idx}`}
                        style={{ width: "100%", height: "100%", borderRadius: 6, objectFit: "cover" }}
                      />
                      <IconButton
                        size="small"
                        onClick={() => handleRemoveImage(idx)}
                        sx={{
                          position: "absolute",
                          top: -6,
                          right: -6,
                          bgcolor: "red",
                          color: "#fff",
                          width: 20,
                          height: 20,
                          "&:hover": { bgcolor: "darkred" },
                        }}
                      >
                        ×
                      </IconButton>
                    </Box>
                  ))}
                </Box>
              )}
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} disabled={saving} sx={{ color: theme.palette.text.secondary }}>
              Cancel
            </Button>
            <Button
              variant="contained"
              disabled={saving}
              startIcon={saving ? <CircularProgress size={18} color="inherit" /> : undefined}
              sx={{
                bgcolor: theme.palette.primary.main,
                color: mode === "dark" ? "#000" : "#fff",
                fontWeight: "bold",
                fontFamily: "JUST Sans ExBold",
                "&.Mui-disabled": { bgcolor: theme.palette.primary.main, opacity: 0.7, color: mode === "dark" ? "#000" : "#fff" },
              }}
              onClick={handleSave}
            >
              {saving
                ? editingProduct
                  ? "Saving..."
                  : "Adding..."
                : editingProduct
                ? "Save Changes"
                : "Add Product"}
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
          <DialogTitle sx={{ color: adminHeadingColor, fontWeight: "bold", fontFamily: "JUST Sans ExBold" }}>
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
