import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  InputAdornment,
  IconButton,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate, useSearchParams } from "react-router-dom";
import TopNav from "../../navigation/TopNav";
import Footer from "../../navigation/Footer";
import { useTheme } from "../../contexts/ThemeContext";
import { toast } from "material-react-toastify";
import { getApiErrorMessage } from "../../utils/apiError";

const RegisterPage = () => {
  const { theme, mode } = useTheme();
  const [searchParams] = useSearchParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [country, setCountry] = useState("NG");
  const [referralCode, setReferralCode] = useState(searchParams.get("ref") || "");
  const { register } = useAuth();
  const navigate = useNavigate();
  const inputLabelSx = {
    color: theme.palette.text.secondary,
    fontSize: "0.92rem",
    "&.MuiInputLabel-shrink": {
      fontSize: "0.92rem",
    },
  };
  const inputFieldSx = {
    color: theme.palette.text.primary,
    background: mode === "dark" ? "#121212" : "#f5f5f5",
    borderRadius: "8px",
    fontSize: "0.95rem",
    "& input": {
      fontSize: "0.95rem",
      py: 1.35,
    },
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords must match");
      return;
    }
    try {
      await register({
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        password,
        country: country.trim(),
        referralCode: referralCode.trim() || undefined,
      });
      navigate("/user/dashboard");
    } catch (err) {
      toast.error(getApiErrorMessage(err, "Unable to register. Try again."));
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
            boxShadow: `0 0 25px ${theme.palette.secondary.main}15`,
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
            Create an Account
          </Typography>

          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              required
              size="small"
              margin="normal"
              label="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              InputLabelProps={{ sx: inputLabelSx }}
              InputProps={{
                sx: inputFieldSx,
              }}
            />

            <TextField
              fullWidth
              required
              size="small"
              margin="normal"
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              InputLabelProps={{ sx: inputLabelSx }}
              InputProps={{
                sx: inputFieldSx,
              }}
            />

            <TextField
              fullWidth
              required
              size="small"
              margin="normal"
              label="Phone Number"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              InputLabelProps={{ sx: inputLabelSx }}
              InputProps={{
                sx: inputFieldSx,
              }}
            />

            <TextField
              fullWidth
              required
              size="small"
              margin="normal"
              label="Country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              InputLabelProps={{ sx: inputLabelSx }}
              InputProps={{
                sx: inputFieldSx,
              }}
            />

            <TextField
              fullWidth
              size="small"
              margin="normal"
              label="Referral Code (optional)"
              value={referralCode}
              onChange={(e) => setReferralCode(e.target.value)}
              InputLabelProps={{ sx: inputLabelSx }}
              InputProps={{ sx: inputFieldSx }}
            />

            <TextField
              fullWidth
              required
              size="small"
              margin="normal"
              label="Password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputLabelProps={{ sx: inputLabelSx }}
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
                sx: inputFieldSx,
              }}
            />

            <TextField
              fullWidth
              required
              size="small"
              margin="normal"
              label="Confirm Password"
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              InputLabelProps={{ sx: inputLabelSx }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
                      onClick={() => setShowConfirmPassword((prev) => !prev)}
                      edge="end"
                      sx={{ color: theme.palette.text.secondary }}
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
                sx: inputFieldSx,
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
