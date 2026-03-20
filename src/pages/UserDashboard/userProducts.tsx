import { Box, Typography, Grid, Paper, Button } from "@mui/material";
import UserDashboardLayout from "../../components/User/UserDashboardLayout";
import { useTheme } from "../../contexts/ThemeContext";
import { useEffect, useState } from "react";
import { getOrderById, getUserOrders } from "../../services/orderService";

type PurchasedProduct = {
  key: string;
  orderId: number;
  itemType: "product" | "package";
  name: string;
  unitPrice: number;
  quantity: number;
  status: string;
  image?: string;
};

const parseImages = (value: string | string[] | undefined) => {
  if (!value) return [];
  if (Array.isArray(value)) return value;
  try {
    const parsed = JSON.parse(value) as unknown;
    return Array.isArray(parsed) ? parsed.filter((item): item is string => typeof item === "string") : [];
  } catch {
    return value ? [value] : [];
  }
};

const UserProducts = () => {
  const { theme, mode } = useTheme();
  const [products, setProducts] = useState<PurchasedProduct[]>([]);

  useEffect(() => {
    getUserOrders()
      .then(async (orders) => {
        if (!orders.length) {
          setProducts([]);
          return;
        }

        const orderDetails = await Promise.all(
          orders.slice(0, 12).map((order) =>
            getOrderById(order.id)
              .then((detail) => ({ order, detail }))
              .catch(() => null)
          )
        );

        const purchased = orderDetails
          .filter((entry): entry is { order: (typeof orders)[number]; detail: Awaited<ReturnType<typeof getOrderById>> } => Boolean(entry))
          .flatMap(({ order, detail }) =>
            detail.items.map((item, index) => {
              const images = parseImages(item.images);
              return {
                key: `${order.id}-${item.productId || item.packageId || index}`,
                orderId: order.id,
                itemType: item.itemType === "package" ? ("package" as const) : ("product" as const),
                name: item.name,
                unitPrice: Number(item.unitPrice || 0),
                quantity: Number(item.quantity || 0),
                status: order.paymentStatus || order.status,
                image: images[0],
              };
            })
          );

        setProducts(purchased);
      })
      .catch(() => {
        setProducts([]);
      });
  }, []);

  return (
    <UserDashboardLayout>
      <Typography
        variant="h4"
        sx={{ fontWeight: "700", color: theme.palette.primary.main, mb: 4, fontFamily: "JUST Sans ExBold" }}
      >
        My Purchases
      </Typography>

      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={product.key}>
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
              <Box
                component="img"
                src={product.image || "/images/solar.jpg"}
                alt={product.name}
                sx={{
                  width: "100%",
                  height: 160,
                  objectFit: "cover",
                  borderRadius: 2,
                  mb: 2,
                }}
              />
              <Typography variant="h6" sx={{ fontFamily: "JUST Sans ExBold" }}>{product.name}</Typography>
              <Typography sx={{ color: theme.palette.primary.main, mb: 1, fontFamily: "JUST Sans ExBold" }}>
                ₦{product.unitPrice.toLocaleString()}
              </Typography>
              <Typography variant="body2" sx={{ color: theme.palette.text.secondary, mb: 2, fontFamily: "JUST Sans Regular" }}>
                Type: {product.itemType === "package" ? "Package" : "Product"} | Qty: {product.quantity} | Status: {product.status}
              </Typography>
              <Button
                variant="contained"
                sx={{
                  bgcolor: theme.palette.primary.main,
                  color: mode === 'dark' ? "#000" : "#fff",
                  fontWeight: "600",
                  fontFamily: "JUST Sans ExBold",
                  "&:hover": { bgcolor: theme.palette.primary.dark },
                }}
              >
                Order #{product.orderId}
              </Button>
            </Paper>
          </Grid>
        ))}
        {products.length === 0 && (
          <Grid size={{ xs: 12 }}>
            <Typography sx={{ color: theme.palette.text.secondary, fontFamily: "JUST Sans Regular" }}>
              No purchases found yet.
            </Typography>
          </Grid>
        )}
      </Grid>
    </UserDashboardLayout>
  );
};

export default UserProducts;
