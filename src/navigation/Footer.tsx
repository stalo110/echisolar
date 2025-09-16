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
  Phone,
  LocationOn,
} from "@mui/icons-material";
import { FaBehance } from "react-icons/fa";

const Footer = () => {
  return (
    <Box sx={{ bgcolor: "black", color: "white", py: 6, mt: 6 }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Left Logo & Description */}
         <Grid 
        size={{xs:12, md:3}}
          >
          <Box
            component="img"
            src="/images/logo2.png" // replace with your actual logo path
            alt="Logo"
            sx={{ height: 30 }}
          />
              <Typography variant="body2" sx={{ mt: 2, color: "gray" }}>
            Providing sustainable solar solutions today for a cleaner, brighter tomorrow.
          </Typography>

            <Box sx={{ mt: 2 }}>
              <IconButton color="inherit" href="https://web.facebook.com/prutamagic">
                <Facebook />
              </IconButton>
              <IconButton color="inherit">
                <Twitter />
              </IconButton>
              <IconButton color="inherit">
                <LinkedIn />
              </IconButton>
              <IconButton color="inherit" href="https://www.instagram.com/prutamagic/">
                <Instagram />
              </IconButton>
              <IconButton color="inherit" href="https://www.behance.net/prutaniglt0f54">
                <FaBehance />
              </IconButton>
            </Box>
          </Grid>

          {/* Contact Info */}
          <Grid  size={{xs:12, md:3}}>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              Contact Info
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Typography variant="body2">
                <Phone fontSize="small" sx={{ mr: 1 }} />
                +234 701 809 0107
              </Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                <Email fontSize="small" sx={{ mr: 1 }} />
                info@prutamagic.com
              </Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                <LocationOn fontSize="small" sx={{ mr: 1 }} />
                Office 201, Along Book Foundation, Agu Awka, Awka, Anambra State
              </Typography>
            </Box>
          </Grid>

          {/* Useful Info */}
          <Grid  size={{xs:12, md:3}}>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              Useful Info
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Link href="/course-prices" underline="none" color="gray" display="block">
                Academy Prices
              </Link>
              <Link href="/course-prices" underline="none" color="gray" display="block" sx={{ mt: 1 }}>
                FAQs
              </Link>
            </Box>
          </Grid>

          {/* Newsletter */}
          <Grid  size={{xs:12, md:3}}>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              Subscribe to Our Newsletter
            </Typography>
            <Typography variant="body2" sx={{ mt: 2, color: "gray" }}>
              Sign up for my newsletter to get latest updates. Do not worry, we will never spam you.
            </Typography>
            <Box sx={{ display: "flex", mt: 2 }}>
              <TextField
                placeholder="Email Address"
                size="small"
                variant="outlined"
                fullWidth
                sx={{
                  bgcolor: "white",
                  borderRadius: "4px 0 0 4px",
                  input: { color: "black" },
                }}
              />
              <Button
                variant="contained"
                color="success"
                sx={{ borderRadius: "0 4px 4px 0" }}
              >
                <Email />
              </Button>
            </Box>
          </Grid>
        </Grid>

        {/* Bottom Copyright */}
        <Box sx={{ textAlign: "center", mt: 6, pt: 2, borderTop: "1px solid gray" }}>
          <Typography variant="body2" color="gray">
            © 2025 PRUTA. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
