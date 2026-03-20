import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { toast } from "material-react-toastify";
import AdminLayout from "../../components/Admin/AdminLayout";
import { useTheme } from "../../contexts/ThemeContext";
import {
  deleteAdminOrder,
  fetchAdminOrders,
  type AdminOrderRow,
  type PaginationMeta,
} from "../../services/adminService";

const formatDate = (value?: string) => {
  if (!value) return "N/A";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : date.toLocaleString();
};

const AdminOrders = () => {
  const { theme, mode } = useTheme();
  const [orders, setOrders] = useState<AdminOrderRow[]>([]);
  const [pagination, setPagination] = useState<PaginationMeta>({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1,
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);
  const [deleteTarget, setDeleteTarget] = useState<AdminOrderRow | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchAdminOrders(pagination.page, pagination.limit, searchQuery || undefined)
      .then((response) => {
        setOrders(response.data);
        setPagination(response.pagination);
        setError("");
      })
      .catch(() => {
        setError("Unable to fetch orders.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [pagination.page, pagination.limit, searchQuery, refreshKey]);

  const hasOrders = orders.length > 0;

  const applySearch = () => {
    const next = searchInput.trim();
    setSearchQuery(next);
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  const clearSearch = () => {
    setSearchInput("");
    setSearchQuery("");
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  const handleDeleteOrder = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await deleteAdminOrder(deleteTarget.id);
      toast.success(`Order #${deleteTarget.id} deleted.`);
      setDeleteTarget(null);
      if (orders.length === 1 && pagination.page > 1) {
        setPagination((prev) => ({ ...prev, page: prev.page - 1 }));
      } else {
        setRefreshKey((prev) => prev + 1);
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.error || "Unable to delete order.");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <AdminLayout>
      <Box
        sx={{
          color: theme.palette.text.primary,
          bgcolor: theme.palette.background.default,
          minHeight: "100vh",
          p: { xs: 2, sm: 3 },
        }}
      >
        <Typography
          variant="h5"
          sx={{
            color: theme.palette.primary.main,
            mb: 3,
            fontWeight: "bold",
            fontFamily: "JUST Sans ExBold",
          }}
        >
          Orders
        </Typography>

        <Box
          sx={{
            display: "flex",
            gap: 1.5,
            alignItems: "center",
            flexWrap: "wrap",
            mb: 2,
          }}
        >
          <TextField
            size="small"
            label="Search order # or customer"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") applySearch();
            }}
            sx={{ minWidth: { xs: "100%", sm: 320 } }}
          />
          <Button variant="contained" onClick={applySearch} sx={{ fontFamily: "JUST Sans ExBold" }}>
            Search
          </Button>
          <Button variant="outlined" onClick={clearSearch} sx={{ fontFamily: "JUST Sans ExBold" }}>
            Clear
          </Button>
        </Box>

        {error && (
          <Typography sx={{ color: "#d9534f", mb: 2, fontFamily: "JUST Sans Regular" }}>{error}</Typography>
        )}

        {hasOrders ? (
          <Paper
            sx={{
              background: theme.palette.background.paper,
              borderRadius: 3,
              border: `1px solid ${theme.palette.divider}`,
              overflow: "hidden",
            }}
          >
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ color: theme.palette.primary.main, fontFamily: "JUST Sans ExBold" }}>Order ID</TableCell>
                  <TableCell sx={{ color: theme.palette.primary.main, fontFamily: "JUST Sans ExBold" }}>Customer</TableCell>
                  <TableCell sx={{ color: theme.palette.primary.main, fontFamily: "JUST Sans ExBold" }}>Total</TableCell>
                  <TableCell sx={{ color: theme.palette.primary.main, fontFamily: "JUST Sans ExBold" }}>Payment</TableCell>
                  <TableCell sx={{ color: theme.palette.primary.main, fontFamily: "JUST Sans ExBold" }}>Status</TableCell>
                  <TableCell sx={{ color: theme.palette.primary.main, fontFamily: "JUST Sans ExBold" }}>Date</TableCell>
                  <TableCell sx={{ color: theme.palette.primary.main, fontFamily: "JUST Sans ExBold" }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map((order) => (
                  <TableRow
                    key={order.id}
                    sx={{
                      "&:hover": {
                        background: mode === "dark" ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)",
                        transition: "0.3s",
                      },
                    }}
                  >
                    <TableCell sx={{ color: theme.palette.text.primary, fontFamily: "JUST Sans Regular" }}>
                      #{order.id}
                    </TableCell>
                    <TableCell sx={{ color: theme.palette.text.primary, fontFamily: "JUST Sans Regular" }}>
                      {order.customerName || "N/A"} ({order.customerEmail || "N/A"})
                    </TableCell>
                    <TableCell sx={{ color: theme.palette.text.primary, fontFamily: "JUST Sans Regular" }}>
                      ₦{Number(order.totalAmount || 0).toLocaleString()}
                    </TableCell>
                    <TableCell sx={{ color: theme.palette.text.primary, fontFamily: "JUST Sans Regular" }}>
                      {order.paymentStatus || "pending"}
                    </TableCell>
                    <TableCell sx={{ color: theme.palette.text.primary, fontFamily: "JUST Sans Regular" }}>
                      {order.status || "pending"}
                    </TableCell>
                    <TableCell sx={{ color: theme.palette.text.primary, fontFamily: "JUST Sans Regular" }}>
                      {formatDate(order.placedAt)}
                    </TableCell>
                    <TableCell>
                      <IconButton onClick={() => setDeleteTarget(order)} size="small" sx={{ color: "#d9534f" }}>
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        ) : (
          <Box
            sx={{
              textAlign: "center",
              mt: 10,
              p: 4,
              borderRadius: 3,
              background: theme.palette.background.paper,
              border: `1px solid ${theme.palette.divider}`,
            }}
          >
            <Typography
              variant="h6"
              sx={{
                color: theme.palette.text.secondary,
                fontWeight: 400,
                fontSize: { xs: "1rem", sm: "1.25rem" },
                fontFamily: "JUST Sans Regular",
              }}
            >
              {loading ? "Loading orders..." : "No orders found."}
            </Typography>
          </Box>
        )}

        <Box sx={{ mt: 2, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 2 }}>
          <Typography sx={{ color: theme.palette.text.secondary, fontFamily: "JUST Sans Regular" }}>
            Page {pagination.page} of {pagination.totalPages} | {pagination.total} total
          </Typography>
          <Box sx={{ display: "flex", gap: 1 }}>
            <Button
              variant="outlined"
              disabled={pagination.page <= 1}
              onClick={() => setPagination((prev) => ({ ...prev, page: prev.page - 1 }))}
              sx={{ fontFamily: "JUST Sans ExBold" }}
            >
              Previous
            </Button>
            <Button
              variant="contained"
              disabled={pagination.page >= pagination.totalPages}
              onClick={() => setPagination((prev) => ({ ...prev, page: prev.page + 1 }))}
              sx={{
                bgcolor: theme.palette.primary.main,
                color: mode === "dark" ? "#000" : "#fff",
                fontFamily: "JUST Sans ExBold",
              }}
            >
              Next
            </Button>
          </Box>
        </Box>
      </Box>

      <Dialog open={Boolean(deleteTarget)} onClose={() => !deleting && setDeleteTarget(null)}>
        <DialogTitle sx={{ fontFamily: "JUST Sans ExBold" }}>Delete Order</DialogTitle>
        <DialogContent>
          <Typography sx={{ fontFamily: "JUST Sans Regular" }}>
            Are you sure you want to permanently delete order #{deleteTarget?.id}?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteTarget(null)} disabled={deleting} sx={{ fontFamily: "JUST Sans Regular" }}>
            Cancel
          </Button>
          <Button
            onClick={handleDeleteOrder}
            disabled={deleting}
            variant="contained"
            sx={{ bgcolor: "#d9534f", color: "#fff", fontFamily: "JUST Sans ExBold" }}
          >
            {deleting ? "Deleting..." : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>
    </AdminLayout>
  );
};

export default AdminOrders;
