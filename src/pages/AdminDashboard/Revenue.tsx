import { Box, Typography, Paper, Grid, LinearProgress, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import AdminLayout from "../../components/Admin/AdminLayout";
import { useTheme } from "../../contexts/ThemeContext";
import { fetchRevenueAnalytics, type RevenueAnalytics } from "../../services/adminService";

const formatCurrency = (value: number) => `₦${Number(value || 0).toLocaleString()}`;

const Revenue = () => {
  const { theme, mode } = useTheme();
  const [data, setData] = useState<RevenueAnalytics | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchRevenueAnalytics(6)
      .then((response) => {
        setData(response);
        setError("");
      })
      .catch(() => {
        setError("Unable to fetch revenue analytics.");
      });
  }, []);

  const progress = useMemo(() => {
    const monthly = data?.monthly || [];
    if (!monthly.length) return 0;
    const max = Math.max(...monthly.map((item) => item.revenue), 0);
    const last = monthly[monthly.length - 1]?.revenue || 0;
    if (!max) return 0;
    return Math.round((last / max) * 100);
  }, [data]);

  const growthLabel = (() => {
    if (!data || data.growthFromLastMonth === null) return "No previous month data";
    return `${data.growthFromLastMonth >= 0 ? "+" : ""}${data.growthFromLastMonth.toFixed(1)}% from last month`;
  })();

  return (
    <AdminLayout>
      <Box sx={{ p: 3, bgcolor: theme.palette.background.default, color: theme.palette.text.primary, minHeight: "100vh" }}>
        <Typography variant="h5" sx={{ color: theme.palette.primary.main, mb: 3, fontFamily: "JUST Sans ExBold" }}>
          Revenue & Analytics
        </Typography>

        {error && (
          <Typography sx={{ color: "#d9534f", mb: 2, fontFamily: "JUST Sans Regular" }}>{error}</Typography>
        )}

        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Paper
              sx={{
                p: 3,
                borderRadius: 3,
                background: theme.palette.background.paper,
                boxShadow: mode === "dark" ? "0 0 20px rgba(0,0,0,0.4)" : "0 0 20px rgba(0,0,0,0.1)",
              }}
            >
              <Typography variant="subtitle1" sx={{ color: theme.palette.text.primary, fontFamily: "JUST Sans Regular" }}>
                Total Revenue (Paid)
              </Typography>
              <Typography variant="h5" sx={{ color: theme.palette.primary.main, fontWeight: "bold", fontFamily: "JUST Sans ExBold" }}>
                {formatCurrency(data?.totalRevenue || 0)}
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.8, color: theme.palette.text.secondary, fontFamily: "JUST Sans Regular" }}>
                {growthLabel}
              </Typography>
              <Typography variant="body2" sx={{ mt: 1, color: theme.palette.text.secondary, fontFamily: "JUST Sans Regular" }}>
                Paid orders: {Number(data?.paidOrders || 0).toLocaleString()} / Total orders:{" "}
                {Number(data?.totalOrders || 0).toLocaleString()}
              </Typography>
            </Paper>
          </Grid>

          <Grid size={{ xs: 12, md: 8 }}>
            <Paper
              sx={{
                p: 3,
                borderRadius: 3,
                background: theme.palette.background.paper,
                border: `1px solid ${theme.palette.divider}`,
              }}
            >
              <Typography variant="subtitle1" sx={{ mb: 1, color: theme.palette.text.primary, fontFamily: "JUST Sans ExBold" }}>
                Monthly Revenue Trend
              </Typography>
              <LinearProgress
                variant="determinate"
                value={progress}
                sx={{
                  height: 10,
                  borderRadius: 5,
                  bgcolor: theme.palette.divider,
                  "& .MuiLinearProgress-bar": { bgcolor: theme.palette.primary.main },
                }}
              />
              <Typography
                variant="caption"
                sx={{
                  mt: 1,
                  display: "block",
                  color: mode === "dark" ? theme.palette.primary.main : theme.palette.text.primary,
                  fontFamily: "JUST Sans Regular",
                }}
              >
                Current month at {progress}% of highest month in selected range
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        <Paper
          sx={{
            mt: 3,
            p: 2,
            borderRadius: 3,
            background: theme.palette.background.paper,
            border: `1px solid ${theme.palette.divider}`,
          }}
        >
          <Typography variant="h6" sx={{ mb: 2, color: theme.palette.primary.main, fontFamily: "JUST Sans ExBold" }}>
            Monthly Breakdown
          </Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: theme.palette.primary.main, fontFamily: "JUST Sans ExBold" }}>Month</TableCell>
                <TableCell sx={{ color: theme.palette.primary.main, fontFamily: "JUST Sans ExBold" }}>Revenue</TableCell>
                <TableCell sx={{ color: theme.palette.primary.main, fontFamily: "JUST Sans ExBold" }}>Orders</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(data?.monthly || []).map((item) => (
                <TableRow key={item.month}>
                  <TableCell sx={{ color: theme.palette.text.primary, fontFamily: "JUST Sans Regular" }}>{item.month}</TableCell>
                  <TableCell sx={{ color: theme.palette.text.primary, fontFamily: "JUST Sans Regular" }}>
                    {formatCurrency(item.revenue)}
                  </TableCell>
                  <TableCell sx={{ color: theme.palette.text.primary, fontFamily: "JUST Sans Regular" }}>{item.orders}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {!data?.monthly?.length && (
            <Typography sx={{ mt: 1, color: theme.palette.text.secondary, fontFamily: "JUST Sans Regular" }}>
              No monthly revenue records yet.
            </Typography>
          )}
        </Paper>

        <Paper
          sx={{
            mt: 3,
            p: 2,
            borderRadius: 3,
            background: theme.palette.background.paper,
            border: `1px solid ${theme.palette.divider}`,
          }}
        >
          <Typography variant="h6" sx={{ mb: 2, color: theme.palette.primary.main, fontFamily: "JUST Sans ExBold" }}>
            Recent Paid Orders
          </Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: theme.palette.primary.main, fontFamily: "JUST Sans ExBold" }}>Order ID</TableCell>
                <TableCell sx={{ color: theme.palette.primary.main, fontFamily: "JUST Sans ExBold" }}>Customer</TableCell>
                <TableCell sx={{ color: theme.palette.primary.main, fontFamily: "JUST Sans ExBold" }}>Amount</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(data?.recentPaidOrders || []).map((order) => (
                <TableRow key={order.id}>
                  <TableCell sx={{ color: theme.palette.text.primary, fontFamily: "JUST Sans Regular" }}>#{order.id}</TableCell>
                  <TableCell sx={{ color: theme.palette.text.primary, fontFamily: "JUST Sans Regular" }}>
                    {order.customerName || "N/A"} ({order.customerEmail || "N/A"})
                  </TableCell>
                  <TableCell sx={{ color: theme.palette.text.primary, fontFamily: "JUST Sans Regular" }}>
                    {formatCurrency(order.totalAmount)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {!data?.recentPaidOrders?.length && (
            <Typography sx={{ mt: 1, color: theme.palette.text.secondary, fontFamily: "JUST Sans Regular" }}>
              No paid orders yet.
            </Typography>
          )}
        </Paper>
      </Box>
    </AdminLayout>
  );
};

export default Revenue;
