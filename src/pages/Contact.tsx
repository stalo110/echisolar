import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Link,
  TextField,
  Button,
} from "@mui/material";
import TopNav from "../navigation/TopNav";
import Footer from "../navigation/Footer";
import { HeroSection } from "../components/Contact/HeroSection";
import { useState } from "react";
import { useTheme } from "../contexts/ThemeContext";
import { FaWhatsapp } from "react-icons/fa";
import {
  COMPANY_ADDRESS,
  COMPANY_EMAIL,
  COMPANY_PHONE,
  COMPANY_WHATSAPP_URL,
} from "../config/company";
import { submitContactMessage } from "../services/contactService";
import { toast } from "material-react-toastify";

const Contact = () => {
  const { theme, mode } = useTheme();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !subject.trim() || !message.trim()) {
      toast.error("Please fill in all fields.");
      return;
    }

    setSubmitting(true);
    try {
      await submitContactMessage({
        name: name.trim(),
        email: email.trim(),
        subject: subject.trim(),
        message: message.trim(),
      });
      toast.success("Message sent. We will get back to you shortly.");
    } catch (err: any) {
      toast.error(err?.response?.data?.error || "Unable to send message. Please try again.");
      return;
    } finally {
      setSubmitting(false);
    }

    setName('');
    setEmail('');
    setSubject('');
    setMessage('');
  };

  return (
    <Box sx={{ 
      bgcolor: theme.palette.background.default, 
      color: theme.palette.text.primary, 
      minHeight: '100vh',
      position: "relative",
      overflow: "hidden"
    }}>
      {/* Elegant Background Pattern */}
      <Box sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -1,
        opacity: mode === 'dark' ? 0.02 : 0.012,
        backgroundImage: `
          repeating-radial-gradient(
            circle at 20% 20%,
            ${theme.palette.primary.main}10 0px,
            transparent 50px,
            ${theme.palette.secondary.main}08 100px
          )
        `,
        animation: "gentleMove 20s ease-in-out infinite",
        "@keyframes gentleMove": {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "50%": { transform: "translate(-20px, -10px) scale(1.05)" }
        }
      }} />
      <Box sx={{ position: "relative", zIndex: 1 }}>
        <TopNav />
      <HeroSection />
      <Container sx={{ py: 8 }}>
        <Typography 
          variant="h3" 
          sx={{ 
            fontWeight: 'bold', 
            mb: 6, 
            textAlign: 'center',
            background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontFamily: "JUST Sans ExBold"
          }}
        >
          Get In Touch
        </Typography>

        <Grid container spacing={4}>
          <Grid size={{xs: 12, md: 6}}>
            <Paper
              sx={{
                p: 4,
                bgcolor: theme.palette.background.paper,
                backdropFilter: 'blur(10px)',
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: 3,
              }}
            >
              <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2, color: theme.palette.text.primary, fontFamily: "JUST Sans ExBold" }}>
                Contact Information
              </Typography>
              <Typography sx={{ mb: 1, color: theme.palette.text.primary, fontFamily: "JUST Sans Regular" }}>
                📍 {COMPANY_ADDRESS}
              </Typography>
              <Typography 
                component="a"
                href={COMPANY_WHATSAPP_URL}
                target="_blank"
                sx={{ 
                  mb: 1, 
                  color: theme.palette.text.primary, 
                  fontFamily: "JUST Sans Regular",
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  "&:hover": { color: theme.palette.primary.main }
                }}
              >
                <FaWhatsapp style={{ color: theme.palette.secondary.main }} /> {COMPANY_PHONE}
              </Typography>
              <Typography sx={{ mb: 1, color: theme.palette.text.primary, fontFamily: "JUST Sans Regular" }}>
                ✉️ <Link href={`mailto:${COMPANY_EMAIL}`} underline="hover" color={theme.palette.primary.main}>
                  {COMPANY_EMAIL}
                </Link>
              </Typography>
              <Typography sx={{ mt: 2, color: theme.palette.text.primary, fontFamily: "JUST Sans Regular" }}>
                🕒 Mon - Sat: 9:00 AM - 6:00 PM
              </Typography>
            </Paper>
          </Grid>

          <Grid size={{xs: 12, md: 6}}>
            <Paper
              sx={{
                p: 4,
                bgcolor: theme.palette.background.paper,
                backdropFilter: 'blur(10px)',
                borderRadius: 3,
                border: `1px solid ${theme.palette.divider}`,
              }}
            >
              <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2, color: theme.palette.text.primary, fontFamily: "JUST Sans ExBold" }}>
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
                  InputProps={{ style: { color: theme.palette.text.primary } }}
                  InputLabelProps={{ style: { color: theme.palette.text.secondary } }}
                />
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  variant="filled"
                  margin="normal"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  InputProps={{ style: { color: theme.palette.text.primary } }}
                  InputLabelProps={{ style: { color: theme.palette.text.secondary } }}
                />
                <TextField
                  fullWidth
                  label="Subject"
                  variant="filled"
                  margin="normal"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  InputProps={{ style: { color: theme.palette.text.primary } }}
                  InputLabelProps={{ style: { color: theme.palette.text.secondary } }}
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
                  InputProps={{ style: { color: theme.palette.text.primary } }}
                  InputLabelProps={{ style: { color: theme.palette.text.secondary } }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  disabled={submitting}
                  sx={{
                    mt: 3,
                    py: 1.4,
                    fontWeight: 'bold',
                    fontFamily: "JUST Sans ExBold",
                    bgcolor: theme.palette.primary.main,
                    '&:hover': {
                      bgcolor: "#F19A30",
                    },
                    borderRadius: '10px',
                  }}
                >
                  {submitting ? "Sending..." : "Send Message"}
                </Button>
              </Box>
            </Paper>
          </Grid>
        </Grid>

        <Box sx={{ mt: 8 }}>
          <Paper
            sx={{
              p: 4,
              bgcolor: theme.palette.background.paper,
              borderRadius: 3,
              border: `1px solid ${theme.palette.divider}`,
              textAlign: 'center',
            }}
          >
            <Typography variant="h5" sx={{ mb: 2, color: theme.palette.text.primary, fontFamily: "JUST Sans ExBold" }}>
              Our Location
            </Typography>
            <Box
              sx={{
                width: '100%',
                height: { xs: '280px', md: '400px' },
                borderRadius: 2,
                overflow: 'hidden',
                bgcolor: theme.palette.background.default,
                border: `1px solid ${theme.palette.divider}`
              }}
            >
              <Box
                component="iframe"
                title="EchiSolar Office Location"
                src="https://www.google.com/maps?q=6.4685,3.2737&z=16&output=embed"
                sx={{ border: 0, width: "100%", height: "100%" }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </Box>
            <Typography sx={{ mt: 2, color: theme.palette.text.secondary, fontFamily: "JUST Sans Regular" }}>
              {COMPANY_ADDRESS}
            </Typography>
          </Paper>
        </Box>
      </Container>
        <Footer />
      </Box>
    </Box>
  );
};

export default Contact;
