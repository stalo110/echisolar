import { Box, Typography, Paper, Grid } from "@mui/material";
import { useAuth } from "../../contexts/AuthContext";
import UserDashboardLayout from "../../components/User/UserDashboardLayout";
import { useTheme } from "../../contexts/ThemeContext";
import { useEffect, useMemo, useState } from "react";
import { getOrderById, getUserOrders, type OrderDetail, type OrderSummary } from "../../services/orderService";
import { getProfile } from "../../services/userService";
import { fetchMyPackageEnrollments, type PackageEnrollment } from "../../services/packageService";

const formatDate = (value?: string) => {
  if (!value) return "N/A";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : date.toLocaleDateString();
};

const formatAmount = (amount?: number) => `₦${Number(amount || 0).toLocaleString()}`;

const UserDashboardPage = () => {
  const { user } = useAuth();
  const { theme, mode } = useTheme();
  const [orders, setOrders] = useState<OrderSummary[]>([]);
  const [latestOrderDetail, setLatestOrderDetail] = useState<OrderDetail | null>(null);
  const [profileEmail, setProfileEmail] = useState<string>("");
  const [packageEnrollments, setPackageEnrollments] = useState<PackageEnrollment[]>([]);

  useEffect(() => {
    if (user?.email) {
      setProfileEmail(user.email);
      return;
    }
    getProfile()
      .then((data) => setProfileEmail(data.email || ""))
      .catch(() => setProfileEmail(""));
  }, [user?.email]);

  useEffect(() => {
    getUserOrders()
      .then((data) => {
        setOrders(data);
      })
      .catch(() => {
        setOrders([]);
      });
  }, []);

  useEffect(() => {
    fetchMyPackageEnrollments()
      .then((data) => setPackageEnrollments(data))
      .catch(() => setPackageEnrollments([]));
  }, []);

  useEffect(() => {
    if (!orders.length) {
      setLatestOrderDetail(null);
      return;
    }

    getOrderById(orders[0].id)
      .then((data) => setLatestOrderDetail(data))
      .catch(() => setLatestOrderDetail(null));
  }, [orders]);

  const nextInstallment = useMemo(() => {
    if (!latestOrderDetail?.installments?.length) return null;
    return latestOrderDetail.installments.find((item) => item.status !== "paid") || null;
  }, [latestOrderDetail]);

  const subscription = useMemo(() => {
    if (!latestOrderDetail?.installments?.length) return null;
    return {
      plan: `${latestOrderDetail.installments.length}-Installment Plan`,
      status: nextInstallment?.status || "Completed",
      nextPayment: nextInstallment ? formatDate(nextInstallment.dueDate) : "Completed",
    };
  }, [latestOrderDetail, nextInstallment]);

  const packageSummary = useMemo(() => {
    const paid = packageEnrollments.filter((item) => item.status === "paid").length;
    const pending = packageEnrollments.filter((item) => item.status === "pending_payment").length;
    const optedIn = packageEnrollments.filter((item) => item.status === "opted_in").length;
    return {
      paid,
      pending,
      optedIn,
      latest: packageEnrollments[0] || null,
    };
  }, [packageEnrollments]);

  return (
    <UserDashboardLayout>
      <Grid container spacing={3}>
        {/* Package Details */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper
            sx={{
              p: 3,
              background: theme.palette.background.paper,
              border: `1px solid ${theme.palette.divider}`,
              color: theme.palette.text.primary,
              borderRadius: 3,
              boxShadow: mode === 'dark' ? "0 4px 20px rgba(0,0,0,0.4)" : "0 4px 20px rgba(0,0,0,0.1)",
            }}
          >
            <Typography variant="h6" sx={{ mb: 2, color: theme.palette.primary.main, fontFamily: "JUST Sans ExBold" }}>
              Package Status
            </Typography>
            {packageEnrollments.length > 0 ? (
              <>
                <Typography sx={{ fontFamily: "JUST Sans Regular" }}>
                  <strong>Paid Packages:</strong> {packageSummary.paid}
                </Typography>
                <Typography sx={{ fontFamily: "JUST Sans Regular" }}>
                  <strong>Pending Payment:</strong> {packageSummary.pending}
                </Typography>
                <Typography sx={{ fontFamily: "JUST Sans Regular" }}>
                  <strong>Opted In:</strong> {packageSummary.optedIn}
                </Typography>
                {packageSummary.latest && (
                  <Typography sx={{ fontFamily: "JUST Sans Regular" }}>
                    <strong>Latest:</strong> {packageSummary.latest.name} ({packageSummary.latest.status})
                  </Typography>
                )}
                <Typography sx={{ fontFamily: "JUST Sans Regular", mt: 1 }}>
                  <strong>Installment Plan:</strong>{" "}
                  {subscription
                    ? `${subscription.plan} | ${subscription.status}`
                    : "No active installment subscription"}
                </Typography>
              </>
            ) : (
              <Typography sx={{ fontFamily: "JUST Sans Regular" }}>
                No package activity yet.
              </Typography>
            )}
          </Paper>
        </Grid>

        {/* User Info */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper
            sx={{
              p: 3,
              background: theme.palette.background.paper,
              border: `1px solid ${theme.palette.divider}`,
              color: theme.palette.text.primary,
              borderRadius: 3,
              boxShadow: mode === 'dark' ? "0 4px 20px rgba(0,0,0,0.4)" : "0 4px 20px rgba(0,0,0,0.1)",
            }}
          >
            <Typography variant="h6" sx={{ mb: 2, color: theme.palette.primary.main, fontFamily: "JUST Sans ExBold" }}>
              User Information
            </Typography>
            <Typography sx={{ fontFamily: "JUST Sans Regular" }}>
              <strong>Name:</strong> {user?.name}
            </Typography>
            <Typography sx={{ fontFamily: "JUST Sans Regular" }}>
              <strong>Email:</strong> {user?.email || profileEmail || "N/A"}
            </Typography>
          </Paper>
        </Grid>

        {/* Order History */}
        <Grid size={{ xs: 12 }}>
          <Paper
            sx={{
              p: 3,
              background: theme.palette.background.paper,
              border: `1px solid ${theme.palette.divider}`,
              color: theme.palette.text.primary,
              borderRadius: 3,
              boxShadow: mode === 'dark' ? "0 4px 20px rgba(0,0,0,0.4)" : "0 4px 20px rgba(0,0,0,0.1)",
            }}
          >
            <Typography variant="h6" sx={{ mb: 2, color: theme.palette.primary.main, fontFamily: "JUST Sans ExBold" }}>
              Order History
            </Typography>
            {orders.length === 0 && (
              <Typography sx={{ fontFamily: "JUST Sans Regular" }}>
                No orders yet.
              </Typography>
            )}
            {orders.slice(0, 5).map((order) => (
              <Box
                key={order.id}
                sx={{
                  py: 1.5,
                  borderBottom: `1px solid ${theme.palette.divider}`,
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  justifyContent: "space-between",
                  alignItems: { sm: "center" },
                  gap: 1,
                }}
              >
                <Typography sx={{ fontFamily: "JUST Sans ExBold" }}>Order #{order.id}</Typography>
                <Typography variant="body2" color="gray" sx={{ fontFamily: "JUST Sans Regular" }}>
                  {formatDate(order.placedAt)} | {order.paymentStatus || order.status} |{" "}
                  <strong>{formatAmount(order.totalAmount)}</strong>
                </Typography>
              </Box>
            ))}
          </Paper>
        </Grid>
      </Grid>
    </UserDashboardLayout>
  );
};

export default UserDashboardPage;
