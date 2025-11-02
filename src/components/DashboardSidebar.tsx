// src/components/DashboardSidebar.jsx
import { List, ListItemButton, ListItemIcon, ListItemText, Paper } from "@mui/material";
import { Dashboard, ShoppingBag, Subscriptions, AccountCircle } from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";

const DashboardSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { id: "dashboard", text: "Dashboard", icon: <Dashboard />, path: "/user/dashboard" },
    { id: "products", text: "Products", icon: <ShoppingBag />, path: "/user/products" },
    { id: "subscriptions", text: "Subscriptions", icon: <Subscriptions />, path: "/user/subscriptions" },
    { id: "profile", text: "Profile", icon: <AccountCircle />, path: "/user/profile" },
  ];

  return (
    <Paper
      sx={{
        p: 2,
        background: "linear-gradient(180deg, #141414, #0e0e0e)",
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: 3,
        boxShadow: "0 2px 10px rgba(0,0,0,0.4)",
      }}
    >
      <List>
        {menuItems.map((item) => {
          const selected = location.pathname === item.path;
          return (
            <ListItemButton
              key={item.id}
              onClick={() => navigate(item.path)}
              selected={selected}
              sx={{
                borderRadius: 2,
                mb: 1,
                color: selected ? "#f6c90e" : "#bbb",
                backgroundColor: selected ? "rgba(246,201,14,0.1)" : "transparent",
                "&:hover": { backgroundColor: "rgba(246,201,14,0.08)" },
              }}
            >
              <ListItemIcon sx={{ color: selected ? "#f6c90e" : "#777", minWidth: 40 }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          );
        })}
      </List>
    </Paper>
  );
};

export default DashboardSidebar;
