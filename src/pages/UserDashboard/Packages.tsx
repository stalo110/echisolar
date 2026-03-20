import { Box, Button, Chip, Grid, Paper, Typography } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import UserDashboardLayout from "../../components/User/UserDashboardLayout";
import { useTheme } from "../../contexts/ThemeContext";
import {
  fetchMyPackageEnrollments,
  type PackageEnrollment,
} from "../../services/packageService";
import { buildWhatsAppMessageUrl } from "../../config/company";

const formatDate = (value?: string | null) => {
  if (!value) return "N/A";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : date.toLocaleDateString();
};

const statusMeta: Record<PackageEnrollment["status"], { label: string; color: "success" | "warning" | "info" }> = {
  paid: { label: "Paid", color: "success" },
  pending_payment: { label: "Pending Payment", color: "warning" },
  opted_in: { label: "Opted In", color: "info" },
};

const UserPackages = () => {
  const { theme, mode } = useTheme();
  const [packages, setPackages] = useState<PackageEnrollment[]>([]);

  useEffect(() => {
    fetchMyPackageEnrollments()
      .then((data) => setPackages(data))
      .catch(() => setPackages([]));
  }, []);

  const grouped = useMemo(() => {
    const paid = packages.filter((pkg) => pkg.status === "paid");
    const pending = packages.filter((pkg) => pkg.status === "pending_payment");
    const opted = packages.filter((pkg) => pkg.status === "opted_in");
    return { paid, pending, opted };
  }, [packages]);

  const renderCard = (pkg: PackageEnrollment) => {
    const meta = statusMeta[pkg.status];
    const whatsappMessage = `Hello Echisolar, I want an update on my ${pkg.name} package request.`;
    const whatsappLink = pkg.whatsappLink || buildWhatsAppMessageUrl(whatsappMessage);

    return (
      <Grid size={{ xs: 12, md: 6 }} key={pkg.id}>
        <Paper
          sx={{
            p: 3,
            background: theme.palette.background.paper,
            border: `1px solid ${theme.palette.divider}`,
            color: theme.palette.text.primary,
            borderRadius: 3,
            boxShadow: mode === "dark" ? "0 4px 20px rgba(0,0,0,0.4)" : "0 4px 20px rgba(0,0,0,0.1)",
          }}
        >
          <Box sx={{ display: "flex", gap: 2, alignItems: "center", mb: 2 }}>
            <Box
              component="img"
              src={pkg.images[0] || "/images/solar.jpg"}
              alt={pkg.name}
              sx={{ width: 76, height: 76, borderRadius: 2, objectFit: "cover" }}
            />
            <Box>
              <Typography variant="h6" sx={{ fontFamily: "JUST Sans ExBold" }}>
                {pkg.name}
              </Typography>
              <Chip label={meta.label} color={meta.color} size="small" />
            </Box>
          </Box>

          <Typography sx={{ color: theme.palette.text.secondary, mb: 1, fontFamily: "JUST Sans Regular" }}>
            {pkg.description || "No package description available."}
          </Typography>

          <Typography sx={{ fontFamily: "JUST Sans Regular" }}>
            Order ID: {pkg.orderId ? `#${pkg.orderId}` : "Not yet created"}
          </Typography>
          <Typography sx={{ fontFamily: "JUST Sans Regular" }}>
            Price: {pkg.selectedPrice !== null ? `₦${pkg.selectedPrice.toLocaleString()}` : pkg.packagePrice !== null ? `₦${pkg.packagePrice.toLocaleString()}` : "Custom quote"}
          </Typography>
          <Typography sx={{ fontFamily: "JUST Sans Regular" }}>
            Updated: {formatDate(pkg.updatedAt)}
          </Typography>

          {(pkg.status === "opted_in" || pkg.status === "pending_payment") && (
            <Button
              component="a"
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              variant="outlined"
              sx={{ mt: 2, textTransform: "none", fontFamily: "JUST Sans ExBold" }}
            >
              Chat on WhatsApp
            </Button>
          )}
        </Paper>
      </Grid>
    );
  };

  return (
    <UserDashboardLayout>
      <Typography
        variant="h4"
        sx={{ fontWeight: "700", color: theme.palette.primary.main, mb: 4, fontFamily: "JUST Sans ExBold" }}
      >
        My Packages
      </Typography>

      <Typography variant="h6" sx={{ mb: 2, fontFamily: "JUST Sans ExBold" }}>
        Active Packages
      </Typography>
      <Grid container spacing={3}>
        {[...grouped.pending, ...grouped.opted].map(renderCard)}
        {grouped.pending.length + grouped.opted.length === 0 && (
          <Grid size={{ xs: 12 }}>
            <Typography sx={{ color: theme.palette.text.secondary, fontFamily: "JUST Sans Regular" }}>
              No active package requests at the moment.
            </Typography>
          </Grid>
        )}
      </Grid>

      <Typography variant="h6" sx={{ mt: 5, mb: 2, fontFamily: "JUST Sans ExBold" }}>
        Paid Packages
      </Typography>
      <Grid container spacing={3}>
        {grouped.paid.map(renderCard)}
        {grouped.paid.length === 0 && (
          <Grid size={{ xs: 12 }}>
            <Typography sx={{ color: theme.palette.text.secondary, fontFamily: "JUST Sans Regular" }}>
              No paid packages yet.
            </Typography>
          </Grid>
        )}
      </Grid>
    </UserDashboardLayout>
  );
};

export default UserPackages;
