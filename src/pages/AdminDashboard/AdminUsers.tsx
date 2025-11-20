import { Box, Typography, Paper, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import AdminLayout from "../../components/Admin/AdminLayout";
import { useTheme } from "../../contexts/ThemeContext";

const users = [
  { id: 1, name: "John Doe", email: "john@mail.com", role: "Customer" },
  { id: 2, name: "Admin", email: "admin@shop.com", role: "Admin" },
];

const AdminUsers = () => {
  const { theme } = useTheme();
  
  return (
    <AdminLayout>
      <Box sx={{ p: 3, bgcolor: theme.palette.background.default, color: theme.palette.text.primary, minHeight: "100vh" }}>
        <Typography variant="h5" sx={{ color: theme.palette.primary.main, mb: 3, fontFamily: "JUST Sans ExBold" }}>
          Users
        </Typography>

        <Paper
          sx={{
            background: theme.palette.background.paper,
            borderRadius: 3,
            border: `1px solid ${theme.palette.divider}`,
          }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: theme.palette.primary.main, fontFamily: "JUST Sans ExBold" }}>Name</TableCell>
                <TableCell sx={{ color: theme.palette.primary.main, fontFamily: "JUST Sans ExBold" }}>Email</TableCell>
                <TableCell sx={{ color: theme.palette.primary.main, fontFamily: "JUST Sans ExBold" }}>Role</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((u) => (
                <TableRow key={u.id}>
                  <TableCell sx={{ color: theme.palette.text.primary, fontFamily: "JUST Sans Regular" }}>{u.name}</TableCell>
                  <TableCell sx={{ color: theme.palette.text.primary, fontFamily: "JUST Sans Regular" }}>{u.email}</TableCell>
                  <TableCell sx={{ color: u.role === "Admin" ? theme.palette.secondary.main : theme.palette.text.primary, fontFamily: "JUST Sans ExBold" }}>
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
};

export default AdminUsers;