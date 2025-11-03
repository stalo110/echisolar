import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Button,
  Avatar,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Drawer,
} from "@mui/material";
import TopNav from "../navigation/TopNav";
import Footer from "../navigation/Footer";
import {
  Dashboard,
  ShoppingBag,
  Subscriptions,
  AccountCircle,
  Menu as MenuIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Profile = () => {
  const user = {
    name: "John Doe",
    email: "john@example.com",
    phone: "+1 234 567 890",
    address: "123 Luxury Avenue, Lagos, Nigeria",
    joined: "March 2024",
  };

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
    <Box sx={{ bgcolor: "#0B0C10", color: "#fff", minHeight: "100vh" }}>
      <TopNav />
      <Container sx={{ py: 6 }}>
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

          {/* Profile Details */}
          <Grid size={{ xs: 12, md: 9 }}>
            <Typography
              variant="h4"
              sx={{ fontWeight: "700", color: "#C79B3B", mb: 4 }}
            >
              My Profile
            </Typography>

            <Grid container spacing={3}>
              {/* Summary Card */}
              <Grid size={{ xs: 12, md: 5 }}>
                <Paper
                  sx={{
                    bgcolor: "#1F2833",
                    p: 3,
                    borderRadius: 3,
                    boxShadow: "0 0 25px rgba(0,0,0,0.4)",
                  }}
                >
                  <Box sx={{ textAlign: "center" }}>
                    <Avatar
                      sx={{
                        width: 100,
                        height: 100,
                        mb: 2,
                        mx: "auto",
                        bgcolor: "#C79B3B",
                        fontSize: 32,
                      }}
                    >
                      {user.name.charAt(0)}
                    </Avatar>
                    <Typography variant="h6">{user.name}</Typography>
                    <Typography variant="body2" sx={{ color: "#ccc" }}>
                      {user.email}
                    </Typography>
                  </Box>

                  <Divider
                    sx={{ my: 3, borderColor: "rgba(255,255,255,0.1)" }}
                  />

                  <Typography variant="body2">
                    <strong>Phone:</strong> {user.phone}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Address:</strong> {user.address}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Member since:</strong> {user.joined}
                  </Typography>
                </Paper>
              </Grid>

              {/* Account Overview */}
              <Grid size={{ xs: 12, md: 7 }}>
                <Paper
                  sx={{
                    bgcolor: "#1F2833",
                    p: 3,
                    borderRadius: 3,
                    boxShadow: "0 0 25px rgba(0,0,0,0.4)",
                  }}
                >
                  <Typography variant="h6" sx={{ color: "#C79B3B", mb: 2 }}>
                    Account Overview
                  </Typography>
                  <Typography sx={{ mb: 1 }}>Orders: 12</Typography>
                  <Typography sx={{ mb: 1 }}>Wishlist Items: 8</Typography>
                  <Typography sx={{ mb: 1 }}>
                    Active Subscription: Yes
                  </Typography>
                  <Typography sx={{ mb: 1 }}>Total Spent: $1,200</Typography>

                  <Box mt={3}>
                    <Button
                      variant="contained"
                      sx={{
                        bgcolor: "#C79B3B",
                        color: "#000",
                        fontWeight: "600",
                        "&:hover": { bgcolor: "#e1b860" },
                      }}
                    >
                      Edit Profile
                    </Button>
                  </Box>
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

export default Profile;
