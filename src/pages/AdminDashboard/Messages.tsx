import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Paper,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
  useMediaQuery,
  useTheme as useMuiTheme,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { toast } from "material-react-toastify";
import AdminLayout from "../../components/Admin/AdminLayout";
import { useTheme } from "../../contexts/ThemeContext";
import {
  fetchAdminMessageById,
  fetchAdminMessages,
  replyToAdminMessage,
  type AdminMessageRow,
  type AdminMessageStatus,
  type PaginationMeta,
  updateAdminMessageStatus,
} from "../../services/adminService";

const formatDateTime = (value?: string | null) => {
  if (!value) return "N/A";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? String(value) : date.toLocaleString();
};

const AdminMessages = () => {
  const { theme, mode } = useTheme();
  const muiTheme = useMuiTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down("sm"));
  const adminHeadingColor = mode === "dark" ? theme.palette.text.primary : theme.palette.primary.main;
  const adminSupportTextColor = mode === "dark" ? theme.palette.text.primary : theme.palette.text.secondary;
  const [messages, setMessages] = useState<AdminMessageRow[]>([]);
  const [pagination, setPagination] = useState<PaginationMeta>({
    page: 1,
    limit: 20,
    total: 0,
    totalPages: 1,
  });
  const [statusFilter, setStatusFilter] = useState<"all" | AdminMessageStatus>("all");
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [selected, setSelected] = useState<AdminMessageRow | null>(null);
  const [replyOpen, setReplyOpen] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [replying, setReplying] = useState(false);

  const hasMessages = messages.length > 0;
  const statusParam = useMemo(() => (statusFilter === "all" ? undefined : statusFilter), [statusFilter]);

  const loadMessages = () => {
    setLoading(true);
    fetchAdminMessages(pagination.page, pagination.limit, statusParam, searchQuery || undefined)
      .then((response) => {
        setMessages(response.data || []);
        setPagination(response.pagination || pagination);
        setError("");
      })
      .catch(() => {
        setError("Unable to fetch messages.");
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadMessages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination.page, pagination.limit, statusParam, searchQuery]);

  const applySearch = () => {
    setSearchQuery(searchInput.trim());
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  const clearSearch = () => {
    setSearchInput("");
    setSearchQuery("");
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  const handleOpenReply = async (row: AdminMessageRow) => {
    setReplyOpen(true);
    setReplyText(row.adminReply || "");
    setSelected(row);
    try {
      const detail = await fetchAdminMessageById(row.id);
      setSelected(detail.data);
      setReplyText(detail.data.adminReply || "");
    } catch {
      // keep existing row data
    }
  };

  const handleReplySubmit = async () => {
    if (!selected) return;
    if (!replyText.trim()) {
      toast.error("Reply cannot be empty.");
      return;
    }
    setReplying(true);
    try {
      await replyToAdminMessage(selected.id, replyText.trim());
      toast.success("Reply sent successfully.");
      setReplyOpen(false);
      setReplyText("");
      setSelected(null);
      loadMessages();
    } catch (err: any) {
      toast.error(err?.response?.data?.error || "Unable to send reply.");
    } finally {
      setReplying(false);
    }
  };

  const toggleStatus = async (row: AdminMessageRow) => {
    const nextStatus: AdminMessageStatus = row.status === "read" ? "unread" : "read";
    try {
      await updateAdminMessageStatus(row.id, nextStatus);
      toast.success(`Message marked as ${nextStatus}.`);
      loadMessages();
    } catch (err: any) {
      toast.error(err?.response?.data?.error || "Unable to update message status.");
    }
  };

  return (
    <AdminLayout>
      <Box sx={{ p: { xs: 2, sm: 3 }, bgcolor: theme.palette.background.default, color: theme.palette.text.primary, minHeight: "100vh" }}>
        <Box sx={{ mb: 2, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 2, flexWrap: "wrap" }}>
          <Typography variant="h5" sx={{ color: adminHeadingColor, fontFamily: "JUST Sans ExBold" }}>
            Messages
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexWrap: "wrap" }}>
            <TextField
              size="small"
              label="Search sender name"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") applySearch();
              }}
              sx={{ minWidth: { xs: "100%", sm: 240 } }}
            />
            <Button variant="contained" onClick={applySearch} sx={{ fontFamily: "JUST Sans ExBold", textTransform: "none" }}>
              Search
            </Button>
            <Button variant="outlined" onClick={clearSearch} sx={{ fontFamily: "JUST Sans ExBold", textTransform: "none" }}>
              Clear
            </Button>
            <Select
              size="small"
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value as "all" | AdminMessageStatus);
                setPagination((prev) => ({ ...prev, page: 1 }));
              }}
              sx={{ minWidth: 160, fontFamily: "JUST Sans Regular" }}
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="unread">Unread</MenuItem>
              <MenuItem value="read">Read</MenuItem>
            </Select>
          </Box>
        </Box>

        {error && <Typography sx={{ color: "#d9534f", mb: 2, fontFamily: "JUST Sans Regular" }}>{error}</Typography>}

        {hasMessages ? (
          isMobile ? (
            <Stack spacing={2}>
              {messages.map((row) => (
                <Paper key={row.id} sx={{ p: 2, borderRadius: 2, border: `1px solid ${theme.palette.divider}`, bgcolor: theme.palette.background.paper }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 0.5 }}>
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Typography sx={{ fontFamily: "JUST Sans ExBold", fontSize: "0.9rem", color: theme.palette.text.primary }}>{row.name}</Typography>
                      <Typography sx={{ fontFamily: "JUST Sans Regular", fontSize: "0.78rem", color: adminSupportTextColor }} noWrap>{row.email}</Typography>
                    </Box>
                    <Chip
                      size="small"
                      label={row.status === "read" ? "Read" : "Unread"}
                      color={row.status === "read" ? "default" : "warning"}
                      sx={{ fontFamily: "JUST Sans ExBold", ml: 1, flexShrink: 0, fontSize: "0.72rem" }}
                    />
                  </Box>
                  <Typography sx={{ fontFamily: "JUST Sans ExBold", fontSize: "0.85rem", color: theme.palette.text.primary, mt: 0.5 }}>{row.subject}</Typography>
                  <Typography sx={{ fontFamily: "JUST Sans Regular", fontSize: "0.78rem", color: adminSupportTextColor, mb: 1 }}>
                    {String(row.message || "").slice(0, 100)}{String(row.message || "").length > 100 ? "..." : ""}
                  </Typography>
                  <Typography sx={{ fontFamily: "JUST Sans Regular", fontSize: "0.72rem", color: adminSupportTextColor, mb: 1 }}>{formatDateTime(row.createdAt)}</Typography>
                  <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                    <Button size="small" variant="outlined" onClick={() => handleOpenReply(row)} sx={{ fontFamily: "JUST Sans ExBold", textTransform: "none", fontSize: "0.78rem" }}>Reply</Button>
                    <Button size="small" variant="text" onClick={() => toggleStatus(row)} sx={{ fontFamily: "JUST Sans Regular", textTransform: "none", fontSize: "0.78rem" }}>Mark {row.status === "read" ? "Unread" : "Read"}</Button>
                  </Box>
                </Paper>
              ))}
            </Stack>
          ) : (
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
                  <TableCell sx={{ color: adminHeadingColor, fontFamily: "JUST Sans ExBold" }}>Sender</TableCell>
                  <TableCell sx={{ color: adminHeadingColor, fontFamily: "JUST Sans ExBold" }}>Subject</TableCell>
                  <TableCell sx={{ color: adminHeadingColor, fontFamily: "JUST Sans ExBold" }}>Received</TableCell>
                  <TableCell sx={{ color: adminHeadingColor, fontFamily: "JUST Sans ExBold" }}>Status</TableCell>
                  <TableCell sx={{ color: adminHeadingColor, fontFamily: "JUST Sans ExBold" }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {messages.map((row) => (
                  <TableRow key={row.id} sx={{ "&:hover": { background: mode === "dark" ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)" } }}>
                    <TableCell sx={{ color: theme.palette.text.primary, fontFamily: "JUST Sans Regular" }}>
                      <Typography sx={{ fontFamily: "JUST Sans ExBold", fontSize: "0.9rem" }}>{row.name}</Typography>
                      <Typography sx={{ color: adminSupportTextColor, fontFamily: "JUST Sans Regular", fontSize: "0.82rem" }}>
                        {row.email}
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ color: theme.palette.text.primary, fontFamily: "JUST Sans Regular" }}>
                      <Typography sx={{ fontFamily: "JUST Sans ExBold", fontSize: "0.9rem" }}>{row.subject}</Typography>
                      <Typography sx={{ color: adminSupportTextColor, fontFamily: "JUST Sans Regular", fontSize: "0.82rem" }}>
                        {String(row.message || "").slice(0, 80)}
                        {String(row.message || "").length > 80 ? "..." : ""}
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ color: theme.palette.text.primary, fontFamily: "JUST Sans Regular" }}>
                      {formatDateTime(row.createdAt)}
                    </TableCell>
                    <TableCell>
                      <Chip
                        size="small"
                        label={row.status === "read" ? "Read" : "Unread"}
                        color={row.status === "read" ? "default" : "warning"}
                        sx={{ fontFamily: "JUST Sans ExBold" }}
                      />
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                        <Button size="small" variant="outlined" onClick={() => handleOpenReply(row)} sx={{ fontFamily: "JUST Sans ExBold", textTransform: "none" }}>
                          Reply
                        </Button>
                        <Button size="small" variant="text" onClick={() => toggleStatus(row)} sx={{ fontFamily: "JUST Sans Regular", textTransform: "none" }}>
                          Mark {row.status === "read" ? "Unread" : "Read"}
                        </Button>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
          )
        ) : (
          <Paper
            sx={{
              p: 4,
              borderRadius: 3,
              border: `1px solid ${theme.palette.divider}`,
              background: theme.palette.background.paper,
            }}
          >
            <Typography sx={{ color: adminSupportTextColor, fontFamily: "JUST Sans Regular" }}>
              {loading ? "Loading messages..." : "No messages found."}
            </Typography>
          </Paper>
        )}

        <Box sx={{ mt: 2, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 2 }}>
          <Typography sx={{ color: adminSupportTextColor, fontFamily: "JUST Sans Regular" }}>
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
              sx={{ fontFamily: "JUST Sans ExBold" }}
            >
              Next
            </Button>
          </Box>
        </Box>
      </Box>

      <Dialog open={replyOpen} onClose={() => !replying && setReplyOpen(false)} fullWidth maxWidth="md">
        <DialogTitle sx={{ color: adminHeadingColor, fontFamily: "JUST Sans ExBold" }}>
          Reply to Message
        </DialogTitle>
        <DialogContent>
          {selected && (
            <Box sx={{ mb: 2 }}>
              <Typography sx={{ fontFamily: "JUST Sans ExBold", fontSize: "0.95rem" }}>
                {selected.name} ({selected.email})
              </Typography>
              <Typography sx={{ fontFamily: "JUST Sans Regular", color: adminSupportTextColor, mb: 1 }}>
                Subject: {selected.subject}
              </Typography>
              <Paper variant="outlined" sx={{ p: 2, borderRadius: 2, mb: 2 }}>
                <Typography sx={{ fontFamily: "JUST Sans Regular", whiteSpace: "pre-wrap" }}>
                  {selected.message}
                </Typography>
              </Paper>
            </Box>
          )}
          <TextField
            label="Reply"
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            fullWidth
            multiline
            minRows={5}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setReplyOpen(false)} disabled={replying} sx={{ fontFamily: "JUST Sans Regular", textTransform: "none" }}>
            Cancel
          </Button>
          <Button onClick={handleReplySubmit} disabled={replying} variant="contained" sx={{ fontFamily: "JUST Sans ExBold", textTransform: "none" }}>
            {replying ? "Sending..." : "Send Reply"}
          </Button>
        </DialogActions>
      </Dialog>
    </AdminLayout>
  );
};

export default AdminMessages;
