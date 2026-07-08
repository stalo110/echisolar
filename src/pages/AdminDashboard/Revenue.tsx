import { Box, Typography, Paper, Grid, LinearProgress, Table, TableBody, TableCell, TableHead, TableRow, Stack, Chip, useMediaQuery, useTheme as useMuiTheme } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import AdminLayout from "../../components/Admin/AdminLayout";
import { useTheme } from "../../contexts/ThemeContext";
import { fetchRevenueAnalytics, type RevenueAnalytics } from "../../services/adminService";

const formatCurrency = (value: number) => `₦${Number(value || 0).toLocaleString()}`;

const Revenue = () => {
  const { theme, mode } = useTheme();
  const muiTheme = useMuiTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down("sm"));
  const adminHeadingColor = mode === "dark" ? theme.palette.text.primary : theme.palette.primary.main;
  const adminSupportTextColor = mode === "dark" ? theme.palette.text.primary : theme.palette.text.secondary;
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
        <Typography variant="h5" sx={{ color: adminHeadingColor, mb: 3, fontFamily: "JUST Sans ExBold" }}>
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
              <Typography variant="body2" sx={{ opacity: 0.8, color: adminSupportTextColor, fontFamily: "JUST Sans Regular" }}>
                {growthLabel}
              </Typography>
              <Typography variant="body2" sx={{ mt: 1, color: adminSupportTextColor, fontFamily: "JUST Sans Regular" }}>
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
              <Typography variant="subtitle1" sx={{ mb: 1, color: adminHeadingColor, fontFamily: "JUST Sans ExBold" }}>
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
                  color: adminSupportTextColor,
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
          <Typography variant="h6" sx={{ mb: 2, color: adminHeadingColor, fontFamily: "JUST Sans ExBold" }}>
            Monthly Breakdown
          </Typography>
          {!data?.monthly?.length ? (
            <Typography sx={{ mt: 1, color: adminSupportTextColor, fontFamily: "JUST Sans Regular" }}>
              No monthly revenue records yet.
            </Typography>
          ) : isMobile ? (
            <Stack spacing={1.5}>
              {(data?.monthly || []).map((item) => (
                <Paper key={item.month} variant="outlined" sx={{ p: 1.5, borderRadius: 2, bgcolor: theme.palette.background.default }}>
                  <Typography sx={{ fontFamily: "JUST Sans ExBold", fontSize: "0.9rem", color: theme.palette.text.primary }}>{item.month}</Typography>
                  <Box sx={{ display: "flex", gap: 1, mt: 0.5, flexWrap: "wrap" }}>
                    <Chip label={formatCurrency(item.revenue)} size="small" sx={{ fontFamily: "JUST Sans ExBold", bgcolor: theme.palette.primary.main, color: mode === "dark" ? "#000" : "#fff", fontSize: "0.75rem" }} />
                    <Chip label={`${item.orders} orders`} size="small" variant="outlined" sx={{ fontFamily: "JUST Sans Regular", fontSize: "0.75rem" }} />
                  </Box>
                </Paper>
              ))}
            </Stack>
          ) : (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ color: adminHeadingColor, fontFamily: "JUST Sans ExBold" }}>Month</TableCell>
                  <TableCell sx={{ color: adminHeadingColor, fontFamily: "JUST Sans ExBold" }}>Revenue</TableCell>
                  <TableCell sx={{ color: adminHeadingColor, fontFamily: "JUST Sans ExBold" }}>Orders</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(data?.monthly || []).map((item) => (
                  <TableRow key={item.month}>
                    <TableCell sx={{ color: theme.palette.text.primary, fontFamily: "JUST Sans Regular" }}>{item.month}</TableCell>
                    <TableCell sx={{ color: theme.palette.text.primary, fontFamily: "JUST Sans Regular" }}>{formatCurrency(item.revenue)}</TableCell>
                    <TableCell sx={{ color: theme.palette.text.primary, fontFamily: "JUST Sans Regular" }}>{item.orders}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
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
          <Typography variant="h6" sx={{ mb: 2, color: adminHeadingColor, fontFamily: "JUST Sans ExBold" }}>
            Recent Paid Orders
          </Typography>
          {!data?.recentPaidOrders?.length ? (
            <Typography sx={{ mt: 1, color: adminSupportTextColor, fontFamily: "JUST Sans Regular" }}>
              No paid orders yet.
            </Typography>
          ) : isMobile ? (
            <Stack spacing={1.5}>
              {(data?.recentPaidOrders || []).map((order) => (
                <Paper key={order.id} variant="outlined" sx={{ p: 1.5, borderRadius: 2, bgcolor: theme.palette.background.default }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Typography sx={{ fontFamily: "JUST Sans ExBold", fontSize: "0.88rem", color: theme.palette.text.primary }}>Order #{order.id}</Typography>
                    <Chip label={formatCurrency(order.totalAmount)} size="small" sx={{ fontFamily: "JUST Sans ExBold", bgcolor: theme.palette.primary.main, color: mode === "dark" ? "#000" : "#fff", fontSize: "0.75rem" }} />
                  </Box>
                  <Typography sx={{ fontFamily: "JUST Sans Regular", fontSize: "0.8rem", color: theme.palette.text.secondary, mt: 0.4 }}>
                    {order.customerName || "N/A"} · {order.customerEmail || "N/A"}
                  </Typography>
                </Paper>
              ))}
            </Stack>
          ) : (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ color: adminHeadingColor, fontFamily: "JUST Sans ExBold" }}>Order ID</TableCell>
                  <TableCell sx={{ color: adminHeadingColor, fontFamily: "JUST Sans ExBold" }}>Customer</TableCell>
                  <TableCell sx={{ color: adminHeadingColor, fontFamily: "JUST Sans ExBold" }}>Amount</TableCell>
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
          )}
        </Paper>
      </Box>
    </AdminLayout>
  );
};

export default Revenue;
