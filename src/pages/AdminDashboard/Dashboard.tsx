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
  Grid,
  Paper,
} from "@mui/material";
import {
  Menu as MenuIcon,
  ShoppingCart,
  Group,
  Inventory,
  AttachMoney,
  Dashboard as DashboardIcon,
} from "@mui/icons-material";
import { useState } from "react";

// Brand Colors
const brandAmber = "#FFAB46";
const brandGreen = "#2E7D4D";

const drawerWidth = 240;

const AdminDashboard = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const menuItems = [
    { text: "Dashboard", icon: <DashboardIcon /> },
    { text: "Products", icon: <Inventory /> },
    { text: "Orders", icon: <ShoppingCart /> },
    { text: "Users", icon: <Group /> },
    { text: "Revenue", icon: <AttachMoney /> },
  ];

  const drawer = (
    <Box
      sx={{
        height: "100%",
        background: "linear-gradient(180deg, #121212, #1E1E1E)",
        color: "#fff",
      }}
    >
      <Typography
        variant="h6"
        sx={{
          textAlign: "center",
          py: 3,
          fontWeight: "bold",
          color: brandAmber,
          letterSpacing: 1.2,
        }}
      >
        Admin Panel
      </Typography>

      <List>
        {menuItems.map((item) => (
          <ListItem
            // button
            key={item.text}
            sx={{
              "&:hover": {
                background: "rgba(255,255,255,0.08)",
              },
            }}       
          >
          
            <ListItemIcon sx={{ color: brandAmber }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex", bgcolor: "#0D0D0D", minHeight: "100vh" }}>
      <CssBaseline />

      {/* Top AppBar */}
      <AppBar
        position="fixed"
        sx={{
          background: "linear-gradient(90deg, #1B1B1B, #121212)",
          boxShadow: "0 2px 10px rgba(0,0,0,0.6)",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              flexGrow: 1,
              color: brandAmber,
            }}
          >
            Dashboard Overview
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Sidebar Drawer */}
      <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: 0 }}>
        {/* Mobile Drawer */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>

        {/* Desktop Drawer */}
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
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          mt: 8,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Grid container spacing={3}>
          {/* Summary Cards */}
          {[
            { title: "Total Sales", value: "₦2.3M" },
            { title: "Orders", value: "432" },
            { title: "Users", value: "1,248" },
            { title: "Products", value: "76" },
          ].map((card, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
              <Paper
                sx={{
                  p: 3,
                  borderRadius: 3,
                  background:
                    "linear-gradient(145deg, rgba(255,171,70,0.1), rgba(46,125,77,0.15))",
                  color: "#fff",
                  backdropFilter: "blur(8px)",
                  boxShadow: "0 0 20px rgba(0,0,0,0.4)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: `0 0 25px ${brandAmber}`,
                  },
                }}
              >
                <Typography variant="subtitle2" sx={{ opacity: 0.7 }}>
                  {card.title}
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                  {card.value}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* Analytics Placeholder */}
        <Paper
          sx={{
            mt: 5,
            p: 4,
            borderRadius: 3,
            background: "linear-gradient(145deg, #181818, #1F1F1F)",
            color: "#fff",
            boxShadow: "0 0 25px rgba(0,0,0,0.5)",
          }}
        >
          <Typography variant="h6" sx={{ mb: 2, color: brandGreen }}>
            Sales Analytics (Coming Soon)
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.7 }}>
            Visual charts for revenue growth, top products, and order trends
            will appear here.
          </Typography>
        </Paper>
      </Box>
    </Box>
  );
};

export default AdminDashboard;
