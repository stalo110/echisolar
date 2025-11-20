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
import CloseIcon from "@mui/icons-material/Close";
import { FaWhatsapp } from "react-icons/fa";
import AccountCircle from "@mui/icons-material/AccountCircle";
import ShoppingCart from "@mui/icons-material/ShoppingCart";
import LogoutIcon from "@mui/icons-material/Logout";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import { useAuth } from "../contexts/AuthContext";
import { useCart } from "../contexts/CartContext";
import { useTheme } from "../contexts/ThemeContext";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Projects", href: "/projects" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function TopNav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, logout } = useAuth();
  const { items } = useCart();
  const { mode, toggleTheme, theme } = useTheme();

  const handleDrawerToggle = () => setMobileOpen((s) => !s);
  const drawer = (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        background: mode === 'dark' ? "rgba(0,0,0,0.95)" : "rgba(255,255,255,0.95)",
        backdropFilter: "blur(8px)",
        color: theme.palette.text.primary,
        display: "flex",
        flexDirection: "column",
        p: 3,
        borderBottom: `1px solid ${theme.palette.divider}`,
      }}
    >
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
            sx={{ height: 20, filter: mode === 'dark' ? "brightness(0) invert(1)" : "none" }}
          />
        </Box>

        <IconButton
          onClick={handleDrawerToggle}
          aria-label="close drawer"
          sx={{ color: theme.palette.text.primary }}
        >
          <CloseIcon />
        </IconButton>
      </Box>

      <List
        sx={{
          mt: 4,
          "& .MuiListItemButton-root": {
            borderRadius: "8px",
            mb: 1,
            py: 1.5,
            px: 2,
            transition: "all 0.3s ease",
            fontFamily:"JUST Sans Regular",
            "&:hover": {
              backgroundColor: mode === 'dark' ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)",
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
                color: theme.palette.text.primary,
                fontFamily: "JUST Sans Regular",
                sx: {
                  transition: "color 0.3s ease",
                  "&:hover": { color: theme.palette.primary.main },
                },
              }}
            />
          </ListItemButton>
        ))}

        {!user ? (
          <>
            <ListItemButton
              component="a"
              href="/login"
              onClick={handleDrawerToggle}
              sx={{
                border: `1px solid ${theme.palette.primary.main}`,
                color: theme.palette.primary.main,
                borderRadius: 2,
                mt: 2,
                "&:hover": {
                  background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
                  color: mode === 'dark' ? "#000" : "#fff",
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 32, color: "inherit" }}>
                <AccountCircle />
              </ListItemIcon>
              <ListItemText primary="Login" primaryTypographyProps={{ fontFamily: "JUST Sans Regular" }} />
            </ListItemButton>

            <ListItemButton
              component="a"
              href="/register"
              onClick={handleDrawerToggle}
              sx={{
                color: theme.palette.text.primary,
                fontWeight: 600,
                "&:hover": { color: theme.palette.primary.main },
              }}
            >
              <ListItemText primary="Sign Up" primaryTypographyProps={{ fontFamily: "JUST Sans Regular" }} />
            </ListItemButton>
          </>
        ) : (
          <>
            <ListItemButton
              component="a"
              href="/user/profile"
              onClick={handleDrawerToggle}
              sx={{
                color: theme.palette.secondary.main,
                fontWeight: "bold",
              }}
            >
              <ListItemIcon sx={{ minWidth: 32, color: theme.palette.secondary.main }}>
                <AccountCircle />
              </ListItemIcon>
              <ListItemText primary={user.name} primaryTypographyProps={{ fontFamily: "JUST Sans Regular" }} />
            </ListItemButton>

            <ListItemButton
              onClick={() => {
                logout();
                handleDrawerToggle();
              }}
              sx={{
                color: theme.palette.text.primary,
                "&:hover": { color: theme.palette.primary.main },
              }}
            >
              <ListItemIcon sx={{ minWidth: 32, color: "inherit" }}>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" primaryTypographyProps={{ fontFamily: "JUST Sans Regular" }} />
            </ListItemButton>
          </>
        )}

        <ListItemButton
          component="a"
          href="/cart"
          onClick={handleDrawerToggle}
          sx={{ mt: 2 }}
        >
          <ListItemIcon sx={{ minWidth: 32, color: theme.palette.text.primary }}>
            <Badge badgeContent={items.length} color="secondary">
              <ShoppingCart sx={{ color: theme.palette.text.primary }} />
            </Badge>
          </ListItemIcon>
          <ListItemText primary="Cart" primaryTypographyProps={{ fontFamily: "JUST Sans Regular" }} />
        </ListItemButton>
      </List>

      <Box
        sx={{
          textAlign: "center",
          mt: "auto",
          opacity: 0.6,
          fontSize: "0.8rem",
          color: theme.palette.text.secondary,
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
        background: mode === 'dark' ? "rgba(0,0,0,0.85)" : "rgba(255,255,255,0.95)",
        backdropFilter: "blur(8px)",
        color: theme.palette.text.primary,
        borderBottom: `1px solid ${theme.palette.divider}`,
        px: { xs: 2, md: 6 },
      }}
    >
      <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
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
            sx={{ height: 20, filter: mode === 'dark' ? "brightness(0) invert(1)" : "none" }}
          />
        </Box>

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
                color: theme.palette.text.primary,
                fontWeight: "bold",
                fontFamily: "JUST Sans Regular",
                textTransform: "none",
                position: "relative",
                "&::after": {
                  content: '""',
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  width: "0%",
                  height: "2px",
                  backgroundColor: theme.palette.primary.main,
                  transition: "width 0.3s ease",
                },
                "&:hover::after": { width: "100%" },
                "&:hover": { color: theme.palette.primary.main },
              }}
            >
              {link.label}
            </Button>
          ))}

          {!user ? (
            <Button
              href="/login"
              startIcon={<AccountCircle sx={{ color: theme.palette.primary.main }} />}
              sx={{
                color: theme.palette.primary.main,
                fontWeight: "bold",
                fontFamily: "JUST Sans Regular",
                textTransform: "none",
                border: `1px solid ${theme.palette.primary.main}`,
                borderRadius: 2,
                px: 2,
                "&:hover": {
                  background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
                  color: mode === 'dark' ? "#000" : "#fff",
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
                  <AccountCircle sx={{ color: theme.palette.secondary.main }} />
                }
                sx={{ color: theme.palette.secondary.main, fontWeight: "bold", fontFamily: "JUST Sans Regular" }}
              >
                {user.name}
              </Button>
              <Button
                onClick={logout}
                startIcon={<LogoutIcon sx={{ color: theme.palette.text.primary }} />}
                sx={{
                  color: theme.palette.text.primary,
                  fontWeight: "bold",
                  fontFamily: "JUST Sans Regular",
                  "&:hover": { color: theme.palette.primary.main },
                }}
              >
                Logout
              </Button>
            </>
          )}
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <IconButton
            onClick={toggleTheme}
            sx={{
              color: theme.palette.text.primary,
              "&:hover": { color: theme.palette.primary.main },
            }}
          >
            {mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
          </IconButton>

          <IconButton
            href="https://wa.me/2347018090107"
            target="_blank"
            sx={{
              background: mode === 'dark' ? "linear-gradient(145deg, #1a1a1a, #111)" : "linear-gradient(145deg, #f5f5f5, #e0e0e0)",
              border: `1px solid ${theme.palette.divider}`,
              "&:hover": { background: theme.palette.primary.main },
              color: theme.palette.text.primary,
            }}
          >
            <FaWhatsapp />
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
              background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
              color: mode === 'dark' ? "white" : "#000",
              fontWeight: "bold",
              fontFamily: "JUST Sans Regular",
              borderRadius: 2,
              px: 3,
              boxShadow: `0 0 15px ${theme.palette.primary.main}40`,
              "&:hover": {
                background: `linear-gradient(90deg, ${theme.palette.primary.light}, ${theme.palette.primary.main})`,
                color: mode === 'dark' ? "#000" : "white",
              },
              display: { xs: "none", md: "flex" },
            }}
          >
            Cart
          </Button>

          <IconButton
            edge="end"
            onClick={handleDrawerToggle}
            sx={{ display: { md: "none" }, color: theme.palette.text.primary }}
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