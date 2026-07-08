import { Box, Typography, Paper, Table, TableHead, TableRow, TableCell, TableBody, Button, Stack, Chip, useMediaQuery, useTheme as useMuiTheme } from "@mui/material";
import { useEffect, useState } from "react";
import AdminLayout from "../../components/Admin/AdminLayout";
import { useTheme } from "../../contexts/ThemeContext";
import { fetchAdminUsers, type AdminUserRow, type PaginationMeta } from "../../services/adminService";

const formatDate = (value?: string) => {
  if (!value) return "N/A";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : date.toLocaleDateString();
};

const AdminUsers = () => {
  const { theme, mode } = useTheme();
  const muiTheme = useMuiTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down("sm"));
  const adminHeadingColor = mode === "dark" ? theme.palette.text.primary : theme.palette.primary.main;
  const adminSupportTextColor = mode === "dark" ? theme.palette.text.primary : theme.palette.text.secondary;
  const [users, setUsers] = useState<AdminUserRow[]>([]);
  const [pagination, setPagination] = useState<PaginationMeta>({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1,
  });
  const [error, setError] = useState("");

  useEffect(() => {
    fetchAdminUsers(pagination.page, pagination.limit, "user")
      .then((response) => {
        setUsers(response.data);
        setPagination(response.pagination);
        setError("");
      })
      .catch(() => {
        setError("Unable to fetch users.");
      });
  }, [pagination.page, pagination.limit]);

  return (
    <AdminLayout>
      <Box sx={{ p: 3, bgcolor: theme.palette.background.default, color: theme.palette.text.primary, minHeight: "100vh" }}>
        <Typography variant="h5" sx={{ color: adminHeadingColor, mb: 3, fontFamily: "JUST Sans ExBold" }}>
          Users
        </Typography>

        {error && (
          <Typography sx={{ color: "#d9534f", mb: 2, fontFamily: "JUST Sans Regular" }}>{error}</Typography>
        )}

        {isMobile ? (
          <Stack spacing={2}>
            {users.length === 0 && (
              <Typography sx={{ fontFamily: "JUST Sans Regular", color: adminSupportTextColor }}>No users found.</Typography>
            )}
            {users.map((user) => (
              <Paper key={user.id} sx={{ p: 2, borderRadius: 2, border: `1px solid ${theme.palette.divider}`, bgcolor: theme.palette.background.paper }}>
                <Typography sx={{ fontFamily: "JUST Sans ExBold", color: theme.palette.text.primary, fontSize: "0.95rem" }}>{user.name}</Typography>
                <Typography sx={{ fontFamily: "JUST Sans Regular", color: theme.palette.text.secondary, fontSize: "0.82rem" }}>{user.email}</Typography>
                <Box sx={{ display: "flex", gap: 1, mt: 0.8, flexWrap: "wrap" }}>
                  {user.country && <Chip label={user.country} size="small" variant="outlined" sx={{ fontFamily: "JUST Sans Regular", fontSize: "0.72rem" }} />}
                  <Chip label={`Joined: ${formatDate(user.createdAt)}`} size="small" variant="outlined" sx={{ fontFamily: "JUST Sans Regular", fontSize: "0.72rem" }} />
                </Box>
              </Paper>
            ))}
          </Stack>
        ) : (
        <Paper sx={{ background: theme.palette.background.paper, borderRadius: 3, border: `1px solid ${theme.palette.divider}` }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: adminHeadingColor, fontFamily: "JUST Sans ExBold" }}>Name</TableCell>
                <TableCell sx={{ color: adminHeadingColor, fontFamily: "JUST Sans ExBold" }}>Email</TableCell>
                <TableCell sx={{ color: adminHeadingColor, fontFamily: "JUST Sans ExBold" }}>Country</TableCell>
                <TableCell sx={{ color: adminHeadingColor, fontFamily: "JUST Sans ExBold" }}>Joined</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell sx={{ color: theme.palette.text.primary, fontFamily: "JUST Sans Regular" }}>{user.name}</TableCell>
                  <TableCell sx={{ color: theme.palette.text.primary, fontFamily: "JUST Sans Regular" }}>{user.email}</TableCell>
                  <TableCell sx={{ color: theme.palette.text.primary, fontFamily: "JUST Sans Regular" }}>{user.country || "N/A"}</TableCell>
                  <TableCell sx={{ color: theme.palette.text.primary, fontFamily: "JUST Sans Regular" }}>{formatDate(user.createdAt)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {!users.length && (
            <Typography sx={{ p: 2, color: adminSupportTextColor, fontFamily: "JUST Sans Regular" }}>No users found.</Typography>
          )}
        </Paper>
        )}

        <Box sx={{ mt: 2, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 2 }}>
          <Typography sx={{ color: adminSupportTextColor, fontFamily: "JUST Sans Regular" }}>
            Page {pagination.page} of {pagination.totalPages} | {pagination.total} total users
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
    </AdminLayout>
  );
};

export default AdminUsers;
