// import {
//   Box,
//   Container,
//   Grid,
//   Typography,
//   TextField,
//   Button,
//   IconButton,
//   Link,
// } from "@mui/material";
// import {
//   Facebook,
//   Twitter,
//   LinkedIn,
//   Instagram,
//   Email,
//   Phone,
//   LocationOn,
// } from "@mui/icons-material";
// import { FaBehance } from "react-icons/fa";

// const Footer = () => {
//   return (
//     <Box sx={{ bgcolor: "black", color: "white", py: 6, mt: 6 }}>
//       <Container maxWidth="lg">
//         <Grid container spacing={4}>
//           {/* Left Logo & Description */}
//          <Grid 
//         size={{xs:12, md:3}}
//           >
//           <Box
//             component="img"
//             src="/images/logo2.png" // replace with your actual logo path
//             alt="Logo"
//             sx={{ height: 30 }}
//           />
//               <Typography variant="body2" sx={{ mt: 2, color: "gray" }}>
//             Providing sustainable solar solutions today for a cleaner, brighter tomorrow.
//           </Typography>

//             <Box sx={{ mt: 2 }}>
//               <IconButton color="inherit" href="https://web.facebook.com/prutamagic">
//                 <Facebook />
//               </IconButton>
//               <IconButton color="inherit">
//                 <Twitter />
//               </IconButton>
//               <IconButton color="inherit">
//                 <LinkedIn />
//               </IconButton>
//               <IconButton color="inherit" href="https://www.instagram.com/prutamagic/">
//                 <Instagram />
//               </IconButton>
//               <IconButton color="inherit" href="https://www.behance.net/prutaniglt0f54">
//                 <FaBehance />
//               </IconButton>
//             </Box>
//           </Grid>

//           {/* Contact Info */}
//           <Grid  size={{xs:12, md:3}}>
//             <Typography variant="h6" sx={{ fontWeight: "bold" }}>
//               Contact Info
//             </Typography>
//             <Box sx={{ mt: 2 }}>
//               <Typography variant="body2">
//                 <Phone fontSize="small" sx={{ mr: 1 }} />
//                 +234 701 809 0107
//               </Typography>
//               <Typography variant="body2" sx={{ mt: 1 }}>
//                 <Email fontSize="small" sx={{ mr: 1 }} />
//                 info@prutamagic.com
//               </Typography>
//               <Typography variant="body2" sx={{ mt: 1 }}>
//                 <LocationOn fontSize="small" sx={{ mr: 1 }} />
//                 Office 201, Along Book Foundation, Agu Awka, Awka, Anambra State
//               </Typography>
//             </Box>
//           </Grid>

//           {/* Useful Info */}
//           <Grid  size={{xs:12, md:3}}>
//             <Typography variant="h6" sx={{ fontWeight: "bold" }}>
//               Useful Info
//             </Typography>
//             <Box sx={{ mt: 2 }}>
//               <Link href="/course-prices" underline="none" color="gray" display="block">
//                 Academy Prices
//               </Link>
//               <Link href="/course-prices" underline="none" color="gray" display="block" sx={{ mt: 1 }}>
//                 FAQs
//               </Link>
//             </Box>
//           </Grid>

//           {/* Newsletter */}
//           <Grid  size={{xs:12, md:3}}>
//             <Typography variant="h6" sx={{ fontWeight: "bold" }}>
//               Subscribe to Our Newsletter
//             </Typography>
//             <Typography variant="body2" sx={{ mt: 2, color: "gray" }}>
//               Sign up for my newsletter to get latest updates. Do not worry, we will never spam you.
//             </Typography>
//             <Box sx={{ display: "flex", mt: 2 }}>
//               <TextField
//                 placeholder="Email Address"
//                 size="small"
//                 variant="outlined"
//                 fullWidth
//                 sx={{
//                   bgcolor: "white",
//                   borderRadius: "4px 0 0 4px",
//                   input: { color: "black" },
//                 }}
//               />
//               <Button
//                 variant="contained"
//                 color="success"
//                 sx={{ borderRadius: "0 4px 4px 0" }}
//               >
//                 <Email />
//               </Button>
//             </Box>
//           </Grid>
//         </Grid>

//         {/* Bottom Copyright */}
//         <Box sx={{ textAlign: "center", mt: 6, pt: 2, borderTop: "1px solid gray" }}>
//           <Typography variant="body2" color="gray">
//             © 2025 PRUTA. All rights reserved.
//           </Typography>
//         </Box>
//       </Container>
//     </Box>
//   );
// };

// export default Footer;


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
    <Box
      sx={{
        background: "radial-gradient(circle at top, #111 0%, #000 100%)",
        color: "rgba(255,255,255,0.9)",
        py: 8,
        mt: 10,
        borderTop: "1px solid rgba(255,255,255,0.08)",
        boxShadow: "0 -4px 30px rgba(255,171,70,0.05)",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={5}>
          {/* Logo & About */}
          <Grid size={{xs:12, md:3}}>
            <Box
              component="img"
              src="/images/logo2.png"
              alt="Logo"
              sx={{ height: 35, mb: 2, filter: "drop-shadow(0 0 8px rgba(255,171,70,0.3))" }}
            />
            <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.6)" }}>
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
                    color: "rgba(255,255,255,0.8)",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      color: "#FFAB46",
                      transform: "translateY(-2px)",
                      textShadow: "0 0 10px rgba(255,171,70,0.5)",
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
                color: "#FFAB46",
                textTransform: "uppercase",
                mb: 2,
              }}
            >
              Contact Info
            </Typography>

            <Typography variant="body2" sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <Phone sx={{ mr: 1, color: "#2E7D4D" }} /> +234 701 809 0107
            </Typography>
            <Typography variant="body2" sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <Email sx={{ mr: 1, color: "#2E7D4D" }} /> info@prutamagic.com
            </Typography>
            <Typography variant="body2" sx={{ display: "flex", alignItems: "center" }}>
              <LocationOn sx={{ mr: 1, color: "#2E7D4D" }} /> Office 201, Book Foundation, Agu Awka
            </Typography>
          </Grid>

          {/* Useful Links */}
          <Grid size={{xs:12, md:3}}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                color: "#FFAB46",
                textTransform: "uppercase",
                mb: 2,
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
                color="rgba(255,255,255,0.7)"
                display="block"
                sx={{
                  mb: 1,
                  transition: "color 0.3s ease",
                  "&:hover": { color: "#FFAB46" },
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
                color: "#FFAB46",
                textTransform: "uppercase",
                mb: 2,
              }}
            >
              Newsletter
            </Typography>
            <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.6)", mb: 2 }}>
              Stay up to date with our latest offers and insights.
            </Typography>

            <Box sx={{ display: "flex", alignItems: "center" }}>
              <TextField
                placeholder="Email Address"
                size="small"
                variant="outlined"
                fullWidth
                sx={{
                  bgcolor: "rgba(255,255,255,0.1)",
                  borderRadius: "6px 0 0 6px",
                  input: {
                    color: "#fff",
                    "&::placeholder": { color: "rgba(255,255,255,0.6)" },
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgba(255,255,255,0.2)",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#FFAB46",
                  },
                }}
              />
              <Button
                variant="contained"
                sx={{
                  bgcolor: "#2E7D4D",
                  borderRadius: "0 6px 6px 0",
                  minWidth: 50,
                  "&:hover": {
                    bgcolor: "#FFAB46",
                    color: "#000",
                    boxShadow: "0 0 12px rgba(255,171,70,0.6)",
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
            borderTop: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.5)" }}>
            © {new Date().getFullYear()} <strong>PRUTA</strong>. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;

