import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  List,
  ListItemText,
  ListItemButton,
  ListItemIcon,
  IconButton,
  Drawer,
} from "@mui/material";
import { useAuth } from "../contexts/AuthContext";
import TopNav from "../navigation/TopNav";
import Footer from "../navigation/Footer";
import {
  Dashboard,
//   ShoppingBag,
//   Subscriptions,
//   AccountCircle,
  Menu as MenuIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
// import DashboardSidebar from "../components/DashboardSidebar";

const UserDashboardPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [drawerOpen, setDrawerOpen] = useState(false);

  // Extract active section based on current route
  const getActiveSection = () => {
    if (location.pathname.includes("products")) return "products";
    if (location.pathname.includes("subscriptions")) return "subscriptions";
    if (location.pathname.includes("profile")) return "profile";
    return "/user/dashboard";
  };

  const [selected, setSelected] = useState(getActiveSection());

  const subscription = {
    plan: "6 Month Plan",
    status: "Active",
    nextPayment: "2025-11-30",
  };

  const orders = [
    { id: "1", date: "2025-10-15", total: "₦250,000", status: "Delivered" },
    { id: "2", date: "2025-10-20", total: "₦150,000", status: "Shipped" },
  ];

  const menuItems = [
    { id: "dashboard", text: "Dashboard", icon: <Dashboard />, route: "/user/dashboard" },
    // { id: "products", text: "Products", icon: <ShoppingBag />, route: "/products" },
    // { id: "subscriptions", text: "Subscriptions", icon: <Subscriptions />, route: "/subscriptions" },
    // { id: "profile", text: "Profile", icon: <AccountCircle />, route: "/profile" },
  ];

  // Sidebar Component
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
          color: "#f6c90e",
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
              color: selected === item.id ? "#f6c90e" : "#bbb",
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
                color: selected === item.id ? "#f6c90e" : "#777",
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
              }}
            />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ backgroundColor: "#0b0b0b", minHeight: "100vh" }}>
      <TopNav />

      <Container maxWidth="lg" sx={{ py: 6 }}>
        {/* Mobile menu toggle */}
        <IconButton
          sx={{
            color: "#f6c90e",
            mb: 3,
            display: { xs: "inline-flex", md: "none" },
          }}
          onClick={() => setDrawerOpen(true)}
        >
          <MenuIcon />
        </IconButton>

        <Grid container spacing={3}>
          {/* Sidebar (Desktop) */}
          <Grid
            size={{xs:12, md:3}}
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

          {/* Drawer (Mobile) */}
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

          {/* Main Content */}
          <Grid size={{xs:12, md:9}}>
            <Grid container spacing={3}>
              {/* Subscription Details */}
              <Grid size={{xs:12, md:6}}>
                <Paper
                  sx={{
                    p: 3,
                    background: "linear-gradient(135deg, #111, #1f1f1f)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "#f5f5f5",
                    borderRadius: 3,
                    boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
                  }}
                >
                  <Typography variant="h6" sx={{ mb: 2, color: "#f6c90e" }}>
                    Subscription Details
                  </Typography>
                  <Typography><strong>Plan:</strong> {subscription.plan}</Typography>
                  <Typography><strong>Status:</strong> {subscription.status}</Typography>
                  <Typography><strong>Next Payment:</strong> {subscription.nextPayment}</Typography>
                </Paper>
              </Grid>

              {/* User Info */}
              <Grid size={{xs:12, md:6}}>
                <Paper
                  sx={{
                    p: 3,
                    background: "linear-gradient(135deg, #111, #1f1f1f)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "#f5f5f5",
                    borderRadius: 3,
                    boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
                  }}
                >
                  <Typography variant="h6" sx={{ mb: 2, color: "#f6c90e" }}>
                    User Information
                  </Typography>
                  <Typography><strong>Name:</strong> {user?.name}</Typography>
                  <Typography><strong>Email:</strong> {user?.email}</Typography>
                </Paper>
              </Grid>

              {/* Order History */}
              <Grid size={{xs:12}}>
                <Paper
                  sx={{
                    p: 3,
                    background: "linear-gradient(135deg, #111, #1f1f1f)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "#f5f5f5",
                    borderRadius: 3,
                    boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
                  }}
                >
                  <Typography variant="h6" sx={{ mb: 2, color: "#f6c90e" }}>
                    Order History
                  </Typography>
                  {orders.map((order) => (
                    <Box
                      key={order.id}
                      sx={{
                        py: 1.5,
                        borderBottom: "1px solid rgba(255,255,255,0.1)",
                        display: "flex",
                        flexDirection: { xs: "column", sm: "row" },
                        justifyContent: "space-between",
                        alignItems: { sm: "center" },
                        gap: 1,
                      }}
                    >
                      <Typography>Order #{order.id}</Typography>
                      <Typography variant="body2" color="gray">
                        {order.date} | {order.status} | <strong>{order.total}</strong>
                      </Typography>
                    </Box>
                  ))}
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>

      <Footer />
    </Box>
  );
};

export default UserDashboardPage;

