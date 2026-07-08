import { Box, Button, Chip, CircularProgress, Divider, Paper, Snackbar, Alert, Typography } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useEffect, useState } from "react";
import { useTheme } from "../../contexts/ThemeContext";
import { getMyReferral, type MyReferralData } from "../../services/referralService";

const formatDate = (v?: string | null) => {
  if (!v) return "—";
  const d = new Date(v);
  return Number.isNaN(d.getTime()) ? v : d.toLocaleDateString();
};

const ReferralWidget = () => {
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

  if (loading) return (
    <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
      <CircularProgress size={28} />
    </Box>
  );

  if (!data) return null;

  return (
    <Paper
      sx={{
        p: 3,
        background: theme.palette.background.paper,
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: 3,
        boxShadow: mode === "dark" ? "0 4px 20px rgba(0,0,0,0.4)" : "0 4px 20px rgba(0,0,0,0.1)",
        color: theme.palette.text.primary,
      }}
    >
      <Typography variant="h6" sx={{ fontFamily: "JUST Sans ExBold", color: theme.palette.primary.main, mb: 1 }}>
        Referral Program
      </Typography>
      <Typography sx={{ fontFamily: "JUST Sans Regular", color: theme.palette.text.secondary, mb: 2, fontSize: "0.9rem" }}>
        Share your referral code. When someone signs up and completes their first payment, you earn {data.bonusPercent}% of their order as bonus credit.
      </Typography>

      {/* Wallet Balance */}
      <Box
        sx={{
          p: 2, borderRadius: 2, mb: 2,
          background: mode === "dark" ? "rgba(255,171,70,0.08)" : "rgba(255,171,70,0.12)",
          border: `1px solid ${theme.palette.primary.main}40`,
        }}
      >
        <Typography sx={{ fontFamily: "JUST Sans Regular", color: theme.palette.text.secondary, fontSize: "0.85rem" }}>
          Referral Wallet Balance
        </Typography>
        <Typography variant="h5" sx={{ fontFamily: "JUST Sans ExBold", color: theme.palette.primary.main }}>
          ₦{Number(data.referralBonus).toLocaleString()}
        </Typography>
        <Typography sx={{ fontFamily: "JUST Sans Regular", color: theme.palette.text.secondary, fontSize: "0.78rem", mt: 0.5 }}>
          Automatically applied at checkout when you have balance.
        </Typography>
      </Box>

      {/* Referral Code */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.5, flexWrap: "wrap" }}>
        <Box
          sx={{
            px: 2, py: 1, borderRadius: 2, fontFamily: "monospace", fontWeight: "bold", fontSize: "1.1rem",
            bgcolor: mode === "dark" ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)",
            letterSpacing: 3,
            color: theme.palette.text.primary,
          }}
        >
          {data.referralCode}
        </Box>
        <Button
          size="small"
          startIcon={<ContentCopyIcon fontSize="small" />}
          onClick={() => handleCopy(data.referralCode)}
          sx={{ textTransform: "none", fontFamily: "JUST Sans ExBold", color: theme.palette.primary.main }}
        >
          Copy Code
        </Button>
      </Box>

      {/* Referral Link */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2, flexWrap: "wrap" }}>
        <Typography sx={{ fontFamily: "JUST Sans Regular", fontSize: "0.8rem", color: theme.palette.text.secondary, wordBreak: "break-all" }}>
          {data.referralLink}
        </Typography>
        <Button
          size="small"
          startIcon={<ContentCopyIcon fontSize="small" />}
          onClick={() => handleCopy(data.referralLink)}
          sx={{ textTransform: "none", fontFamily: "JUST Sans ExBold", color: theme.palette.primary.main, flexShrink: 0 }}
        >
          Copy Link
        </Button>
      </Box>

      {/* Referral History */}
      {data.referrals.length > 0 && (
        <>
          <Divider sx={{ my: 2, borderColor: theme.palette.divider }} />
          <Typography sx={{ fontFamily: "JUST Sans ExBold", mb: 1.5, color: theme.palette.text.primary }}>
            Referral History
          </Typography>
          {data.referrals.map((r) => (
            <Box
              key={r.id}
              sx={{
                py: 1.2,
                borderBottom: `1px solid ${theme.palette.divider}`,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: 1,
              }}
            >
              <Box>
                <Typography sx={{ fontFamily: "JUST Sans ExBold", fontSize: "0.9rem" }}>{r.refereeName}</Typography>
                <Typography sx={{ fontFamily: "JUST Sans Regular", fontSize: "0.78rem", color: theme.palette.text.secondary }}>
                  Signed up {formatDate(r.createdAt)}
                  {r.creditedAt ? ` · Credited ${formatDate(r.creditedAt)}` : ""}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                {r.bonusAmount > 0 && (
                  <Typography sx={{ fontFamily: "JUST Sans ExBold", color: theme.palette.primary.main, fontSize: "0.9rem" }}>
                    +₦{Number(r.bonusAmount).toLocaleString()}
                  </Typography>
                )}
                <Chip
                  label={r.status === "credited" ? "Credited" : "Pending"}
                  size="small"
                  sx={{
                    fontFamily: "JUST Sans Regular",
                    bgcolor: r.status === "credited" ? "success.main" : "warning.main",
                    color: "#fff",
                    fontSize: "0.75rem",
                  }}
                />
              </Box>
            </Box>
          ))}
        </>
      )}

      <Snackbar open={copied} autoHideDuration={2000} onClose={() => setCopied(false)} anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
        <Alert severity="success" sx={{ width: "100%" }}>Copied to clipboard!</Alert>
      </Snackbar>
    </Paper>
  );
};

export default ReferralWidget;
