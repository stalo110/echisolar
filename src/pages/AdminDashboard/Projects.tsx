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
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { Edit, Delete, Image } from "@mui/icons-material";
import { useEffect, useState, type ChangeEvent } from "react";
import AdminLayout from "../../components/Admin/AdminLayout";
import { useTheme } from "../../contexts/ThemeContext";
import {
  createProject,
  deleteProject,
  fetchAdminProjects,
  type Project,
  updateProject,
} from "../../services/projectService";

type ProjectForm = {
  title: string;
  description: string;
  link: string;
  isFeatured: boolean;
  existingImages: string[];
  newImageFiles: File[];
  imagePreviews: string[];
};

const createEmptyFormData = (): ProjectForm => ({
  title: "",
  description: "",
  link: "",
  isFeatured: false,
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

const AdminProjects = () => {
  const { theme, mode } = useTheme();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedDeleteId, setSelectedDeleteId] = useState<number | null>(null);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [formData, setFormData] = useState<ProjectForm>(createEmptyFormData);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "info" | "error",
  });

  const loadProjects = async () => {
    setLoading(true);
    try {
      const data = await fetchAdminProjects();
      setProjects(data);
    } catch {
      setSnackbar({ open: true, message: "Unable to load projects.", severity: "error" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  useEffect(() => {
    return () => {
      revokeBlobUrls(formData.imagePreviews);
    };
  }, [formData.imagePreviews]);

  const handleOpen = (project?: Project) => {
    setFormData((prev) => {
      revokeBlobUrls(prev.imagePreviews);

      if (project) {
        const existingImages = project.images || [];
        return {
          title: project.title || "",
          description: project.description || "",
          link: project.link || "",
          isFeatured: Boolean(project.isFeatured),
          existingImages,
          newImageFiles: [],
          imagePreviews: existingImages,
        };
      }

      return createEmptyFormData();
    });

    if (project) {
      setEditingProject(project);
    } else {
      setEditingProject(null);
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingProject(null);
    setFormData((prev) => {
      revokeBlobUrls(prev.imagePreviews);
      return createEmptyFormData();
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
    const previews = selectedFiles.map((file) => URL.createObjectURL(file));

    setFormData((prev) => ({
      ...prev,
      newImageFiles: [...prev.newImageFiles, ...selectedFiles],
      imagePreviews: [...prev.imagePreviews, ...previews],
    }));
  };

  const handleSave = async () => {
    if (!formData.title.trim() || !formData.description.trim()) {
      setSnackbar({
        open: true,
        message: "Please fill in title and description.",
        severity: "error",
      });
      return;
    }

    try {
      const payload = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        link: formData.link.trim() || undefined,
        images: formData.newImageFiles.length ? formData.newImageFiles : formData.existingImages,
        isFeatured: formData.isFeatured,
        isActive: true,
      };

      if (editingProject) {
        await updateProject(editingProject.id, payload);
        setSnackbar({ open: true, message: "Project updated successfully.", severity: "success" });
      } else {
        await createProject(payload);
        setSnackbar({ open: true, message: "Project added successfully.", severity: "success" });
      }

      handleClose();
      await loadProjects();
    } catch {
      setSnackbar({ open: true, message: "Unable to save project.", severity: "error" });
    }
  };

  const confirmDelete = (id: number) => {
    setSelectedDeleteId(id);
    setConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedDeleteId) return;
    try {
      await deleteProject(selectedDeleteId);
      setSnackbar({
        open: true,
        message: "Project deleted successfully.",
        severity: "info",
      });
      await loadProjects();
    } catch {
      setSnackbar({
        open: true,
        message: "Unable to delete project.",
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
          Manage Projects
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
          Add Project
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
                {["Images", "Title", "Featured", "Link", "Description", "Actions"].map((header) => (
                  <TableCell key={header} sx={{ color: theme.palette.primary.main, fontWeight: "bold", fontFamily: "JUST Sans ExBold" }}>
                    {header}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {projects.map((project) => (
                <TableRow key={project.id}>
                  <TableCell>
                    <Box sx={{ display: "flex", gap: 1 }}>
                      {project.images && project.images.length > 0 ? (
                        project.images.slice(0, 3).map((image, idx) => (
                          <img
                            key={idx}
                            src={image}
                            alt={project.title}
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
                  <TableCell sx={{ color: theme.palette.text.primary, fontFamily: "JUST Sans Regular" }}>{project.title}</TableCell>
                  <TableCell sx={{ color: theme.palette.text.primary, fontFamily: "JUST Sans Regular" }}>
                    {project.isFeatured ? "Yes" : "No"}
                  </TableCell>
                  <TableCell sx={{ color: theme.palette.text.primary, fontFamily: "JUST Sans Regular" }}>
                    {project.link ? (
                      <a href={project.link} target="_blank" rel="noreferrer" style={{ color: theme.palette.primary.main }}>
                        {project.link}
                      </a>
                    ) : (
                      "N/A"
                    )}
                  </TableCell>
                  <TableCell sx={{ color: theme.palette.text.secondary, fontFamily: "JUST Sans Regular" }}>
                    {project.description || "N/A"}
                  </TableCell>
                  <TableCell>
                    <IconButton color="inherit" size="small" onClick={() => handleOpen(project)}>
                      <Edit sx={{ color: theme.palette.primary.main }} />
                    </IconButton>
                    <IconButton color="inherit" size="small" onClick={() => confirmDelete(project.id)}>
                      <Delete sx={{ color: "red" }} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {!projects.length && (
            <Typography sx={{ p: 2, color: theme.palette.text.secondary, fontFamily: "JUST Sans Regular" }}>
              {loading ? "Loading projects..." : "No projects found."}
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
            {editingProject ? "Edit Project" : "Add Project"}
          </DialogTitle>
          <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
            <TextField
              label="Project Title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              fullWidth
              InputLabelProps={{ style: { color: theme.palette.text.secondary } }}
              InputProps={{ sx: { color: theme.palette.text.primary } }}
            />
            <TextField
              label="Project Link"
              name="link"
              value={formData.link}
              onChange={handleInputChange}
              fullWidth
              InputLabelProps={{ style: { color: theme.palette.text.secondary } }}
              InputProps={{ sx: { color: theme.palette.text.primary } }}
            />
            <TextField
              label="Description"
              name="description"
              multiline
              rows={4}
              value={formData.description}
              onChange={handleInputChange}
              fullWidth
              InputLabelProps={{ style: { color: theme.palette.text.secondary } }}
              InputProps={{ sx: { color: theme.palette.text.primary } }}
            />

            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.isFeatured}
                  onChange={(event) =>
                    setFormData((prev) => ({
                      ...prev,
                      isFeatured: event.target.checked,
                    }))
                  }
                />
              }
              label="Mark as featured"
            />

            <Box>
              <Typography variant="body2" sx={{ mb: 1, fontFamily: "JUST Sans Regular" }}>
                Upload Project Images
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
                    <Grid size={{ xs: 4 }} key={idx}>
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
              {editingProject ? "Save Changes" : "Add Project"}
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
            <Typography sx={{ fontFamily: "JUST Sans Regular" }}>Are you sure you want to delete this project?</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setConfirmOpen(false)} sx={{ color: theme.palette.text.secondary }}>
              Cancel
            </Button>
            <Button variant="contained" sx={{ bgcolor: "red", color: "#fff", fontWeight: "bold", fontFamily: "JUST Sans ExBold" }} onClick={handleConfirmDelete}>
              Delete
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

export default AdminProjects;
