import { Box, Container, TextField, Button, Typography } from "@mui/material";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const submit = () => {
    login({ id: 'u_' + Date.now(), name: name || 'Customer', email, role: 'customer' });
    navigate('/');
  }

  return (
    <Box>
      <Container sx={{ py:6 }}>
        <Typography variant="h4" sx={{ mb:2 }}>Register</Typography>
        <TextField fullWidth placeholder="Email" value={email} onChange={(e)=> setEmail(e.target.value)} sx={{ mb:2 }} />
        <TextField fullWidth placeholder="Name" value={name} onChange={(e)=> setName(e.target.value)} sx={{ mb:2 }} />
        <Button variant="contained" onClick={submit}>Create account</Button>
      </Container>
    </Box>
  )
}

export default Register;
