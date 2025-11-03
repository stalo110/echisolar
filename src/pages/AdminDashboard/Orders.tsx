import { Box, Typography, Paper, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";

const brandAmber = "#FFAB46";
const brandGreen = "#2E7D4D";

const orders = [
  { id: "ORD123", customer: "John Doe", total: 195000, status: "Delivered" },
  { id: "ORD124", customer: "Jane Smith", total: 87000, status: "Pending" },
];

const Orders = () => (
  <Box sx={{ p: 3, bgcolor: "#0D0D0D", color: "#fff", minHeight: "100vh" }}>
    <Typography variant="h5" sx={{ color: brandAmber, mb: 3 }}>
      Orders
    </Typography>

    <Paper
      sx={{
        background: "rgba(255,255,255,0.05)",
        borderRadius: 3,
        border: "1px solid rgba(255,255,255,0.08)",
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
            <TableRow key={o.id}>
              <TableCell sx={{ color: "#fff" }}>{o.id}</TableCell>
              <TableCell sx={{ color: "#fff" }}>{o.customer}</TableCell>
              <TableCell sx={{ color: "#fff" }}>₦{o.total.toLocaleString()}</TableCell>
              <TableCell sx={{ color: o.status === "Delivered" ? brandGreen : brandAmber }}>
                {o.status}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  </Box>
);

export default Orders;
