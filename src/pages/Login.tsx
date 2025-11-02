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
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import TopNav from "../navigation/TopNav";
import Footer from "../navigation/Footer";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === "admin@echisolar.com" && password === "password") {
      login({ id: "1", name: "Admin", email, role: "admin" });
      navigate("/admin");
    } else {
      login({ id: "2", name: "User", email, role: "customer" });
      navigate("/dashboard");
    }
  };

  return (
    <Box sx={{ bgcolor: "#0b0b0b", minHeight: "100vh", color: "#fff" }}>
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
            bgcolor: "#1a1a1a",
            borderRadius: 3,
            border: "1px solid #2e2e2e",
            boxShadow: "0 0 25px rgba(255,171,70,0.05)",
          }}
        >
          <Typography
            component="h1"
            variant="h5"
            sx={{
              color: "var(--brand-amber)",
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
              InputLabelProps={{ style: { color: "#bbb" } }}
              InputProps={{
                style: {
                  color: "#fff",
                  background: "#121212",
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
              InputLabelProps={{ style: { color: "#bbb" } }}
              InputProps={{
                style: {
                  color: "#fff",
                  background: "#121212",
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
                background: "var(--brand-green)",
                color: "#fff",
                fontFamily: "JUST Sans ExBold",
                textTransform: "none",
                py: 1.2,
                "&:hover": { background: "#36a15f" },
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
                color: "var(--brand-amber)",
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
