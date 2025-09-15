"use client";
import { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import PhoneIcon from "@mui/icons-material/Phone";
import SendIcon from "@mui/icons-material/Send";
import CloseIcon from "@mui/icons-material/Close";

const navLinks = [
  { label: "About", href: "/about" },
  { label: "Academy", href: "/academy" },
  { label: "Shop", href: "/shop" },
  { label: "Course Prices", href: "/course-prices" },
  { label: "Contact", href: "/contact" },
];

export default function TopNav() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box sx={{ width:"100%", p: 2, }}>
      {/* Close button at the top */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", width:"100%" }}>
        <IconButton onClick={handleDrawerToggle}>
          <CloseIcon />
        </IconButton>
      </Box>

      {/* Navigation links */}
      <List>
        {navLinks.map((item) => (
          <ListItemButton
            key={item.label}
            component="a"
            href={item.href}
            onClick={handleDrawerToggle} // close drawer on click
          >
            <ListItemText primary={item.label} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        background: "transparent",
        color: "black",
        px: { xs: 2, md: 6 },
      }}
    >
      <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
        {/* Logo */}
        <Box
          component="a"
          href="/"
          sx={{
            display: "flex",
            alignItems: "center",
            textDecoration: "none",
          }}
        >
          <Box
            component="img"
            src="/images/logo.png" // replace with your actual logo path
            alt="Logo"
            sx={{ height: 40 }}
          />
        </Box>

        {/* Desktop Links */}
        <Box sx={{ display: { xs: "none", md: "flex" }, gap: 4 }}>
          {navLinks.map((item) => (
            <Button
              key={item.label}
              href={item.href}
              sx={{
                color: "black",
                fontWeight: "bold",
                "&:hover": { color: "#1976d2" },
              }}
            >
              {item.label}
            </Button>
          ))}
        </Box>

        {/* Right Side Icons */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <IconButton
            color="primary"
            href="tel:+2347018090107"
            sx={{
              background: "#f0f4ff",
              "&:hover": { background: "#e0ebff" },
            }}
          >
            <PhoneIcon />
          </IconButton>

          <Button
            variant="contained"
            startIcon={<SendIcon />}
            href="#"
            sx={{
              background: "#2196f3",
              color: "white",
              fontWeight: "bold",
              borderRadius: 2,
              px: 3,
              "&:hover": { background: "#1976d2" },
              display: { xs: "none", md: "flex" },
            }}
          >
            Get Started
          </Button>

          {/* Mobile Menu Button */}
          <IconButton
            color="inherit"
            edge="end"
            onClick={handleDrawerToggle}
            sx={{ display: { md: "none" } }}
          >
            <MenuIcon />
          </IconButton>
        </Box>
      </Toolbar>

      {/* Drawer for Mobile */}
      <Drawer
        anchor="top"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
      >
        {drawer}
      </Drawer>
    </AppBar>
  );
}
