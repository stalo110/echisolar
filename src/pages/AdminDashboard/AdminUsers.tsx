import { Box, Typography, Paper, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import AdminLayout from "../../components/Admin/AdminLayout";

const brandAmber = "#FFAB46";
const brandGreen = "#2E7D4D";

const users = [
  { id: 1, name: "John Doe", email: "john@mail.com", role: "Customer" },
  { id: 2, name: "Admin", email: "admin@shop.com", role: "Admin" },
];

const AdminUsers = () => (
  <AdminLayout>


  <Box sx={{ p: 3, bgcolor: "#0D0D0D", color: "#fff", minHeight: "100vh" }}>
    <Typography variant="h5" sx={{ color: brandAmber, mb: 3, fontFamily: "JUST Sans ExBold" }}>
      Users
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
            <TableCell sx={{ color: brandAmber, fontFamily: "JUST Sans ExBold" }}>Name</TableCell>
            <TableCell sx={{ color: brandAmber, fontFamily: "JUST Sans ExBold" }}>Email</TableCell>
            <TableCell sx={{ color: brandAmber, fontFamily: "JUST Sans ExBold" }}>Role</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((u) => (
            <TableRow key={u.id}>
              <TableCell sx={{ color: "#fff", fontFamily: "JUST Sans Regular" }}>{u.name}</TableCell>
              <TableCell sx={{ color: "#fff", fontFamily: "JUST Sans Regular" }}>{u.email}</TableCell>
              <TableCell sx={{ color: u.role === "Admin" ? brandGreen : "#fff", fontFamily: "JUST Sans ExBold" }}>
                {u.role}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  </Box>
    </AdminLayout>
);

export default AdminUsers;
