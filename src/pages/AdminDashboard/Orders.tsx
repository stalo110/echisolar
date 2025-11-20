import {
  Box,
  Typography,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import AdminLayout from "../../components/Admin/AdminLayout";
import { useTheme } from "../../contexts/ThemeContext";

const orders = [
  { id: "ORD123", customer: "John Doe", total: 195000, status: "Delivered" },
  { id: "ORD124", customer: "Jane Smith", total: 87000, status: "Pending" },
  { id: "ORD125", customer: "David King", total: 45000, status: "Processing" },
  { id: "ORD126", customer: "Mary Johnson", total: 122000, status: "Delivered" },
];

const AdminOrders = () => {
  const { theme, mode } = useTheme();
  const hasOrders = orders.length > 0;

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
                  <TableCell sx={{ color: theme.palette.primary.main, fontFamily: "JUST Sans ExBold" }}>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map((o) => (
                  <TableRow
                    key={o.id}
                    sx={{
                      "&:hover": {
                        background: mode === 'dark' ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)",
                        transition: "0.3s",
                      },
                    }}
                  >
                    <TableCell sx={{ color: theme.palette.text.primary, fontFamily: "JUST Sans Regular" }}>{o.id}</TableCell>
                    <TableCell sx={{ color: theme.palette.text.primary, fontFamily: "JUST Sans Regular" }}>{o.customer}</TableCell>
                    <TableCell sx={{ color: theme.palette.text.primary, fontFamily: "JUST Sans Regular" }}>
                      ₦{o.total.toLocaleString()}
                    </TableCell>
                    <TableCell
                      sx={{
                        color:
                          o.status === "Delivered"
                            ? theme.palette.secondary.main
                            : o.status === "Pending"
                            ? theme.palette.primary.main
                            : theme.palette.text.secondary,
                        fontWeight: "bold",
                        fontFamily: "JUST Sans ExBold",
                      }}
                    >
                      {o.status}
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
              No new orders yet.
            </Typography>
          </Box>
        )}
      </Box>
    </AdminLayout>
  );
};

export default AdminOrders;