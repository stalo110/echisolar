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

const brandAmber = "#FFAB46";
const brandGreen = "#2E7D4D";

// 🧾 Dummy data (replace later with API data)
const orders = [
  { id: "ORD123", customer: "John Doe", total: 195000, status: "Delivered" },
  { id: "ORD124", customer: "Jane Smith", total: 87000, status: "Pending" },
  { id: "ORD125", customer: "David King", total: 45000, status: "Processing" },
  { id: "ORD126", customer: "Mary Johnson", total: 122000, status: "Delivered" },
];

const AdminOrders = () => {
  const hasOrders = orders.length > 0;

  return (
    <AdminLayout>
      <Box
        sx={{
          color: "#fff",
          bgcolor: "#0D0D0D",
          minHeight: "100vh",
          p: { xs: 2, sm: 3 },
        }}
      >
        <Typography
          variant="h5"
          sx={{
            color: brandAmber,
            mb: 3,
            fontWeight: "bold",
          }}
        >
          Orders
        </Typography>

        {hasOrders ? (
          <Paper
            sx={{
              background: "rgba(255,255,255,0.05)",
              borderRadius: 3,
              border: "1px solid rgba(255,255,255,0.08)",
              overflow: "hidden",
            }}
          >
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ color: brandAmber }}>Order ID</TableCell>
                  <TableCell sx={{ color: brandAmber }}>Customer</TableCell>
                  <TableCell sx={{ color: brandAmber }}>Total</TableCell>
                  <TableCell sx={{ color: brandAmber }}>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map((o) => (
                  <TableRow
                    key={o.id}
                    sx={{
                      "&:hover": {
                        background: "rgba(255,255,255,0.06)",
                        transition: "0.3s",
                      },
                    }}
                  >
                    <TableCell sx={{ color: "#fff" }}>{o.id}</TableCell>
                    <TableCell sx={{ color: "#fff" }}>{o.customer}</TableCell>
                    <TableCell sx={{ color: "#fff" }}>
                      ₦{o.total.toLocaleString()}
                    </TableCell>
                    <TableCell
                      sx={{
                        color:
                          o.status === "Delivered"
                            ? brandGreen
                            : o.status === "Pending"
                            ? brandAmber
                            : "#999",
                        fontWeight: "bold",
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
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                color: "#ccc",
                fontWeight: 400,
                fontSize: { xs: "1rem", sm: "1.25rem" },
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

