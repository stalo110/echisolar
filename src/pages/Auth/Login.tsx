import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  Link,
} from "@mui/material";
import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import TopNav from "../../navigation/TopNav";
import Footer from "../../navigation/Footer";
import { useTheme } from "../../contexts/ThemeContext";

const LoginPage = () => {
  const { theme, mode } = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === "admin@echisolar.com" && password === "admin") {
      login({ id: "1", name: "Admin", email, role: "admin" });
      navigate("/admin/dashboard");
    } else {
      login({ id: "2", name: "User", email, role: "customer" });
      navigate("/user/dashboard");
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
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputLabelProps={{ style: { color: theme.palette.text.secondary } }}
              InputProps={{
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
