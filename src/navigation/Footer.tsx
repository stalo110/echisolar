import {
  Box,
  Container,
  Grid,
  Typography,
  TextField,
  Button,
  IconButton,
  Link,
} from "@mui/material";
import {
  Facebook,
  Twitter,
  LinkedIn,
  Instagram,
  Email,
  LocationOn,
} from "@mui/icons-material";
import { FaBehance, FaWhatsapp } from "react-icons/fa";
import { useTheme } from "../contexts/ThemeContext";

const Footer = () => {
  const { theme, mode } = useTheme();
  
  return (
    <Box
      sx={{
        background: mode === 'dark' 
          ? "radial-gradient(circle at top, #111 0%, #000 100%)"
          : "radial-gradient(circle at top, #f8f9fa 0%, #ffffff 100%)",
        color: theme.palette.text.primary,
        py: 8,
        mt: 10,
        borderTop: `1px solid ${theme.palette.divider}`,
        boxShadow: `0 -4px 30px ${theme.palette.primary.main}15`,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={5}>
          {/* Logo & About */}
          <Grid size={{xs:12, md:3}}>
            <Box
              component="img"
              src="/images/logo.png"
              alt="Echi Solar"
              sx={{ height: 20, mb: 2, filter: mode === 'dark' ? "brightness(0) invert(1)" : "none" }}
            />
            <Typography variant="body2" sx={{ color: theme.palette.text.secondary, fontFamily: "JUST Sans Regular" }}>
              Providing sustainable solar solutions today for a cleaner, brighter tomorrow.
            </Typography>

            <Box sx={{ mt: 2 }}>
              {[
                { icon: <Facebook />, href: "https://web.facebook.com/prutamagic" },
                { icon: <Twitter />, href: "#" },
                { icon: <LinkedIn />, href: "#" },
                { icon: <Instagram />, href: "https://www.instagram.com/prutamagic/" },
                { icon: <FaBehance />, href: "https://www.behance.net/prutaniglt0f54" },
              ].map((social, i) => (
                <IconButton
                  key={i}
                  href={social.href}
                  target="_blank"
                  sx={{
                    color: theme.palette.text.secondary,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      color: theme.palette.primary.main,
                      transform: "translateY(-2px)",
                    },
                  }}
                >
                  {social.icon}
                </IconButton>
              ))}
            </Box>
          </Grid>

          {/* Contact Info */}
          <Grid size={{xs:12, md:3}}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                color: theme.palette.primary.main,
                textTransform: "uppercase",
                mb: 2,
                fontFamily: "JUST Sans ExBold",
              }}
            >
              Contact Info
            </Typography>

            <Typography 
              variant="body2" 
              component="a"
              href="https://wa.me/2347018090107"
              target="_blank"
              sx={{ 
                display: "flex", 
                alignItems: "center", 
                mb: 1, 
                fontFamily: "JUST Sans Regular", 
                color: theme.palette.text.secondary,
                textDecoration: "none",
                "&:hover": { color: theme.palette.primary.main }
              }}
            >
              <FaWhatsapp style={{ marginRight: 8, color: theme.palette.secondary.main }} /> +234 701 809 0107
            </Typography>
            <Typography variant="body2" sx={{ display: "flex", alignItems: "center", mb: 1, fontFamily: "JUST Sans Regular", color: theme.palette.text.secondary }}>
              <Email sx={{ mr: 1, color: theme.palette.secondary.main }} /> info@echisolar.com
            </Typography>
            <Typography variant="body2" sx={{ display: "flex", alignItems: "center", fontFamily: "JUST Sans Regular", color: theme.palette.text.secondary }}>
              <LocationOn sx={{ mr: 1, color: theme.palette.secondary.main }} /> Office 201, Book Foundation, Agu Awka
            </Typography>
          </Grid>

          {/* Useful Links */}
          <Grid size={{xs:12, md:3}}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                color: theme.palette.primary.main,
                textTransform: "uppercase",
                mb: 2,
                fontFamily: "JUST Sans ExBold",
              }}
            >
              Useful Links
            </Typography>

            {[
              { label: "Academy Prices", href: "/course-prices" },
              { label: "FAQs", href: "/faqs" },
              { label: "Contact Us", href: "/contact" },
            ].map((link, i) => (
              <Link
                key={i}
                href={link.href}
                underline="none"
                color={theme.palette.text.secondary}
                display="block"
                sx={{
                  mb: 1,
                  transition: "color 0.3s ease",
                  "&:hover": { color: theme.palette.primary.main },
                  fontFamily: "JUST Sans Regular",
                }}
              >
                {link.label}
              </Link>
            ))}
          </Grid>

          {/* Newsletter */}
          <Grid size={{ xs: 12, md: 3 }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                color: theme.palette.primary.main,
                textTransform: "uppercase",
                mb: 2,
                fontFamily: "JUST Sans ExBold",
              }}
            >
              Newsletter
            </Typography>
            <Typography variant="body2" sx={{ color: theme.palette.text.secondary, mb: 2, fontFamily: "JUST Sans Regular" }}>
              Stay up to date with our latest offers and insights.
            </Typography>

            <Box sx={{ display: "flex", alignItems: "center" }}>
              <TextField
                placeholder="Email Address"
                size="small"
                variant="outlined"
                fullWidth
                sx={{
                  bgcolor: mode === 'dark' ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)",
                  borderRadius: "6px 0 0 6px",
                  input: {
                    color: theme.palette.text.primary,
                    "&::placeholder": { color: theme.palette.text.secondary },
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: theme.palette.divider,
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: theme.palette.primary.main,
                  },
                }}
              />
              <Button
                variant="contained"
                sx={{
                  bgcolor: theme.palette.secondary.main,
                  borderRadius: "0 6px 6px 0",
                  minWidth: 50,
                  "&:hover": {
                    bgcolor: theme.palette.primary.main,
                    color: mode === 'dark' ? "#000" : "#fff",
                  },
                }}
              >
                <Email />
              </Button>
            </Box>
          </Grid>
        </Grid>

        {/* Copyright */}
        <Box
          sx={{
            textAlign: "center",
            mt: 6,
            pt: 3,
            borderTop: `1px solid ${theme.palette.divider}`,
          }}
        >
          <Typography variant="body2" sx={{ color: theme.palette.text.secondary, fontFamily: "JUST Sans Regular" }}>
            © {new Date().getFullYear()} <strong>Echi Solar</strong>. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;