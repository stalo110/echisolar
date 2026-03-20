import { Box, Button, Container, Link, Paper, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "material-react-toastify";
import { resetPassword } from "../../services/authService";
import TopNav from "../../navigation/TopNav";
import Footer from "../../navigation/Footer";
import { useTheme } from "../../contexts/ThemeContext";
import { getApiErrorMessage } from "../../utils/apiError";

const ResetPasswordPage = () => {
  const { theme, mode } = useTheme();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const token = (searchParams.get("token") || "").trim();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token) {
      toast.error("Invalid or missing reset token");
      return;
    }
    if (!password) {
      toast.error("Password is required");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords must match");
      return;
    }

    try {
      setSubmitting(true);
      const result = await resetPassword({ token, password, confirmPassword });
      toast.success(result.message);
      navigate("/login");
    } catch (err) {
      toast.error(getApiErrorMessage(err, "Unable to reset password right now."));
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box sx={{ bgcolor: theme.palette.background.default, minHeight: "100vh", color: theme.palette.text.primary }}>
      <TopNav />

      <Container
        component="main"
        maxWidth="xs"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          py: 8,
        }}
      >
        <Paper
          elevation={10}
          sx={{
            p: 4,
            width: "100%",
            bgcolor: theme.palette.background.paper,
            borderRadius: 3,
            border: `1px solid ${theme.palette.divider}`,
            boxShadow: `0 0 25px ${theme.palette.primary.main}05`,
          }}
        >
          <Typography
            component="h1"
            variant="h5"
            sx={{
              color: theme.palette.primary.main,
              textAlign: "center",
              fontFamily: "JUST Sans ExBold",
              mb: 2,
            }}
          >
            Reset Password
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: theme.palette.text.secondary, textAlign: "center", mb: 2, fontFamily: "JUST Sans Regular" }}
          >
            Choose a new password for your account.
          </Typography>

          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              required
              margin="normal"
              label="New Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputLabelProps={{ style: { color: theme.palette.text.secondary } }}
              InputProps={{
                style: {
                  color: theme.palette.text.primary,
                  background: mode === "dark" ? "#121212" : "#f5f5f5",
                  borderRadius: "8px",
                },
              }}
            />

            <TextField
              fullWidth
              required
              margin="normal"
              label="Confirm New Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              InputLabelProps={{ style: { color: theme.palette.text.secondary } }}
              InputProps={{
                style: {
                  color: theme.palette.text.primary,
                  background: mode === "dark" ? "#121212" : "#f5f5f5",
                  borderRadius: "8px",
                },
              }}
            />

            {!token ? (
              <Typography sx={{ color: theme.palette.error.main, fontFamily: "JUST Sans Regular", mt: 1 }}>
                Reset link is invalid or missing a token.
              </Typography>
            ) : null}

            <Button
              type="submit"
              disabled={submitting || !token}
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                background: theme.palette.secondary.main,
                color: mode === "dark" ? "#fff" : "#000",
                fontFamily: "JUST Sans ExBold",
                textTransform: "none",
                py: 1.2,
                "&:hover": { background: theme.palette.secondary.dark },
              }}
            >
              {submitting ? "Updating..." : "Update Password"}
            </Button>

            <Link
              href="/login"
              variant="body2"
              sx={{
                display: "block",
                textAlign: "center",
                mt: 1,
                color: theme.palette.primary.main,
                textDecoration: "none",
                fontFamily: "JUST Sans Regular",
                "&:hover": { textDecoration: "underline" },
              }}
            >
              Back to sign in
            </Link>
          </Box>
        </Paper>
      </Container>

      <Footer />
    </Box>
  );
};

export default ResetPasswordPage;
