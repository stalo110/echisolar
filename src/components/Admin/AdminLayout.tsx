import {
  Box,
  CssBaseline,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  AppBar,
  Typography,
  IconButton,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Close as CloseIcon,
  ShoppingCart,
  Group,
  Inventory,
  AttachMoney,
  Dashboard as DashboardIcon,
  Logout as LogoutIcon,
  Brightness4,
  Brightness7,
} from "@mui/icons-material";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useTheme } from "../../contexts/ThemeContext";

const drawerWidth = 240;

const menuItems = [
  { text: "Dashboard", icon: <DashboardIcon />, path: "/admin/dashboard" },
  { text: "Products", icon: <Inventory />, path: "/admin/products" },
  { text: "Projects", icon: <Inventory />, path: "/admin/projects" },
  { text: "Orders", icon: <ShoppingCart />, path: "/admin/orders" },
  { text: "Users", icon: <Group />, path: "/admin/users" },
  { text: "Revenue", icon: <AttachMoney />, path: "/admin/revenue" },
];

interface Props {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: Props) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { theme, mode, toggleTheme } = useTheme();

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const drawer = (
    <Box
      sx={{
        height: "100%",
        background: mode === 'dark' ? "linear-gradient(180deg, #121212, #1E1E1E)" : "linear-gradient(180deg, #f8f9fa, #ffffff)",
        color: theme.palette.text.primary,
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: 2,
          py: 2.5,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            color: theme.palette.primary.main,
            letterSpacing: 1.2,
            fontFamily: "JUST Sans ExBold",
          }}
        >
          Admin Panel
        </Typography>
        <IconButton
          onClick={handleDrawerToggle}
          sx={{
            color: theme.palette.primary.main,
            display: { sm: "none" },
          }}
        >
          <CloseIcon />
        </IconButton>
      </Box>

      {/* Theme Toggle */}
      <Box sx={{ px: 2, pb: 2 }}>
        <Box
          onClick={toggleTheme}
          sx={{
            display: "flex",
            alignItems: "center",
            p: 1,
            borderRadius: 1,
            cursor: "pointer",
            "&:hover": { background: mode === 'dark' ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)" },
            transition: "0.3s",
          }}
        >
          <IconButton
            size="small"
            sx={{
              color: theme.palette.primary.main,
              mr: 1,
            }}
          >
            {mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
          <Typography variant="body2" sx={{ color: theme.palette.text.secondary, fontFamily: "JUST Sans Regular" }}>
            {mode === 'dark' ? 'Light Mode' : 'Dark Mode'}
          </Typography>
        </Box>
      </Box>

      {/* Menu */}
      <List>
        {menuItems.map((item) => {
          const active = location.pathname === item.path;
          return (
            <ListItem
              key={item.text}
              component={Link}
              to={item.path}
              sx={{
                background: active
                  ? `${theme.palette.primary.main}25`
                  : "transparent",
                "&:hover": { background: mode === 'dark' ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)" },
                transition: "0.3s",
              }}
            >
              <ListItemIcon sx={{ color: theme.palette.primary.main }}>{item.icon}</ListItemIcon>
              <ListItemText
                primary={item.text}
                primaryTypographyProps={{
                  fontWeight: active ? "bold" : "normal",
                  color: active ? theme.palette.primary.main : theme.palette.text.primary,
                  fontFamily: active ? "JUST Sans ExBold" : "JUST Sans Regular",
                }}
              />
            </ListItem>
          );
        })}
        
        {/* Logout Button */}
        <ListItem
          onClick={handleLogout}
          sx={{
            mt: 2,
            cursor: "pointer",
            "&:hover": { background: mode === 'dark' ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)" },
            transition: "0.3s",
          }}
        >
          <ListItemIcon sx={{ color: "#ff6b6b" }}>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText
            primary="Logout"
            primaryTypographyProps={{
              fontWeight: "normal",
              color: "#ff6b6b",
              fontFamily: "JUST Sans Regular",
            }}
          />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex", bgcolor: theme.palette.background.default, minHeight: "100vh" }}>
      <CssBaseline />

      {/* Top AppBar */}
      <AppBar
        position="fixed"
        sx={{
          background: mode === 'dark' ? "linear-gradient(90deg, #1B1B1B, #121212)" : "linear-gradient(90deg, #ffffff, #f8f9fa)",
          boxShadow: `0 2px 10px ${theme.palette.divider}`,
          zIndex: 1201,
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" }, color: theme.palette.text.primary }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              flexGrow: 1,
              color: theme.palette.primary.main,
              fontFamily: "JUST Sans ExBold",
            }}
          >
            Admin Dashboard
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Sidebar */}
      <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: 0 }}>
        {/* Mobile */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": { width: drawerWidth, boxSizing: "border-box" },
          }}
        >
          {drawer}
        </Drawer>

        {/* Desktop */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      {/* Main Content */}
      <Box
        sx={{
          flexGrow: 1,
          p: { xs: 2, sm: 3 },
          mt: 8,
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default AdminLayout;