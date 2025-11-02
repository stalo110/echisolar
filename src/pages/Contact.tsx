import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Link,
  TextField,
  Button,
  // useTheme
} from "@mui/material";
import TopNav from "../navigation/TopNav";
import Footer from "../navigation/Footer";
import { HeroSection } from "../components/Contact/HeroSection";
import { useState } from "react";

const Contact = () => {
  // const theme = useTheme();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ name, email, subject, message });
    alert('Message sent! We will get back to you soon.');
    setName('');
    setEmail('');
    setSubject('');
    setMessage('');
  };

  return (
    <Box sx={{ bgcolor: '#0c0f14', color: '#e0e0e0', minHeight: '100vh' }}>
      <TopNav />
      <HeroSection />
      <Container sx={{ py: 8 }}>
        <Typography 
          variant="h3" 
          sx={{ 
            fontWeight: 'bold', 
            mb: 6, 
            textAlign: 'center',
            background: "linear-gradient(90deg, #FFAB46, #FFD18A)",
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}
        >
          Get In Touch
        </Typography>

        <Grid container spacing={4}>
          <Grid size={{xs: 12, md: 6}}>
            <Paper
              sx={{
                p: 4,
                bgcolor: 'rgba(255,255,255,0.04)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 3,
              }}
            >
              <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2, color: '#fff' }}>
                Contact Information
              </Typography>
              <Typography sx={{ mb: 1, color: '#fff' }}>📍 123 Solar Street, Lagos, Nigeria</Typography>
              <Typography sx={{ mb: 1, color: '#fff' }}>📞 +234 801 234 5678</Typography>
              <Typography sx={{ mb: 1, color: '#fff' }}>
                ✉️ <Link href="mailto:info@echisolar.com" underline="hover" color="#90caf9">
                  info@echisolar.com
                </Link>
              </Typography>
              <Typography sx={{ mt: 2, color: '#fff' }}>🕒 Mon - Fri: 9:00 AM - 5:00 PM</Typography>
            </Paper>
          </Grid>

          <Grid size={{xs: 12, md: 6}}>
            <Paper
              sx={{
                p: 4,
                bgcolor: 'rgba(255,255,255,0.05)',
                backdropFilter: 'blur(10px)',
                borderRadius: 3,
                border: '1px solid rgba(255,255,255,0.1)',
              }}
            >
              <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2, color: '#fff' }}>
                Send Us a Message
              </Typography>

              <Box component="form" onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  label="Name"
                  variant="filled"
                  margin="normal"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  InputProps={{ style: { color: '#fff' } }}
                  InputLabelProps={{ style: { color: '#aaa' } }}
                />
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  variant="filled"
                  margin="normal"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  InputProps={{ style: { color: '#fff' } }}
                  InputLabelProps={{ style: { color: '#aaa' } }}
                />
                <TextField
                  fullWidth
                  label="Subject"
                  variant="filled"
                  margin="normal"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  InputProps={{ style: { color: '#fff' } }}
                  InputLabelProps={{ style: { color: '#aaa' } }}
                />
                <TextField
                  fullWidth
                  label="Message"
                  variant="filled"
                  margin="normal"
                  multiline
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  InputProps={{ style: { color: '#fff' } }}
                  InputLabelProps={{ style: { color: '#aaa' } }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  sx={{
                    mt: 3,
                    py: 1.4,
                    fontWeight: 'bold',
                    background: 'linear-gradient(90deg, #e48a1cff, #FFAB46)',
                    '&:hover': {
                      background: 'linear-gradient(90deg, #e48a1cff, #FFAB46)',
                    },
                    borderRadius: '10px',
                  }}
                >
                  Send Message
                </Button>
              </Box>
            </Paper>
          </Grid>
        </Grid>

        <Box sx={{ mt: 8 }}>
          <Paper
            sx={{
              p: 4,
              bgcolor: 'rgba(255,255,255,0.03)',
              borderRadius: 3,
              border: '1px solid rgba(255,255,255,0.1)',
              textAlign: 'center',
            }}
          >
            <Typography variant="h5" sx={{ mb: 2, color: '#fff' }}>
              Our Location
            </Typography>
            <Box
              sx={{
                width: '100%',
                height: '400px',
                borderRadius: 2,
                overflow: 'hidden',
                bgcolor: '#1a1d23',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#90caf9',
                border: '1px solid rgba(255,255,255,0.08)'
              }}
            >
              Google Map Placeholder
            </Box>
          </Paper>
        </Box>
      </Container>
      <Footer />
    </Box>
  );
};

export default Contact;

