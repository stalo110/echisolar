import { Typography, Paper, Grid, Chip } from "@mui/material";
import UserDashboardLayout from "../../components/User/UserDashboardLayout";
import { useTheme } from "../../contexts/ThemeContext";
import { useEffect, useState } from "react";
import { getOrderById, getUserOrders } from "../../services/orderService";

type SubscriptionItem = {
  key: string;
  orderId: number;
  plan: string;
  status: string;
  nextPayment?: string;
  ended?: string;
  price: string;
};

const formatDate = (value?: string) => {
  if (!value) return "N/A";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : date.toLocaleDateString();
};

const UserSubscriptions = () => {
  const { theme, mode } = useTheme();
  const [activeSubs, setActiveSubs] = useState<SubscriptionItem[]>([]);
  const [pastSubs, setPastSubs] = useState<SubscriptionItem[]>([]);

  useEffect(() => {
    getUserOrders()
      .then(async (orders) => {
        if (!orders.length) {
          setActiveSubs([]);
          setPastSubs([]);
          return;
        }

        const orderDetails = await Promise.all(
          orders.slice(0, 12).map((order) =>
            getOrderById(order.id)
              .then((detail) => ({ order, detail }))
              .catch(() => null)
          )
        );

        const installments = orderDetails
          .filter((entry): entry is { order: (typeof orders)[number]; detail: Awaited<ReturnType<typeof getOrderById>> } => Boolean(entry))
          .flatMap(({ order, detail }) =>
            detail.installments.map((installment) => ({
              key: `${order.id}-${installment.installmentNumber}`,
              orderId: order.id,
              plan: `${detail.installments.length}-Installment Plan`,
              status: installment.status,
              nextPayment: installment.status === "pending" ? formatDate(installment.dueDate) : undefined,
              ended: installment.status !== "pending" ? formatDate(installment.dueDate) : undefined,
              price: `₦${Number(installment.amount || 0).toLocaleString()}`,
            }))
          );

        setActiveSubs(installments.filter((item) => item.status === "pending"));
        setPastSubs(installments.filter((item) => item.status !== "pending"));
      })
      .catch(() => {
        setActiveSubs([]);
        setPastSubs([]);
      });
  }, []);

  return (
    <UserDashboardLayout>
      <Typography
        variant="h4"
        sx={{ fontWeight: "700", color: theme.palette.primary.main, mb: 4, fontFamily: "JUST Sans ExBold" }}
      >
        My Subscriptions
      </Typography>

      <Grid container spacing={3}>
        {activeSubs.map((sub) => (
          <Grid size={{ xs: 12, md: 6 }} key={sub.key}>
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
              <Typography variant="h6" sx={{ color: theme.palette.primary.main, fontFamily: "JUST Sans ExBold" }}>
                {sub.plan}
              </Typography>
              <Typography sx={{ fontFamily: "JUST Sans Regular" }}>
                Status: <Chip label={sub.status} color="success" />
              </Typography>
              <Typography sx={{ fontFamily: "JUST Sans Regular" }}>Next Payment: {sub.nextPayment}</Typography>
              <Typography sx={{ fontFamily: "JUST Sans Regular" }}>Amount: {sub.price}</Typography>
              <Typography sx={{ fontFamily: "JUST Sans Regular" }}>Order ID: {sub.orderId}</Typography>
            </Paper>
          </Grid>
        ))}
        {activeSubs.length === 0 && (
          <Grid size={{ xs: 12 }}>
            <Typography sx={{ color: theme.palette.text.secondary, fontFamily: "JUST Sans Regular" }}>
              No active installment plans found.
            </Typography>
          </Grid>
        )}
      </Grid>

      <Typography variant="h6" sx={{ mt: 5, mb: 2, color: theme.palette.primary.main, fontFamily: "JUST Sans ExBold" }}>
        Past Subscriptions
      </Typography>
      <Grid container spacing={3}>
        {pastSubs.map((sub) => (
          <Grid size={{ xs: 12, md: 6 }} key={sub.key}>
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
              <Typography variant="h6" sx={{ fontFamily: "JUST Sans ExBold" }}>{sub.plan}</Typography>
              <Typography sx={{ fontFamily: "JUST Sans Regular" }}>
                Status: <Chip label={sub.status} color={sub.status === "paid" ? "success" : "error"} />
              </Typography>
              <Typography sx={{ fontFamily: "JUST Sans Regular" }}>Ended: {sub.ended}</Typography>
              <Typography sx={{ fontFamily: "JUST Sans Regular" }}>Amount: {sub.price}</Typography>
              <Typography sx={{ fontFamily: "JUST Sans Regular" }}>Order ID: {sub.orderId}</Typography>
            </Paper>
          </Grid>
        ))}
        {pastSubs.length === 0 && (
          <Grid size={{ xs: 12 }}>
            <Typography sx={{ color: theme.palette.text.secondary, fontFamily: "JUST Sans Regular" }}>
              No completed installment records yet.
            </Typography>
          </Grid>
        )}
      </Grid>
    </UserDashboardLayout>
  );
};

export default UserSubscriptions;
