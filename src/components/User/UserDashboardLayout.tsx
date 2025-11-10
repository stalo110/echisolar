import {
  Box,
  Container,
  Grid,
  Paper,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Drawer,
} from "@mui/material";
import TopNav from "../../navigation/TopNav";
import Footer from "../../navigation/Footer";
import { useState, type ReactNode } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Dashboard,
  ShoppingBag,
  Subscriptions,
  AccountCircle,
  Menu as MenuIcon,
  Close as CloseIcon,
} from "@mui/icons-material";

const menuItems = [
  {
    id: "dashboard",
    text: "Dashboard",
    icon: <Dashboard />,
    route: "/user/dashboard",
  },
  {
    id: "products",
    text: "Products",
    icon: <ShoppingBag />,
    route: "/user/products",
  },
  {
    id: "subscriptions",
    text: "Subscriptions",
    icon: <Subscriptions />,
    route: "/user/subscriptions",
  },
  {
    id: "profile",
    text: "Profile",
    icon: <AccountCircle />,
    route: "/user/profile",
  },
];

interface UserDashboardLayoutProps {
  children: ReactNode;
}

const UserDashboardLayout = ({ children }: UserDashboardLayoutProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const getActiveSection = () => {
    if (location.pathname.includes("products")) return "products";
    if (location.pathname.includes("subscriptions")) return "subscriptions";
    if (location.pathname.includes("profile")) return "profile";
    return "dashboard";
  };

  const [selected, setSelected] = useState(getActiveSection());

  const Sidebar = (
    <Box
      sx={{
        p: 2,
        background: "linear-gradient(180deg, #141414, #0e0e0e)",
        height: "100%",
        color: "#fff",
      }}
    >
      <IconButton
        sx={{
          color: "#FFAB46",
          mb: 2,
          display: { md: "none", xs: "block" },
        }}
        onClick={() => setDrawerOpen(false)}
      >
        <CloseIcon />
      </IconButton>

      <List>
        {menuItems.map((item) => (
          <ListItemButton
            key={item.id}
            selected={selected === item.id}
            onClick={() => {
              setSelected(item.id);
              navigate(item.route);
              setDrawerOpen(false);
            }}
            sx={{
              borderRadius: 2,
              mb: 1,
              transition: "0.3s ease",
              color: selected === item.id ? "#FFAB46" : "#bbb",
              backgroundColor:
                selected === item.id ? "rgba(246,201,14,0.1)" : "transparent",
              "&:hover": {
                backgroundColor: "rgba(246,201,14,0.15)",
                transform: "translateX(4px)",
              },
            }}
          >
            <ListItemIcon
              sx={{
                color: selected === item.id ? "#FFAB46" : "#777",
                minWidth: 40,
              }}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText
              primary={item.text}
              primaryTypographyProps={{
                fontWeight: selected === item.id ? 600 : 400,
                fontSize: "0.95rem",
                fontFamily: selected === item.id ? "JUST Sans ExBold" : "JUST Sans Regular",
              }}
            />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ bgcolor: "#0B0C10", color: "#fff", minHeight: "100vh" }}>
      <TopNav />
      <Container sx={{ py: 6 }}>
        <IconButton
          sx={{
            color: "#FFAB46",
            mb: 3,
            display: { xs: "inline-flex", md: "none" },
          }}
          onClick={() => setDrawerOpen(true)}
        >
          <MenuIcon />
        </IconButton>
        <Grid container spacing={3}>
          {/* Sidebar */}
          <Grid
            size={{ xs: 12, md: 3 }}
            sx={{
              display: { xs: "none", md: "block" },
            }}
          >
            <Paper
              sx={{
                p: 0,
                background: "linear-gradient(180deg, #141414, #0e0e0e)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 3,
                boxShadow: "0 2px 10px rgba(0,0,0,0.4)",
                height: "100%",
                overflow: "hidden",
              }}
            >
              {Sidebar}
            </Paper>
          </Grid>

          <Drawer
            anchor="left"
            open={drawerOpen}
            onClose={() => setDrawerOpen(false)}
            PaperProps={{
              sx: { width: 260, backgroundColor: "#0e0e0e", color: "#fff" },
            }}
          >
            {Sidebar}
          </Drawer>

          {/* Page Content */}
          <Grid size={{ xs: 12, md: 9 }}>{children}</Grid>
        </Grid>
      </Container>
      <Footer />
    </Box>
  );
};

export default UserDashboardLayout;
