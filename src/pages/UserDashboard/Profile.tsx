import {
  Box,
  Typography,
  Grid,
  Paper,
  Button,
  Avatar,
  Divider,
  TextField,
} from "@mui/material";
import UserDashboardLayout from "../../components/User/UserDashboardLayout";
import { useTheme } from "../../contexts/ThemeContext";
import { useEffect, useState } from "react";
import { getProfile, updateProfile } from "../../services/userService";
import { toast } from "material-react-toastify";
import { useAuth } from "../../contexts/AuthContext";

const Profile = () => {
  const { theme, mode } = useTheme();
  const { updateUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    address: "",
    country: "",
    joined: "",
  });
  const [form, setForm] = useState({
    name: "",
    address: "",
    country: "",
  });

  useEffect(() => {
    setLoading(true);
    getProfile()
      .then((data) => {
        setProfile({
          name: data.name || "",
          email: data.email || "",
          address: data.address || "",
          country: data.country || "",
          joined: data.createdAt ? new Date(data.createdAt).toLocaleDateString() : "",
        });
        setForm({
          name: data.name || "",
          address: data.address || "",
          country: data.country || "",
        });
      })
      .catch(() => {
        toast.error("Unable to load profile.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleSave = async () => {
    if (!form.name.trim()) {
      toast.error("Name is required.");
      return;
    }
    setSaving(true);
    try {
      await updateProfile({
        name: form.name.trim(),
        address: form.address.trim(),
        country: form.country.trim(),
      });
      setProfile((prev) => ({
        ...prev,
        name: form.name.trim(),
        address: form.address.trim(),
        country: form.country.trim(),
      }));
      updateUser({ name: form.name.trim(), country: form.country.trim() || null });
      toast.success("Profile updated.");
    } catch {
      toast.error("Unable to update profile.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <UserDashboardLayout>
      <Typography
        variant="h4"
        sx={{ fontWeight: "700", color: theme.palette.primary.main, mb: 4, fontFamily: "JUST Sans ExBold" }}
      >
        My Profile
      </Typography>

      <Grid container spacing={3}>
        {/* Summary Card */}
        <Grid size={{ xs: 12, md: 5 }}>
            <Paper
              sx={{
                p: 3,
                background: theme.palette.background.paper,
                border: `1px solid ${theme.palette.divider}`,
                color: theme.palette.text.primary,
                borderRadius: 3,
                boxShadow: mode === 'dark' ? "0 4px 20px rgba(0,0,0,0.4)" : "0 4px 20px rgba(0,0,0,0.1)",
              }}
            >
            <Box sx={{ textAlign: "center" }}>
              <Avatar
                sx={{
                  width: 100,
                  height: 100,
                  mb: 2,
                  mx: "auto",
                  bgcolor: theme.palette.primary.main,
                  fontSize: 32,
                }}
              >
                {(profile.name || "?").charAt(0)}
              </Avatar>
              <Typography variant="h6" sx={{ fontFamily: "JUST Sans ExBold" }}>
                {profile.name || (loading ? "Loading..." : "—")}
              </Typography>
              <Typography variant="body2" sx={{ color: theme.palette.text.secondary, fontFamily: "JUST Sans Regular" }}>
                {profile.email || "—"}
              </Typography>
            </Box>

            <Divider sx={{ my: 3, borderColor: theme.palette.divider }} />

            <Typography variant="body2" sx={{ fontFamily: "JUST Sans Regular" }}>
              <strong>Country:</strong> {profile.country || "—"}
            </Typography>
            <Typography variant="body2" sx={{ fontFamily: "JUST Sans Regular" }}>
              <strong>Address:</strong> {profile.address || "—"}
            </Typography>
            <Typography variant="body2" sx={{ fontFamily: "JUST Sans Regular" }}>
              <strong>Member since:</strong> {profile.joined || "—"}
            </Typography>
          </Paper>
        </Grid>

        {/* Account Overview */}
        <Grid size={{ xs: 12, md: 7 }}>
        <Paper
            sx={{
              p: 3,
              background: theme.palette.background.paper,
              border: `1px solid ${theme.palette.divider}`,
              color: theme.palette.text.primary,
              borderRadius: 3,
              boxShadow: mode === 'dark' ? "0 4px 20px rgba(0,0,0,0.4)" : "0 4px 20px rgba(0,0,0,0.1)",
            }}
          >
            <Typography variant="h6" sx={{ color: theme.palette.primary.main, mb: 2, fontFamily: "JUST Sans ExBold" }}>
              Account Overview
            </Typography>
            <Box mt={3}>
              <TextField
                label="Full Name"
                value={form.name}
                onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
                fullWidth
                margin="dense"
                InputLabelProps={{ style: { color: theme.palette.text.secondary } }}
                sx={{ input: { color: theme.palette.text.primary } }}
              />
              <TextField
                label="Address"
                value={form.address}
                onChange={(e) => setForm((prev) => ({ ...prev, address: e.target.value }))}
                fullWidth
                margin="dense"
                InputLabelProps={{ style: { color: theme.palette.text.secondary } }}
                sx={{ input: { color: theme.palette.text.primary } }}
              />
              <TextField
                label="Country"
                value={form.country}
                onChange={(e) => setForm((prev) => ({ ...prev, country: e.target.value }))}
                fullWidth
                margin="dense"
                InputLabelProps={{ style: { color: theme.palette.text.secondary } }}
                sx={{ input: { color: theme.palette.text.primary } }}
              />
              <Button
                variant="contained"
                onClick={handleSave}
                disabled={saving || loading}
                sx={{
                  mt: 2,
                  bgcolor: theme.palette.primary.main,
                  color: mode === 'dark' ? "#000" : "#fff",
                  fontWeight: "600",
                  fontFamily: "JUST Sans ExBold",
                  "&:hover": { bgcolor: theme.palette.primary.dark },
                }}
              >
                {saving ? "Saving..." : "Save Profile"}
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </UserDashboardLayout>
  );
};

export default Profile;
