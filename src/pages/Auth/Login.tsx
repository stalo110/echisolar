import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  Link,
  InputAdornment,
  IconButton,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import TopNav from "../../navigation/TopNav";
import Footer from "../../navigation/Footer";
import { useTheme } from "../../contexts/ThemeContext";
import { toast } from "material-react-toastify";
import { getApiErrorMessage } from "../../utils/apiError";

const LoginPage = () => {
  const { theme, mode } = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const user = await login({ email, password });
      const redirectTo = (location.state as { redirectTo?: string } | null)?.redirectTo;
      if (redirectTo) {
        navigate(redirectTo, { replace: true });
        return;
      }

      if (user?.role === "admin") navigate("/admin/dashboard");
      else navigate("/user/dashboard");
    } catch (err) {
      toast.error(getApiErrorMessage(err, "Unable to sign in. Check your credentials."));
      console.error(err);
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
              mb: 3,
            }}
          >
            Welcome Back
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
                  background: mode === 'dark' ? "#121212" : "#f5f5f5",
                  borderRadius: "8px",
                },
              }}
            />

            <TextField
              fullWidth
              required
              margin="normal"
              label="Password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputLabelProps={{ style: { color: theme.palette.text.secondary } }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label={showPassword ? "Hide password" : "Show password"}
                      onClick={() => setShowPassword((prev) => !prev)}
                      edge="end"
                      sx={{ color: theme.palette.text.secondary }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
                style: {
                  color: theme.palette.text.primary,
                  background: mode === 'dark' ? "#121212" : "#f5f5f5",
                  borderRadius: "8px",
                },
              }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                background: theme.palette.secondary.main,
                color: mode === 'dark' ? "#fff" : "#000",
                fontFamily: "JUST Sans ExBold",
                textTransform: "none",
                py: 1.2,
                "&:hover": { background: theme.palette.secondary.dark },
              }}
            >
              Sign In
            </Button>

            <Link
              href="/forgot-password"
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
              Forgot your password?
            </Link>

            <Link
              href="/register"
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
              Not registered yet? Click here to register
            </Link>
          </Box>
        </Paper>
      </Container>

      <Footer />
    </Box>
  );
};

export default LoginPage;
