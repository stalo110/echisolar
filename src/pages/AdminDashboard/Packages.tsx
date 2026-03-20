import {
  Alert,
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Grid,
  IconButton,
  Paper,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { Delete, Edit, Image } from "@mui/icons-material";
import { useEffect, useState, type ChangeEvent } from "react";
import AdminLayout from "../../components/Admin/AdminLayout";
import { useTheme } from "../../contexts/ThemeContext";
import {
  createAdminPackage,
  deleteAdminPackage,
  fetchAdminPackages,
  type SolarPackage,
  updateAdminPackage,
} from "../../services/packageService";

type PackageForm = {
  name: string;
  description: string;
  price: string;
  requiresCustomPrice: boolean;
  whatsappLink: string;
  isActive: boolean;
  existingImages: string[];
  newImageFiles: File[];
  imagePreviews: string[];
};

const createEmptyForm = (): PackageForm => ({
  name: "",
  description: "",
  price: "",
  requiresCustomPrice: false,
  whatsappLink: "",
  isActive: true,
  existingImages: [],
  newImageFiles: [],
  imagePreviews: [],
});

const revokeBlobUrls = (urls: string[]) => {
  for (const url of urls) {
    if (url.startsWith("blob:")) {
      URL.revokeObjectURL(url);
    }
  }
};

const AdminPackages = () => {
  const { theme, mode } = useTheme();
  const [packages, setPackages] = useState<SolarPackage[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedDeleteId, setSelectedDeleteId] = useState<number | null>(null);
  const [editingPackage, setEditingPackage] = useState<SolarPackage | null>(null);
  const [formData, setFormData] = useState<PackageForm>(createEmptyForm);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "info" | "error",
  });

  const loadPackages = async () => {
    setLoading(true);
    try {
      const data = await fetchAdminPackages();
      setPackages(data);
    } catch {
      setSnackbar({ open: true, message: "Unable to load packages.", severity: "error" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPackages();
  }, []);

  useEffect(() => {
    return () => {
      revokeBlobUrls(formData.imagePreviews);
    };
  }, [formData.imagePreviews]);

  const handleOpen = (pkg?: SolarPackage) => {
    setFormData((prev) => {
      revokeBlobUrls(prev.imagePreviews);

      if (pkg) {
        const images = pkg.images || [];
        return {
          name: pkg.name || "",
          description: pkg.description || "",
          price: pkg.price === null ? "" : String(pkg.price),
          requiresCustomPrice: Boolean(pkg.requiresCustomPrice),
          whatsappLink: pkg.whatsappLink || "",
          isActive: typeof pkg.isActive === "undefined" ? true : Boolean(pkg.isActive),
          existingImages: images,
          newImageFiles: [],
          imagePreviews: images,
        };
      }

      return createEmptyForm();
    });

    setEditingPackage(pkg || null);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingPackage(null);
    setFormData((prev) => {
      revokeBlobUrls(prev.imagePreviews);
      return createEmptyForm();
    });
  };

  const handleSnackbarClose = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files?.length) return;

    const selectedFiles = Array.from(files);
    const availableSlots = Math.max(0, 6 - formData.imagePreviews.length);
    const limitedFiles = selectedFiles.slice(0, availableSlots);

    if (!limitedFiles.length) {
      setSnackbar({
        open: true,
        message: "Maximum of 6 images allowed.",
        severity: "info",
      });
      return;
    }

    const previews = limitedFiles.map((file) => URL.createObjectURL(file));

    setFormData((prev) => ({
      ...prev,
      newImageFiles: [...prev.newImageFiles, ...limitedFiles],
      imagePreviews: [...prev.imagePreviews, ...previews],
    }));
  };

  const handleSave = async () => {
    if (!formData.name.trim()) {
      setSnackbar({
        open: true,
        message: "Package name is required.",
        severity: "error",
      });
      return;
    }

    if (!formData.requiresCustomPrice && !formData.price) {
      setSnackbar({
        open: true,
        message: "Price is required when custom pricing is disabled.",
        severity: "error",
      });
      return;
    }

    try {
      const payload = {
        name: formData.name.trim(),
        description: formData.description.trim(),
        price: formData.requiresCustomPrice ? null : Number(formData.price),
        requiresCustomPrice: formData.requiresCustomPrice,
        whatsappLink: formData.whatsappLink.trim() || undefined,
        isActive: formData.isActive,
        images: formData.newImageFiles.length ? formData.newImageFiles : formData.existingImages,
      };

      if (editingPackage) {
        await updateAdminPackage(editingPackage.id, payload);
        setSnackbar({ open: true, message: "Package updated successfully.", severity: "success" });
      } else {
        await createAdminPackage(payload);
        setSnackbar({ open: true, message: "Package created successfully.", severity: "success" });
      }

      handleClose();
      await loadPackages();
    } catch {
      setSnackbar({ open: true, message: "Unable to save package.", severity: "error" });
    }
  };

  const confirmDelete = (id: number) => {
    setSelectedDeleteId(id);
    setConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedDeleteId) return;
    try {
      await deleteAdminPackage(selectedDeleteId);
      setSnackbar({ open: true, message: "Package deleted successfully.", severity: "info" });
      await loadPackages();
    } catch (error: any) {
      setSnackbar({
        open: true,
        message: error?.response?.data?.error || "Unable to delete package.",
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
          Manage Packages
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
          Add Package
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
                {["Images", "Package", "Pricing", "Status", "Actions"].map((header) => (
                  <TableCell key={header} sx={{ color: theme.palette.primary.main, fontWeight: "bold", fontFamily: "JUST Sans ExBold" }}>
                    {header}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {packages.map((pkg) => (
                <TableRow key={pkg.id}>
                  <TableCell>
                    <Box sx={{ display: "flex", gap: 1 }}>
                      {pkg.images && pkg.images.length > 0 ? (
                        pkg.images.slice(0, 3).map((image, idx) => (
                          <img
                            key={idx}
                            src={image}
                            alt={pkg.name}
                            style={{
                              width: 48,
                              height: 48,
                              borderRadius: "8px",
                              objectFit: "cover",
                            }}
                          />
                        ))
                      ) : (
                        <Box
                          sx={{
                            width: 48,
                            height: 48,
                            bgcolor: theme.palette.divider,
                            borderRadius: "8px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Image sx={{ color: theme.palette.text.secondary }} />
                        </Box>
                      )}
                    </Box>
                  </TableCell>
                  <TableCell sx={{ color: theme.palette.text.primary, fontFamily: "JUST Sans Regular" }}>
                    <Typography sx={{ fontFamily: "JUST Sans ExBold" }}>{pkg.name}</Typography>
                    <Typography sx={{ color: theme.palette.text.secondary, fontFamily: "JUST Sans Regular", fontSize: "0.85rem" }}>
                      {pkg.description || "No description"}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ color: theme.palette.text.primary, fontFamily: "JUST Sans Regular" }}>
                    {pkg.requiresCustomPrice
                      ? "Custom pricing"
                      : `₦${Number(pkg.price || 0).toLocaleString()}`}
                  </TableCell>
                  <TableCell sx={{ color: theme.palette.text.primary, fontFamily: "JUST Sans Regular" }}>
                    {pkg.isActive ? "Active" : "Archived"}
                  </TableCell>
                  <TableCell>
                    <IconButton color="inherit" size="small" onClick={() => handleOpen(pkg)}>
                      <Edit sx={{ color: theme.palette.primary.main }} />
                    </IconButton>
                    <IconButton color="inherit" size="small" onClick={() => confirmDelete(pkg.id)}>
                      <Delete sx={{ color: "red" }} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {!packages.length && (
            <Typography sx={{ p: 2, color: theme.palette.text.secondary, fontFamily: "JUST Sans Regular" }}>
              {loading ? "Loading packages..." : "No packages found."}
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
            {editingPackage ? "Edit Package" : "Add Package"}
          </DialogTitle>
          <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
            <TextField
              label="Package Name"
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
            {!formData.requiresCustomPrice && (
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
            )}
            <TextField
              label="Custom Request WhatsApp Link (Optional)"
              name="whatsappLink"
              value={formData.whatsappLink}
              onChange={handleInputChange}
              fullWidth
              InputLabelProps={{ style: { color: theme.palette.text.secondary } }}
              InputProps={{ sx: { color: theme.palette.text.primary } }}
            />

            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.requiresCustomPrice}
                  onChange={(event) =>
                    setFormData((prev) => ({
                      ...prev,
                      requiresCustomPrice: event.target.checked,
                    }))
                  }
                />
              }
              label="This package requires custom pricing"
            />

            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.isActive}
                  onChange={(event) =>
                    setFormData((prev) => ({
                      ...prev,
                      isActive: event.target.checked,
                    }))
                  }
                />
              }
              label="Active"
            />

            <Box>
              <Typography variant="body2" sx={{ mb: 1, fontFamily: "JUST Sans Regular" }}>
                Upload Package Images (up to 6)
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
                Upload
                <input hidden multiple accept="image/*" type="file" onChange={handleImageChange} />
              </Button>

              {formData.imagePreviews.length > 0 && (
                <Grid container spacing={1} sx={{ mt: 2 }}>
                  {formData.imagePreviews.map((image, idx) => (
                    <Grid size={{ xs: 4 }} key={`${image}-${idx}`}>
                      <img
                        src={image}
                        alt="preview"
                        style={{
                          width: "100%",
                          borderRadius: 8,
                          objectFit: "cover",
                        }}
                      />
                    </Grid>
                  ))}
                </Grid>
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
              {editingPackage ? "Save Changes" : "Add Package"}
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
            <Typography sx={{ fontFamily: "JUST Sans Regular" }}>
              This package will be permanently deleted. Continue?
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setConfirmOpen(false)} sx={{ color: theme.palette.text.secondary }}>
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleConfirmDelete}
              sx={{ bgcolor: "#d9534f", color: "#fff", fontFamily: "JUST Sans ExBold" }}
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>

        <Snackbar
          open={snackbar.open}
          autoHideDuration={3500}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
          <Alert onClose={handleSnackbarClose} severity={snackbar.severity} variant="filled">
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Box>
    </AdminLayout>
  );
};

export default AdminPackages;
