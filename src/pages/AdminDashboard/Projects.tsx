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
  Snackbar,
  Alert,
  Grid,
} from "@mui/material";
import { Edit, Delete, Add, Image } from "@mui/icons-material";
import { useState, type ChangeEvent } from "react";
import AdminLayout from "../../components/Admin/AdminLayout";

const brandAmber = "#FFAB46";

interface Project {
  id: number;
  title: string;
  description: string;
  location: string;
  images: string[];
}

const AdminProjects = () => {
  const [projects, setProjects] = useState<Project[]>([
    {
      id: 1,
      title: "Lagos Community Microgrid",
      description:
        "A 50kW hybrid microgrid powering a community clinic and 12 homes in Lagos.",
      location: "Lagos, Nigeria",
      images: [],
    },
    {
      id: 2,
      title: "Benin Rooftop Solar",
      description:
        "5kW rooftop solar installation for residential use, with battery storage.",
      location: "Benin City, Nigeria",
      images: [],
    },
  ]);

  const [open, setOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedDeleteId, setSelectedDeleteId] = useState<number | null>(null);

  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [formData, setFormData] = useState<Partial<Project>>({
    title: "",
    description: "",
    location: "",
    images: [],
  });

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "info" | "error",
  });

  const handleOpen = (project?: Project) => {
    if (project) {
      setEditingProject(project);
      setFormData(project);
    } else {
      setEditingProject(null);
      setFormData({ title: "", description: "", location: "", images: [] });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingProject(null);
  };

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newImages: string[] = [];

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        newImages.push(reader.result as string);
        setFormData((prev) => ({
          ...prev,
          images: [...(prev.images || []), ...newImages],
        }));
      };
      reader.readAsDataURL(file);
    });
  };

  const handleSave = () => {
    if (!formData.title || !formData.description) {
      setSnackbar({
        open: true,
        message: "Please fill in all required fields.",
        severity: "error",
      });
      return;
    }

    if (editingProject) {
      setProjects((prev) =>
        prev.map((p) =>
          p.id === editingProject.id ? { ...editingProject, ...formData } : p
        )
      );
      setSnackbar({
        open: true,
        message: "Project updated successfully!",
        severity: "success",
      });
    } else {
      setProjects((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          title: formData.title || "",
          description: formData.description || "",
          location: formData.location || "",
          images: formData.images || [],
        },
      ]);
      setSnackbar({
        open: true,
        message: "Project added successfully!",
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
      setProjects((prev) => prev.filter((p) => p.id !== selectedDeleteId));
      setSnackbar({
        open: true,
        message: "Project deleted successfully!",
        severity: "info",
      });
    }
    setConfirmOpen(false);
    setSelectedDeleteId(null);
  };

  return (
    <AdminLayout>
    <Box sx={{ p: 3, color: "#fff", bgcolor: "#0D0D0D", minHeight: "100vh" }}>
      <Typography variant="h5" sx={{ fontWeight: "bold", color: brandAmber, mb: 3 }}>
        Manage Projects
      </Typography>

      <Button
        variant="contained"
        startIcon={<Add />}
        onClick={() => handleOpen()}
        sx={{
          mb: 3,
          bgcolor: brandAmber,
          color: "#000",
          fontWeight: "bold",
          "&:hover": { bgcolor: "#FF9C25" },
        }}
      >
        Add Project
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
              {["Images", "Title", "Location", "Description", "Actions"].map((h) => (
                <TableCell key={h} sx={{ color: brandAmber, fontWeight: "bold" }}>
                  {h}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {projects.map((p) => (
              <TableRow key={p.id}>
                <TableCell>
                  <Box sx={{ display: "flex", gap: 1 }}>
                    {p.images && p.images.length > 0 ? (
                      p.images.map((img, idx) => (
                        <img
                          key={idx}
                          src={img}
                          alt={p.title}
                          style={{
                            width: 50,
                            height: 50,
                            borderRadius: "8px",
                            objectFit: "cover",
                          }}
                        />
                      ))
                    ) : (
                      <Box
                        sx={{
                          width: 50,
                          height: 50,
                          bgcolor: "rgba(255,255,255,0.1)",
                          borderRadius: "8px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Image sx={{ color: "#555" }} />
                      </Box>
                    )}
                  </Box>
                </TableCell>
                <TableCell sx={{ color: "#fff" }}>{p.title}</TableCell>
                <TableCell sx={{ color: "#fff" }}>{p.location}</TableCell>
                <TableCell sx={{ color: "#ccc" }}>{p.description}</TableCell>
                <TableCell>
                  <IconButton color="inherit" size="small" onClick={() => handleOpen(p)}>
                    <Edit sx={{ color: brandAmber }} />
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
            bgcolor: "#1A1A1A",
            color: "#fff",
            borderRadius: 3,
          },
        }}
      >
        <DialogTitle sx={{ color: brandAmber, fontWeight: "bold" }}>
          {editingProject ? "Edit Project" : "Add Project"}
        </DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
          <TextField
            label="Project Title"
            name="title"
            value={formData.title || ""}
            onChange={handleInputChange}
            fullWidth
            InputLabelProps={{ style: { color: "#ccc" } }}
            InputProps={{ sx: { color: "#fff" } }}
          />
          <TextField
            label="Location"
            name="location"
            value={formData.location || ""}
            onChange={handleInputChange}
            fullWidth
            InputLabelProps={{ style: { color: "#ccc" } }}
            InputProps={{ sx: { color: "#fff" } }}
          />
          <TextField
            label="Description"
            name="description"
            multiline
            rows={4}
            value={formData.description || ""}
            onChange={handleInputChange}
            fullWidth
            InputLabelProps={{ style: { color: "#ccc" } }}
            InputProps={{ sx: { color: "#fff" } }}
          />

          <Box>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Upload Project Images
            </Typography>
            <Button
              variant="outlined"
              component="label"
              sx={{
                borderColor: brandAmber,
                color: brandAmber,
                "&:hover": { borderColor: "#FF9C25" },
              }}
            >
              Upload
              <input
                hidden
                multiple
                accept="image/*"
                type="file"
                onChange={handleImageChange}
              />
            </Button>

            {formData.images && formData.images.length > 0 && (
              <Grid container spacing={1} sx={{ mt: 2 }}>
                {formData.images.map((img, idx) => (
                  <Grid size={{xs:4}} key={idx}>
                    <img
                      src={img}
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
          <Button onClick={handleClose} sx={{ color: "#ccc" }}>
            Cancel
          </Button>
          <Button
            variant="contained"
            sx={{ bgcolor: brandAmber, color: "#000", fontWeight: "bold" }}
            onClick={handleSave}
          >
            {editingProject ? "Save Changes" : "Add Project"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Confirm Delete Modal */}
      <Dialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        PaperProps={{
          sx: {
            bgcolor: "#1A1A1A",
            color: "#fff",
            borderRadius: 3,
            p: 2,
          },
        }}
      >
        <DialogTitle sx={{ color: brandAmber, fontWeight: "bold" }}>
          Confirm Deletion
        </DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this project?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)} sx={{ color: "#ccc" }}>
            Cancel
          </Button>
          <Button
            variant="contained"
            sx={{ bgcolor: "red", color: "#fff", fontWeight: "bold" }}
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

export default AdminProjects;
