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
  Badge,
  ListItemIcon,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import PhoneIcon from "@mui/icons-material/Phone";
import CloseIcon from "@mui/icons-material/Close";
import AccountCircle from "@mui/icons-material/AccountCircle";
import ShoppingCart from "@mui/icons-material/ShoppingCart";
import LogoutIcon from "@mui/icons-material/Logout";
// import LoginIcon from '@mui/icons-material/Login';
import { useAuth } from "../contexts/AuthContext";
import { useCart } from "../contexts/CartContext";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function TopNav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, logout } = useAuth();
  const { items } = useCart();

  const handleDrawerToggle = () => setMobileOpen((s) => !s);
  const drawer = (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        background: "rgba(0,0,0,0.95)",
        backdropFilter: "blur(8px)",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        p: 3,
        borderBottom: "1px solid rgba(255,255,255,0.1)",
      }}
    >
      {/* Top Section: Logo + Close */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box
          component="a"
          href="/"
          sx={{
            display: "flex",
            alignItems: "center",
            textDecoration: "none",
            gap: 1,
          }}
        >
          <Box
            component="img"
            src="/images/logo.png"
            alt="Echi Solar"
            sx={{ height: 36, filter: "brightness(0) invert(1)" }}
          />
        </Box>

        <IconButton
          onClick={handleDrawerToggle}
          aria-label="close drawer"
          sx={{ color: "#fff" }}
        >
          <CloseIcon />
        </IconButton>
      </Box>

      {/* Navigation Links */}
      <List
        sx={{
          mt: 4,
          "& .MuiListItemButton-root": {
            borderRadius: "8px",
            mb: 1,
            py: 1.5,
            px: 2,
            transition: "all 0.3s ease",
            "&:hover": {
              backgroundColor: "rgba(255,255,255,0.08)",
            },
          },
        }}
      >
        {navLinks.map((link) => (
          <ListItemButton
            key={link.label}
            component="a"
            href={link.href}
            onClick={handleDrawerToggle}
          >
            <ListItemText
              primary={link.label}
              primaryTypographyProps={{
                fontSize: "1.1rem",
                fontWeight: 600,
                color: "#fff",
                sx: {
                  transition: "color 0.3s ease",
                  "&:hover": { color: "var(--brand-amber)" },
                },
              }}
            />
          </ListItemButton>
        ))}

        {/* Auth Links */}
        {!user ? (
          <>
            <ListItemButton
              component="a"
              href="/login"
              onClick={handleDrawerToggle}
              sx={{
                border: "1px solid var(--brand-amber)",
                color: "var(--brand-amber)",
                borderRadius: 2,
                mt: 2,
                "&:hover": {
                  background:
                    "linear-gradient(90deg, var(--brand-amber), #ffbe6b)",
                  color: "#000",
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 32, color: "inherit" }}>
                <AccountCircle />
              </ListItemIcon>
              <ListItemText primary="Login" />
            </ListItemButton>

            <ListItemButton
              component="a"
              href="/register"
              onClick={handleDrawerToggle}
              sx={{
                color: "#fff",
                fontWeight: 600,
                "&:hover": { color: "var(--brand-amber)" },
              }}
            >
              <ListItemText primary="Sign Up" />
            </ListItemButton>
          </>
        ) : (
          <>
            <ListItemButton
              component="a"
              href="/user/profile"
              onClick={handleDrawerToggle}
              sx={{
                color: "var(--brand-green)",
                fontWeight: "bold",
              }}
            >
              <ListItemIcon sx={{ minWidth: 32, color: "var(--brand-green)" }}>
                <AccountCircle />
              </ListItemIcon>
              <ListItemText primary={user.name} />
            </ListItemButton>

            <ListItemButton
              onClick={() => {
                logout();
                handleDrawerToggle();
              }}
              sx={{
                color: "#fff",
                "&:hover": { color: "var(--brand-amber)" },
              }}
            >
              <ListItemIcon sx={{ minWidth: 32, color: "inherit" }}>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </>
        )}

        {/* Cart */}
        <ListItemButton
          component="a"
          href="/cart"
          onClick={handleDrawerToggle}
          sx={{ mt: 2 }}
        >
          <ListItemIcon sx={{ minWidth: 32, color: "#fff" }}>
            <Badge badgeContent={items.length} color="secondary">
              <ShoppingCart sx={{ color: "white" }} />
            </Badge>
          </ListItemIcon>
          <ListItemText primary="Cart" />
        </ListItemButton>
      </List>

      {/* Bottom Section */}
      <Box
        sx={{
          textAlign: "center",
          mt: "auto",
          opacity: 0.6,
          fontSize: "0.8rem",
        }}
      >
        © {new Date().getFullYear()} Echi Solar
      </Box>
    </Box>
  );

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        top: 0,
        zIndex: 1100,
        background: "rgba(0,0,0,0.85)",
        backdropFilter: "blur(8px)",
        color: "white",
        borderBottom: "1px solid rgba(255,255,255,0.1)",
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
            gap: 1,
          }}
        >
          <Box
            component="img"
            src="/images/logo.png"
            alt="Echi Solar"
            sx={{ height: 30 }}
          />
        </Box>

        {/* Desktop Links */}
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            gap: 3,
            alignItems: "center",
          }}
        >
          {navLinks.map((link) => (
            <Button
              key={link.label}
              href={link.href}
              sx={{
                color: "#fff",
                fontWeight: "bold",
                textTransform: "none",
                position: "relative",
                "&::after": {
                  content: '""',
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  width: "0%",
                  height: "2px",
                  backgroundColor: "var(--brand-amber)",
                  transition: "width 0.3s ease",
                },
                "&:hover::after": { width: "100%" },
                "&:hover": { color: "var(--brand-amber)" },
              }}
            >
              {link.label}
            </Button>
          ))}

          {!user ? (
            <Button
              href="/login"
              startIcon={<AccountCircle sx={{ color: "var(--brand-amber)" }} />}
              sx={{
                color: "var(--brand-amber)",
                fontWeight: "bold",
                textTransform: "none",
                border: "1px solid var(--brand-amber)",
                borderRadius: 2,
                px: 2,
                "&:hover": {
                  background:
                    "linear-gradient(90deg, var(--brand-amber), #ffbe6b)",
                  color: "#000",
                },
              }}
            >
              Login
            </Button>
          ) : (
            <>
              <Button
                href="/user/profile"
                startIcon={
                  <AccountCircle sx={{ color: "var(--brand-green)" }} />
                }
                sx={{ color: "var(--brand-green)", fontWeight: "bold" }}
              >
                {user.name}
              </Button>
              <Button
                onClick={logout}
                startIcon={<LogoutIcon sx={{ color: "#fff" }} />}
                sx={{
                  color: "#fff",
                  fontWeight: "bold",
                  "&:hover": { color: "var(--brand-amber)" },
                }}
              >
                Logout
              </Button>
            </>
          )}
        </Box>

        {/* Right-side buttons */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <IconButton
            href="tel:+2347018090107"
            sx={{
              background: "linear-gradient(145deg, #1a1a1a, #111)",
              border: "1px solid rgba(255,255,255,0.2)",
              "&:hover": { background: "var(--brand-amber)" },
              color: "white",
            }}
          >
            <PhoneIcon />
          </IconButton>

          <Button
            variant="contained"
            startIcon={
              <Badge badgeContent={items.length} color="secondary">
                <ShoppingCart />
              </Badge>
            }
            href="/cart"
            sx={{
              background: "linear-gradient(90deg, #f6c90e, #ffab46)",
              color: "white",
              fontWeight: "bold",
              borderRadius: 2,
              px: 3,
              boxShadow: "0 0 15px rgba(246,201,14,0.4)",
              "&:hover": {
                background:
                  "linear-gradient(90deg, var(--brand-amber), #FFAB46)",
                color: "#000",
              },
              display: { xs: "none", md: "flex" },
            }}
          >
            Cart
          </Button>

          <IconButton
            edge="end"
            onClick={handleDrawerToggle}
            sx={{ display: { md: "none" }, color: "#fff" }}
          >
            <MenuIcon />
          </IconButton>
        </Box>
      </Toolbar>

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
