import { Box, Container, TextField, Button, Typography } from "@mui/material";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const submit = () => {
    // fake auth — in a real app you'd call API and get JWT
    login({ id: 'u_' + Date.now(), name: name || 'Customer', email, role: 'customer' });
    navigate('/');
  }

  return (
    <Box>
      <Container sx={{ py:6 }}>
        <Typography variant="h4" sx={{ mb:2 }}>Login</Typography>
        <TextField fullWidth placeholder="Email" value={email} onChange={(e)=> setEmail(e.target.value)} sx={{ mb:2 }} />
        <TextField fullWidth placeholder="Name (optional)" value={name} onChange={(e)=> setName(e.target.value)} sx={{ mb:2 }} />
        <Button variant="contained" onClick={submit}>Login</Button>
      </Container>
    </Box>
  )
}

export default Login;
