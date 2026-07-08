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
import { alpha } from "@mui/material/styles";
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
  MailOutline,
  LocalOffer,
  PeopleAlt,
} from "@mui/icons-material";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useTheme } from "../../contexts/ThemeContext";

const drawerWidth = 240;

const menuItems = [
  { text: "Dashboard", icon: <DashboardIcon />, path: "/admin/dashboard" },
  { text: "Products", icon: <Inventory />, path: "/admin/products" },
  { text: "Packages", icon: <LocalOffer />, path: "/admin/packages" },
  { text: "Projects", icon: <Inventory />, path: "/admin/projects" },
  { text: "Orders", icon: <ShoppingCart />, path: "/admin/orders" },
  { text: "Users", icon: <Group />, path: "/admin/users" },
  { text: "Messages", icon: <MailOutline />, path: "/admin/messages" },
  { text: "Referrals", icon: <PeopleAlt />, path: "/admin/referrals" },
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
  const adminHeadingColor = mode === "dark" ? theme.palette.text.primary : theme.palette.primary.main;
  const sidebarBaseColor = theme.palette.text.primary;
  const sidebarAccentColor = theme.palette.primary.main;
  const sidebarHoverBg = mode === "dark" ? alpha(theme.palette.primary.main, 0.08) : alpha(theme.palette.primary.main, 0.06);

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
            color: adminHeadingColor,
            letterSpacing: 1.2,
            fontFamily: "JUST Sans ExBold",
          }}
        >
          Admin Panel
        </Typography>
        <IconButton
          onClick={handleDrawerToggle}
          sx={{
            color: mode === "dark" ? sidebarBaseColor : theme.palette.primary.main,
            display: { sm: "none" },
            "&:hover": {
              color: sidebarAccentColor,
            },
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
            "&:hover": { background: sidebarHoverBg },
            "&:hover .theme-toggle-icon, &:hover .theme-toggle-label": {
              color: sidebarAccentColor,
            },
            transition: "0.3s",
          }}
        >
          <IconButton
            size="small"
            sx={{
              color: mode === "dark" ? sidebarBaseColor : theme.palette.text.secondary,
              mr: 1,
            }}
          >
            {mode === 'dark' ? <Brightness7 className="theme-toggle-icon" /> : <Brightness4 className="theme-toggle-icon" />}
          </IconButton>
          <Typography
            variant="body2"
            className="theme-toggle-label"
            sx={{
              color: mode === "dark" ? sidebarBaseColor : theme.palette.text.secondary,
              fontFamily: "JUST Sans Regular",
              transition: "color 0.3s ease",
            }}
          >
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
                borderRadius: 2,
                mx: 1,
                mb: 0.5,
                background: active
                  ? alpha(theme.palette.primary.main, mode === "dark" ? 0.16 : 0.12)
                  : "transparent",
                "& .MuiListItemIcon-root": {
                  color: active ? sidebarAccentColor : sidebarBaseColor,
                  minWidth: 40,
                  transition: "color 0.3s ease",
                },
                "& .MuiListItemText-primary": {
                  color: active ? sidebarAccentColor : sidebarBaseColor,
                  transition: "color 0.3s ease",
                },
                "&:hover": { background: sidebarHoverBg },
                "&:hover .MuiListItemIcon-root, &:hover .MuiListItemText-primary": {
                  color: sidebarAccentColor,
                },
                transition: "0.3s",
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText
                primary={item.text}
                primaryTypographyProps={{
                  fontWeight: active ? "bold" : 500,
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
            borderRadius: 2,
            mx: 1,
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
              color: adminHeadingColor,
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
