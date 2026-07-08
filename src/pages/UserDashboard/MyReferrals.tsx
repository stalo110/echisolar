import {
  Box, Typography, Paper, Grid, Chip, Divider, Button,
  CircularProgress, Snackbar, Alert,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import UserDashboardLayout from "../../components/User/UserDashboardLayout";
import { useTheme } from "../../contexts/ThemeContext";
import { useEffect, useState } from "react";
import { getMyReferral, type MyReferralData } from "../../services/referralService";

const formatDate = (v?: string | null) => {
  if (!v) return "—";
  const d = new Date(v);
  return Number.isNaN(d.getTime()) ? v : d.toLocaleDateString();
};

const MyReferrals = () => {
  const { theme, mode } = useTheme();
  const [data, setData] = useState<MyReferralData | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    getMyReferral()
      .then(setData)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text).then(() => setCopied(true));
  };

  return (
    <UserDashboardLayout>
      <Typography variant="h4" sx={{ fontWeight: "700", color: theme.palette.primary.main, mb: 4, fontFamily: "JUST Sans ExBold" }}>
        My Referrals
      </Typography>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
          <CircularProgress />
        </Box>
      ) : !data ? (
        <Typography sx={{ fontFamily: "JUST Sans Regular", color: theme.palette.text.secondary }}>
          Unable to load referral data. Please try again later.
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {/* Wallet & Code */}
          <Grid size={{ xs: 12, md: 5 }}>
            <Paper sx={{
              p: 3, borderRadius: 3, height: "100%",
              background: theme.palette.background.paper,
              border: `1px solid ${theme.palette.divider}`,
              boxShadow: mode === "dark" ? "0 4px 20px rgba(0,0,0,0.4)" : "0 4px 20px rgba(0,0,0,0.1)",
            }}>
              <Typography variant="h6" sx={{ fontFamily: "JUST Sans ExBold", color: theme.palette.primary.main, mb: 2 }}>
                Your Referral Wallet
              </Typography>

              {/* Balance */}
              <Box sx={{
                p: 2.5, borderRadius: 2, mb: 3,
                background: mode === "dark" ? "rgba(255,171,70,0.08)" : "rgba(255,171,70,0.12)",
                border: `1px solid ${theme.palette.primary.main}40`,
                textAlign: "center",
              }}>
                <Typography sx={{ fontFamily: "JUST Sans Regular", color: theme.palette.text.secondary, fontSize: "0.85rem", mb: 0.5 }}>
                  Available Balance
                </Typography>
                <Typography variant="h3" sx={{ fontFamily: "JUST Sans ExBold", color: theme.palette.primary.main }}>
                  ₦{Number(data.referralBonus).toLocaleString()}
                </Typography>
                <Typography sx={{ fontFamily: "JUST Sans Regular", color: theme.palette.text.secondary, fontSize: "0.78rem", mt: 0.5 }}>
                  Automatically deducted at checkout
                </Typography>
              </Box>

              <Typography sx={{ fontFamily: "JUST Sans Regular", color: theme.palette.text.secondary, fontSize: "0.85rem", mb: 1.5 }}>
                Earn <strong>{data.bonusPercent}%</strong> of every referred user's first order. Share your code or link below.
              </Typography>

              <Divider sx={{ my: 2, borderColor: theme.palette.divider }} />

              {/* Code */}
              <Typography sx={{ fontFamily: "JUST Sans ExBold", fontSize: "0.85rem", mb: 0.8, color: theme.palette.text.secondary }}>
                YOUR REFERRAL CODE
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                <Box sx={{
                  px: 2.5, py: 1.2, borderRadius: 2, fontFamily: "monospace", fontWeight: "bold",
                  fontSize: "1.3rem", letterSpacing: 4,
                  bgcolor: mode === "dark" ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)",
                  color: theme.palette.text.primary, flexGrow: 1, textAlign: "center",
                }}>
                  {data.referralCode}
                </Box>
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<ContentCopyIcon />}
                  onClick={() => handleCopy(data.referralCode)}
                  sx={{ fontFamily: "JUST Sans ExBold", borderColor: theme.palette.primary.main, color: theme.palette.primary.main, whiteSpace: "nowrap" }}
                >
                  Copy
                </Button>
              </Box>

              {/* Link */}
              <Typography sx={{ fontFamily: "JUST Sans ExBold", fontSize: "0.85rem", mb: 0.8, color: theme.palette.text.secondary }}>
                REFERRAL LINK
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Typography sx={{
                  fontFamily: "JUST Sans Regular", fontSize: "0.8rem",
                  color: theme.palette.text.secondary, wordBreak: "break-all", flexGrow: 1,
                  p: 1, borderRadius: 1,
                  bgcolor: mode === "dark" ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)",
                }}>
                  {data.referralLink}
                </Typography>
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<ContentCopyIcon />}
                  onClick={() => handleCopy(data.referralLink)}
                  sx={{ fontFamily: "JUST Sans ExBold", borderColor: theme.palette.primary.main, color: theme.palette.primary.main, whiteSpace: "nowrap" }}
                >
                  Copy
                </Button>
              </Box>
            </Paper>
          </Grid>

          {/* Referral History */}
          <Grid size={{ xs: 12, md: 7 }}>
            <Paper sx={{
              p: 3, borderRadius: 3,
              background: theme.palette.background.paper,
              border: `1px solid ${theme.palette.divider}`,
              boxShadow: mode === "dark" ? "0 4px 20px rgba(0,0,0,0.4)" : "0 4px 20px rgba(0,0,0,0.1)",
            }}>
              <Typography variant="h6" sx={{ fontFamily: "JUST Sans ExBold", color: theme.palette.primary.main, mb: 2 }}>
                People You've Referred ({data.referrals.length})
              </Typography>

              {data.referrals.length === 0 ? (
                <Box sx={{ textAlign: "center", py: 5 }}>
                  <Typography sx={{ fontFamily: "JUST Sans Regular", color: theme.palette.text.secondary, mb: 1 }}>
                    No referrals yet.
                  </Typography>
                  <Typography sx={{ fontFamily: "JUST Sans Regular", color: theme.palette.text.secondary, fontSize: "0.85rem" }}>
                    Share your code or link to start earning bonus credits.
                  </Typography>
                </Box>
              ) : (
                <>
                  {/* Table Header */}
                  <Box sx={{ display: "grid", gridTemplateColumns: "1fr 100px 90px 90px", gap: 1, pb: 1, borderBottom: `1px solid ${theme.palette.divider}` }}>
                    {["Referee", "Bonus", "Status", "Referred On"].map((h) => (
                      <Typography key={h} sx={{ fontFamily: "JUST Sans ExBold", fontSize: "0.78rem", color: theme.palette.text.secondary }}>
                        {h}
                      </Typography>
                    ))}
                  </Box>

                  {data.referrals.map((r) => (
                    <Box
                      key={r.id}
                      sx={{
                        display: "grid", gridTemplateColumns: "1fr 100px 90px 90px",
                        gap: 1, py: 1.5, alignItems: "center",
                        borderBottom: `1px solid ${theme.palette.divider}`,
                        "&:last-child": { borderBottom: "none" },
                      }}
                    >
                      <Box>
                        <Typography sx={{ fontFamily: "JUST Sans ExBold", fontSize: "0.9rem", color: theme.palette.text.primary }}>
                          {r.refereeName}
                        </Typography>
                        {r.creditedAt && (
                          <Typography sx={{ fontFamily: "JUST Sans Regular", fontSize: "0.75rem", color: theme.palette.text.secondary }}>
                            Credited {formatDate(r.creditedAt)}
                          </Typography>
                        )}
                      </Box>
                      <Typography sx={{
                        fontFamily: "JUST Sans ExBold", fontSize: "0.9rem",
                        color: r.bonusAmount > 0 ? "#4caf50" : theme.palette.text.secondary,
                      }}>
                        {r.bonusAmount > 0 ? `+₦${Number(r.bonusAmount).toLocaleString()}` : "—"}
                      </Typography>
                      <Chip
                        label={r.status === "credited" ? "Credited" : "Pending"}
                        size="small"
                        sx={{
                          fontFamily: "JUST Sans Regular", fontSize: "0.72rem",
                          bgcolor: r.status === "credited" ? "#4caf50" : "#ff9800",
                          color: "#fff", width: "fit-content",
                        }}
                      />
                      <Typography sx={{ fontFamily: "JUST Sans Regular", fontSize: "0.82rem", color: theme.palette.text.secondary }}>
                        {formatDate(r.createdAt)}
                      </Typography>
                    </Box>
                  ))}

                  {/* Summary */}
                  <Box sx={{
                    mt: 2, pt: 2, borderTop: `1px solid ${theme.palette.divider}`,
                    display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 1,
                  }}>
                    <Typography sx={{ fontFamily: "JUST Sans Regular", color: theme.palette.text.secondary, fontSize: "0.85rem" }}>
                      {data.referrals.filter(r => r.status === "credited").length} credited ·{" "}
                      {data.referrals.filter(r => r.status === "pending").length} pending
                    </Typography>
                    <Typography sx={{ fontFamily: "JUST Sans ExBold", color: "#4caf50", fontSize: "0.9rem" }}>
                      Total earned: ₦{data.referrals.reduce((s, r) => s + Number(r.bonusAmount || 0), 0).toLocaleString()}
                    </Typography>
                  </Box>
                </>
              )}
            </Paper>
          </Grid>
        </Grid>
      )}

      <Snackbar open={copied} autoHideDuration={2000} onClose={() => setCopied(false)} anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
        <Alert severity="success" sx={{ width: "100%" }}>Copied to clipboard!</Alert>
      </Snackbar>
    </UserDashboardLayout>
  );
};

export default MyReferrals;
