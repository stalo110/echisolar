import { Box, Button, Container, Link, Paper, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { toast } from "material-react-toastify";
import { forgotPassword } from "../../services/authService";
import TopNav from "../../navigation/TopNav";
import Footer from "../../navigation/Footer";
import { useTheme } from "../../contexts/ThemeContext";
import { getApiErrorMessage } from "../../utils/apiError";

const ForgotPasswordPage = () => {
  const { theme, mode } = useTheme();
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      toast.error("Email is required");
      return;
    }

    try {
      setSubmitting(true);
      const result = await forgotPassword({ email });
      toast.success(result.message);
    } catch (err) {
      toast.error(getApiErrorMessage(err, "Unable to process forgot password request."));
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
            Forgot Password
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: theme.palette.text.secondary, textAlign: "center", mb: 2, fontFamily: "JUST Sans Regular" }}
          >
            Enter your account email and we will send you a reset link.
          </Typography>

          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              required
              margin="normal"
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              InputLabelProps={{ style: { color: theme.palette.text.secondary } }}
              InputProps={{
                style: {
                  color: theme.palette.text.primary,
                  background: mode === "dark" ? "#121212" : "#f5f5f5",
                  borderRadius: "8px",
                },
              }}
            />

            <Button
              type="submit"
              disabled={submitting}
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
              {submitting ? "Sending..." : "Send Reset Link"}
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

export default ForgotPasswordPage;
