import { Box, Grid, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import AdminLayout from "../../components/Admin/AdminLayout";
import { useTheme } from "../../contexts/ThemeContext";
import { fetchAdminDashboardStats, type AdminDashboardStats } from "../../services/adminService";

const formatCurrency = (value: number) => `₦${Number(value || 0).toLocaleString()}`;

const AdminDashboard = () => {
  const { theme, mode } = useTheme();
  const [stats, setStats] = useState<AdminDashboardStats | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchAdminDashboardStats()
      .then((data) => {
        setStats(data);
        setError("");
      })
      .catch(() => {
        setError("Unable to load dashboard metrics.");
      });
  }, []);

  const cards = [
    { title: "Total Sales", value: formatCurrency(stats?.totalSales || 0) },
    { title: "Orders", value: Number(stats?.orders || 0).toLocaleString() },
    { title: "Users", value: Number(stats?.users || 0).toLocaleString() },
    { title: "Products", value: Number(stats?.products || 0).toLocaleString() },
    { title: "Packages", value: Number(stats?.packages || 0).toLocaleString() },
  ];

  return (
    <AdminLayout>
      <Box sx={{ bgcolor: theme.palette.background.default, minHeight: "100vh", p: { xs: 2, sm: 3 } }}>
        <Typography
          variant="h5"
          sx={{
            fontWeight: "bold",
            color: theme.palette.primary.main,
            mb: 4,
            fontFamily: "JUST Sans ExBold",
          }}
        >
          Dashboard Overview
        </Typography>

        <Grid container spacing={3}>
          {cards.map((card) => (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={card.title}>
              <Paper
                sx={{
                  p: 3,
                  borderRadius: 3,
                  background: theme.palette.background.paper,
                  color: theme.palette.text.primary,
                  boxShadow: mode === "dark" ? "0 0 20px rgba(0,0,0,0.4)" : "0 0 20px rgba(0,0,0,0.1)",
                }}
              >
                <Typography variant="subtitle2" sx={{ opacity: 0.75, fontFamily: "JUST Sans Regular" }}>
                  {card.title}
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: "bold", fontFamily: "JUST Sans ExBold" }}>
                  {card.value}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

        <Paper
          sx={{
            mt: 5,
            p: 4,
            borderRadius: 3,
            background: theme.palette.background.paper,
            color: theme.palette.text.primary,
            boxShadow: mode === "dark" ? "0 0 25px rgba(0,0,0,0.5)" : "0 0 25px rgba(0,0,0,0.1)",
          }}
        >
          <Typography variant="h6" sx={{ mb: 1, color: theme.palette.primary.main, fontFamily: "JUST Sans ExBold" }}>
            Live Metrics
          </Typography>
          {error ? (
            <Typography variant="body2" sx={{ color: "#d9534f", fontFamily: "JUST Sans Regular" }}>
              {error}
            </Typography>
          ) : (
            <Typography variant="body2" sx={{ opacity: 0.8, fontFamily: "JUST Sans Regular" }}>
              Gross sales: {formatCurrency(stats?.grossSales || 0)} | Paid orders:{" "}
              {Number(stats?.paidOrders || 0).toLocaleString()} | Active projects:{" "}
              {Number(stats?.projects || 0).toLocaleString()}
            </Typography>
          )}
        </Paper>
      </Box>
    </AdminLayout>
  );
};

export default AdminDashboard;
