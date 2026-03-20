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
import { alpha } from "@mui/material/styles";
import {
  Facebook,
  Instagram,
  Email,
  LocationOn,
} from "@mui/icons-material";
import { FaWhatsapp } from "react-icons/fa";
import { SiTiktok } from "react-icons/si";
import { useTheme } from "../contexts/ThemeContext";
import {
  COMPANY_ADDRESS,
  COMPANY_EMAIL,
  COMPANY_PHONE,
  COMPANY_WHATSAPP_URL,
} from "../config/company";

const Footer = () => {
  const { theme, mode } = useTheme();
  
  return (
    <Box
      sx={{
        background: mode === "dark"
          ? "linear-gradient(180deg, rgba(7,17,27,0.86) 0%, rgba(10,23,34,0.96) 100%)"
          : "linear-gradient(180deg, rgba(255,255,255,0.75) 0%, rgba(245,248,247,0.92) 100%)",
        color: theme.palette.text.primary,
        py: 8,
        mt: 10,
        borderTop: `1px solid ${theme.palette.divider}`,
        boxShadow: mode === "dark" ? "0 -18px 50px rgba(3,10,18,0.22)" : "0 -14px 40px rgba(15,23,42,0.06)",
        backdropFilter: "blur(18px)",
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            p: { xs: 3, md: 4 },
            borderRadius: 5,
            border: `1px solid ${theme.palette.divider}`,
            background: mode === "dark" ? alpha("#10202A", 0.68) : alpha("#FFFFFF", 0.78),
            boxShadow: mode === "dark" ? "0 24px 58px rgba(3,10,18,0.24)" : "0 20px 50px rgba(15,23,42,0.08)",
          }}
        >
          <Grid container spacing={5}>
          <Grid size={{xs:12, md:3}}>
            <Box
              component="img"
              src="/images/logo.png"
              alt="Echi Solar"
              sx={{ height: 24, mb: 2, filter: mode === 'dark' ? "brightness(0) invert(1)" : "none" }}
            />
            <Typography variant="body2" sx={{ color: theme.palette.text.secondary, fontFamily: "JUST Sans Regular", lineHeight: 1.8 }}>
              Providing sustainable solar solutions today for a cleaner, brighter tomorrow.
            </Typography>

            <Box sx={{ mt: 2, display: "flex", gap: 0.75, flexWrap: "wrap" }}>
              {[
                { icon: <Facebook />, href: "https://www.facebook.com/share/1BYVoXTdv5/?mibextid=wwXIfr" },
                { icon: <SiTiktok />, href: "https://www.tiktok.com/@echisolar?_r=1&_t=ZS-94k5MW7ATtl" },
                { icon: <Instagram />, href: "https://www.instagram.com/echi_solar?igsh=MXBzdHV0cGI2NThqNg==" },
                
              ].map((social, i) => (
                <IconButton
                  key={i}
                  href={social.href}
                  target="_blank"
                  sx={{
                    color: theme.palette.text.secondary,
                    width: 40,
                    height: 40,
                    border: `1px solid ${theme.palette.divider}`,
                    background: mode === "dark" ? alpha("#08131D", 0.52) : alpha("#FFFFFF", 0.62),
                    transition: "all 0.3s ease",
                    "&:hover": {
                      color: theme.palette.primary.main,
                      transform: "translateY(-2px)",
                      borderColor: alpha(theme.palette.primary.main, 0.24),
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
                fontWeight: 700,
                color: theme.palette.primary.main,
                textTransform: "uppercase",
                mb: 2,
                fontFamily: "JUST Sans ExBold",
                fontSize: "0.95rem",
                letterSpacing: "0.08em",
              }}
            >
              Contact Info
            </Typography>

            <Typography 
              variant="body2" 
              component="a"
              href={COMPANY_WHATSAPP_URL}
              target="_blank"
              sx={{ 
                display: "flex", 
                alignItems: "center", 
                mb: 1.3, 
                fontFamily: "JUST Sans Regular", 
                color: theme.palette.text.secondary,
                textDecoration: "none",
                lineHeight: 1.7,
                "&:hover": { color: theme.palette.primary.main }
              }}
            >
              <FaWhatsapp style={{ marginRight: 8, color: theme.palette.secondary.main }} /> {COMPANY_PHONE}
            </Typography>
            <Typography variant="body2" sx={{ display: "flex", alignItems: "center", mb: 1.3, fontFamily: "JUST Sans Regular", color: theme.palette.text.secondary, lineHeight: 1.7 }}>
              <Email sx={{ mr: 1, color: theme.palette.secondary.main }} /> {COMPANY_EMAIL}
            </Typography>
            <Typography variant="body2" sx={{ display: "flex", alignItems: "center", fontFamily: "JUST Sans Regular", color: theme.palette.text.secondary, lineHeight: 1.7 }}>
              <LocationOn sx={{ mr: 1, color: theme.palette.secondary.main }} /> {COMPANY_ADDRESS}
            </Typography>
          </Grid>

          <Grid size={{xs:12, md:3}}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                color: theme.palette.primary.main,
                textTransform: "uppercase",
                mb: 2,
                fontFamily: "JUST Sans ExBold",
                fontSize: "0.95rem",
                letterSpacing: "0.08em",
              }}
            >
              Useful Links
            </Typography>

            {[
              { label: "Home", href: "/" },
              { label: "Products", href: "/products" },
              { label: "About Us", href: "/about" },
              { label: "Contact Us", href: "/contact" },
              { label: "FAQ / Delivery Info", href: "/delivery-info" },
            ].map((link, i) => (
              <Link
                key={i}
                href={link.href}
                underline="none"
                color={theme.palette.text.secondary}
                display="block"
                sx={{
                  mb: 1.15,
                  transition: "color 0.3s ease",
                  "&:hover": { color: theme.palette.primary.main },
                  fontFamily: "JUST Sans Regular",
                  lineHeight: 1.7,
                }}
              >
                {link.label}
              </Link>
            ))}
          </Grid>

          <Grid size={{ xs: 12, md: 3 }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                color: theme.palette.primary.main,
                textTransform: "uppercase",
                mb: 2,
                fontFamily: "JUST Sans ExBold",
                fontSize: "0.95rem",
                letterSpacing: "0.08em",
              }}
            >
              Newsletter
            </Typography>
            <Typography variant="body2" sx={{ color: theme.palette.text.secondary, mb: 2, fontFamily: "JUST Sans Regular", lineHeight: 1.8 }}>
              Stay up to date with our latest offers and insights.
            </Typography>

            <Box sx={{ display: "flex", alignItems: "center" }}>
              <TextField
                placeholder="Email Address"
                size="small"
                variant="outlined"
                fullWidth
                sx={{
                  bgcolor: mode === 'dark' ? alpha("#08131D", 0.6) : alpha("#FFFFFF", 0.7),
                  borderRadius: "999px 0 0 999px",
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
                  borderRadius: "0 999px 999px 0",
                  minWidth: 72,
                  "&:hover": {
                    bgcolor: theme.palette.primary.main,
                    color: mode === 'dark' ? "#000" : "#fff",
                  },
                }}
              >
                Join
              </Button>
            </Box>
          </Grid>
          </Grid>

        </Box>
        <Box
          sx={{
            textAlign: "center",
            mt: 4,
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
