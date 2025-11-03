import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
} from "@mui/material";
import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import TopNav from "../../navigation/TopNav";
import Footer from "../../navigation/Footer";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }
    login({ id: "3", name, email, role: "customer" });
    navigate("/dashboard");
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
            boxShadow: "0 0 25px rgba(46,125,77,0.15)",
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
            Create an Account
          </Typography>

          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              required
              margin="normal"
              label="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
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

            <TextField
              fullWidth
              required
              margin="normal"
              label="Confirm Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
              Register
            </Button>
          </Box>
        </Paper>
      </Container>

      <Footer />
    </Box>
  );
};

export default RegisterPage;
