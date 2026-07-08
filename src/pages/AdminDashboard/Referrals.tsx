import {
  Box, Typography, Paper, Table, TableHead, TableRow, TableCell,
  TableBody, Button, TextField, Snackbar, Alert, Chip, CircularProgress,
  Stack, useMediaQuery, useTheme as useMuiTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import AdminLayout from "../../components/Admin/AdminLayout";
import { useTheme } from "../../contexts/ThemeContext";
import {
  getAdminReferralSettings,
  updateAdminReferralSettings,
  getAdminReferrals,
  type AdminReferralRow,
} from "../../services/referralService";

const formatDate = (v?: string | null) => {
  if (!v) return "—";
  const d = new Date(v);
  return Number.isNaN(d.getTime()) ? v : d.toLocaleDateString();
};

const AdminReferrals = () => {
  const { theme, mode } = useTheme();
  const muiTheme = useMuiTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down("sm"));
  const headingColor = mode === "dark" ? theme.palette.text.primary : theme.palette.primary.main;
  const [bonusPercent, setBonusPercent] = useState<string>("10");
  const [saving, setSaving] = useState(false);
  const [rows, setRows] = useState<AdminReferralRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" as "success" | "error" });

  useEffect(() => {
    getAdminReferralSettings()
      .then((d) => setBonusPercent(String(d.bonusPercent)))
      .catch(() => {});
  }, []);

  useEffect(() => {
    setLoading(true);
    getAdminReferrals(page, 20)
      .then((d) => {
        setRows(d.data);
        setTotalPages(d.pagination.totalPages);
        setTotal(d.pagination.total);
      })
      .catch(() => setRows([]))
      .finally(() => setLoading(false));
  }, [page]);

  const handleSaveSettings = async () => {
    const val = parseFloat(bonusPercent);
    if (!Number.isFinite(val) || val < 0 || val > 100) {
      setSnackbar({ open: true, message: "Bonus % must be between 0 and 100.", severity: "error" });
      return;
    }
    setSaving(true);
    try {
      await updateAdminReferralSettings(val);
      setSnackbar({ open: true, message: "Referral bonus % updated.", severity: "success" });
    } catch {
      setSnackbar({ open: true, message: "Failed to update settings.", severity: "error" });
    } finally {
      setSaving(false);
    }
  };

  return (
    <AdminLayout>
      <Box sx={{ p: 3, bgcolor: theme.palette.background.default, color: theme.palette.text.primary, minHeight: "100vh" }}>
        <Typography variant="h5" sx={{ fontWeight: "bold", color: headingColor, mb: 3, fontFamily: "JUST Sans ExBold" }}>
          Referral Management
        </Typography>

        {/* Settings */}
        <Paper sx={{ p: 3, mb: 4, borderRadius: 3, border: `1px solid ${theme.palette.divider}`, bgcolor: theme.palette.background.paper }}>
          <Typography variant="h6" sx={{ fontFamily: "JUST Sans ExBold", color: headingColor, mb: 2 }}>
            Referral Bonus Settings
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, flexWrap: "wrap" }}>
            <TextField
              label="Bonus Percentage (%)"
              type="number"
              value={bonusPercent}
              onChange={(e) => setBonusPercent(e.target.value)}
              size="small"
              sx={{ width: 200, input: { color: theme.palette.text.primary } }}
              InputLabelProps={{ style: { color: theme.palette.text.secondary } }}
              inputProps={{ min: 0, max: 100, step: 0.5 }}
            />
            <Button
              variant="contained"
              onClick={handleSaveSettings}
              disabled={saving}
              sx={{ fontFamily: "JUST Sans ExBold", bgcolor: theme.palette.primary.main, color: mode === "dark" ? "#000" : "#fff" }}
            >
              {saving ? "Saving..." : "Save"}
            </Button>
          </Box>
          <Typography sx={{ mt: 1.5, fontFamily: "JUST Sans Regular", color: theme.palette.text.secondary, fontSize: "0.85rem" }}>
            This percentage is credited to the referrer's wallet when a referee completes their first paid order.
          </Typography>
        </Paper>

        {/* Referral table */}
        <Typography variant="h6" sx={{ fontFamily: "JUST Sans ExBold", color: headingColor, mb: 2 }}>
          All Referrals ({total})
        </Typography>

        {isMobile ? (
          <Stack spacing={2}>
            {loading && <Box sx={{ display: "flex", justifyContent: "center", p: 3 }}><CircularProgress size={24} /></Box>}
            {!loading && rows.length === 0 && (
              <Typography sx={{ fontFamily: "JUST Sans Regular", color: theme.palette.text.secondary }}>No referrals yet.</Typography>
            )}
            {rows.map((r) => (
              <Paper key={r.id} sx={{ p: 2, borderRadius: 2, border: `1px solid ${theme.palette.divider}`, bgcolor: theme.palette.background.paper }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 1 }}>
                  <Box>
                    <Typography sx={{ fontFamily: "JUST Sans ExBold", fontSize: "0.85rem", color: theme.palette.text.secondary }}>REFERRER</Typography>
                    <Typography sx={{ fontFamily: "JUST Sans ExBold", fontSize: "0.9rem", color: theme.palette.text.primary }}>{r.referrerName}</Typography>
                    <Typography sx={{ fontFamily: "JUST Sans Regular", fontSize: "0.75rem", color: theme.palette.text.secondary }}>{r.referrerEmail}</Typography>
                  </Box>
                  <Chip label={r.status === "credited" ? "Credited" : "Pending"} size="small" sx={{ fontFamily: "JUST Sans Regular", bgcolor: r.status === "credited" ? "#4caf50" : "#ff9800", color: "#fff", fontSize: "0.72rem" }} />
                </Box>
                <Typography sx={{ fontFamily: "JUST Sans ExBold", fontSize: "0.85rem", color: theme.palette.text.secondary }}>REFEREE</Typography>
                <Typography sx={{ fontFamily: "JUST Sans ExBold", fontSize: "0.9rem", color: theme.palette.text.primary }}>{r.refereeName}</Typography>
                <Typography sx={{ fontFamily: "JUST Sans Regular", fontSize: "0.75rem", color: theme.palette.text.secondary, mb: 1 }}>{r.refereeEmail}</Typography>
                <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                  <Chip label={r.bonusAmount > 0 ? `₦${Number(r.bonusAmount).toLocaleString()}` : "No bonus yet"} size="small" sx={{ fontFamily: "JUST Sans ExBold", bgcolor: r.bonusAmount > 0 ? theme.palette.primary.main : theme.palette.divider, color: r.bonusAmount > 0 ? (mode === "dark" ? "#000" : "#fff") : theme.palette.text.secondary, fontSize: "0.75rem" }} />
                  <Chip label={`Referred: ${formatDate(r.createdAt)}`} size="small" variant="outlined" sx={{ fontFamily: "JUST Sans Regular", fontSize: "0.72rem" }} />
                  {r.creditedAt && <Chip label={`Credited: ${formatDate(r.creditedAt)}`} size="small" variant="outlined" sx={{ fontFamily: "JUST Sans Regular", fontSize: "0.72rem" }} />}
                </Box>
              </Paper>
            ))}
          </Stack>
        ) : (
        <Paper sx={{ borderRadius: 3, border: `1px solid ${theme.palette.divider}`, bgcolor: theme.palette.background.paper }}>
          <Table>
            <TableHead>
              <TableRow>
                {["Referrer", "Referee", "Bonus", "Status", "Referred On", "Credited On"].map((h) => (
                  <TableCell key={h} sx={{ fontFamily: "JUST Sans ExBold", color: headingColor }}>{h}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((r) => (
                <TableRow key={r.id}>
                  <TableCell sx={{ fontFamily: "JUST Sans Regular", color: theme.palette.text.primary }}>
                    <Typography sx={{ fontFamily: "JUST Sans ExBold", fontSize: "0.9rem" }}>{r.referrerName}</Typography>
                    <Typography sx={{ fontFamily: "JUST Sans Regular", fontSize: "0.78rem", color: theme.palette.text.secondary }}>{r.referrerEmail}</Typography>
                  </TableCell>
                  <TableCell sx={{ fontFamily: "JUST Sans Regular", color: theme.palette.text.primary }}>
                    <Typography sx={{ fontFamily: "JUST Sans ExBold", fontSize: "0.9rem" }}>{r.refereeName}</Typography>
                    <Typography sx={{ fontFamily: "JUST Sans Regular", fontSize: "0.78rem", color: theme.palette.text.secondary }}>{r.refereeEmail}</Typography>
                  </TableCell>
                  <TableCell sx={{ fontFamily: "JUST Sans ExBold", color: theme.palette.primary.main }}>
                    {r.bonusAmount > 0 ? `₦${Number(r.bonusAmount).toLocaleString()}` : "—"}
                  </TableCell>
                  <TableCell>
                    <Chip label={r.status === "credited" ? "Credited" : "Pending"} size="small" sx={{ fontFamily: "JUST Sans Regular", bgcolor: r.status === "credited" ? "success.main" : "warning.main", color: "#fff" }} />
                  </TableCell>
                  <TableCell sx={{ fontFamily: "JUST Sans Regular", color: theme.palette.text.secondary }}>{formatDate(r.createdAt)}</TableCell>
                  <TableCell sx={{ fontFamily: "JUST Sans Regular", color: theme.palette.text.secondary }}>{formatDate(r.creditedAt)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {loading && <Box sx={{ display: "flex", justifyContent: "center", p: 3 }}><CircularProgress size={24} /></Box>}
          {!loading && !rows.length && (
            <Typography sx={{ p: 2, fontFamily: "JUST Sans Regular", color: theme.palette.text.secondary }}>No referrals yet.</Typography>
          )}
        </Paper>
        )}

        {totalPages > 1 && (
          <Box sx={{ mt: 2, display: "flex", gap: 1, justifyContent: "flex-end" }}>
            <Button variant="outlined" disabled={page <= 1} onClick={() => setPage((p) => p - 1)} sx={{ fontFamily: "JUST Sans ExBold" }}>Previous</Button>
            <Button variant="contained" disabled={page >= totalPages} onClick={() => setPage((p) => p + 1)}
              sx={{ fontFamily: "JUST Sans ExBold", bgcolor: theme.palette.primary.main, color: mode === "dark" ? "#000" : "#fff" }}>Next</Button>
          </Box>
        )}
      </Box>

      <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={() => setSnackbar((s) => ({ ...s, open: false }))} anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
        <Alert severity={snackbar.severity} sx={{ width: "100%" }}>{snackbar.message}</Alert>
      </Snackbar>
    </AdminLayout>
  );
};

export default AdminReferrals;
