import {
  Box,
  Container,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  Paper,
  Button,
  Select,
  MenuItem,
  Divider,
  Chip,
} from "@mui/material";
import TopNav from "../navigation/TopNav";
import Footer from "../navigation/Footer";
import { useState, useEffect } from "react";
import { useCart } from "../contexts/CartContext";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemeContext";
import { initiateCheckout } from "../services/orderService";
import { toast } from "material-react-toastify";
import { getMyReferral } from "../services/referralService";

// 🧮 Helper
function scheduleInstallments(total: number, months: number) {
  const per = Math.round(total / months);
  const schedule = [] as { monthOffset: number; amount: number }[];
  for (let i = 0; i < months; i++) schedule.push({ monthOffset: i + 1, amount: per });
  return schedule;
}

const Checkout = () => {
  const [provider, setProvider] = useState<"paystack" | "flutterwave">("flutterwave");
  const [installment, setInstallment] = useState("full");
  const [loading, setLoading] = useState(false);
  const [walletBalance, setWalletBalance] = useState(0);
  const [useWallet, setUseWallet] = useState(false);
  const { items } = useCart();
  const { user } = useAuth();
  const { theme, mode } = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;
    getMyReferral()
      .then((d) => {
        const balance = Number(d.referralBonus || 0);
        setWalletBalance(balance);
        if (balance > 0) setUseWallet(true); // auto-apply if balance exists
      })
      .catch(() => {});
  }, [user]);

  const rawTotal = items.reduce((s, i) => s + i.price * i.quantity, 0);
  const walletDiscount = useWallet ? Math.min(walletBalance, rawTotal) : 0;
  const total = rawTotal - walletDiscount;
  const months =
    installment === "2" ? 2 : installment === "4" ? 4 : installment === "6" ? 6 : 1;
  const schedule = scheduleInstallments(total, months);

  const handleConfirmAndPay = async () => {
    if (!items.length) {
      toast.error("Your cart is empty.");
      return;
    }
    if (!user) {
      toast.info("Please sign in to continue checkout.");
      navigate("/login", { state: { redirectTo: "/checkout" } });
      return;
    }

    setLoading(true);
    try {
      const data = await initiateCheckout({
        shippingAddressId: null,
        providerPreference: provider,
        planOption: installment,
        currency: "NGN",
        useWalletBonus: useWallet && walletBalance > 0,
      });

      if (!data.authorization_url) {
        toast.error("Unable to start payment. Please try again.");
        return;
      }

      localStorage.setItem("echi_last_order_id", String(data.orderId));
      toast.success("Redirecting to payment...");
      window.location.href = data.authorization_url;
    } catch (err: any) {
      toast.error(err?.response?.data?.error || "Checkout failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        bgcolor: theme.palette.background.default,
        color: theme.palette.text.primary,
        minHeight: "100vh",
        background: mode === 'dark' 
          ? "linear-gradient(145deg, #0B0C10 0%, #1F2833 100%)"
          : "linear-gradient(145deg, #f8f9fa 0%, #ffffff 100%)",
      }}
    >
      <TopNav />

      <Container sx={{ py: 6 }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: "700",
            mb: 4,
            color: theme.palette.primary.main,
            textShadow: `0 0 12px ${theme.palette.primary.main}30`,
            fontFamily: "JUST Sans ExBold",
          }}
        >
          Checkout
        </Typography>

        {/* Referral Wallet */}
        {walletBalance > 0 && (
          <Paper
            sx={{
              p: 3, mb: 3, borderRadius: 3,
              bgcolor: theme.palette.background.paper,
              border: `1px solid ${theme.palette.divider}`,
              boxShadow: mode === "dark" ? "0 0 20px rgba(0,0,0,0.4)" : "0 0 20px rgba(0,0,0,0.1)",
            }}
          >
            <Typography variant="h6" sx={{ color: theme.palette.primary.main, mb: 1, fontFamily: "JUST Sans ExBold" }}>
              Referral Wallet
            </Typography>
            <Typography sx={{ fontFamily: "JUST Sans Regular", color: theme.palette.text.secondary, mb: 1.5, fontSize: "0.9rem" }}>
              You have <strong>₦{walletBalance.toLocaleString()}</strong> in referral bonus credit.
            </Typography>
            <Chip
              label={useWallet ? `✓ Applying ₦${walletDiscount.toLocaleString()} discount — click to remove` : `Apply ₦${walletBalance.toLocaleString()} Referral Bonus`}
              onClick={() => setUseWallet((v) => !v)}
              color={useWallet ? "success" : "default"}
              sx={{ fontFamily: "JUST Sans ExBold", cursor: "pointer" }}
            />
          </Paper>
        )}

        {/* 💳 Payment Provider */}
        <Paper
          sx={{
            p: 3,
            mb: 3,
            borderRadius: 3,
            bgcolor: theme.palette.background.paper,
            border: `1px solid ${theme.palette.divider}`,
            boxShadow: mode === 'dark' ? "0 0 20px rgba(0,0,0,0.4)" : "0 0 20px rgba(0,0,0,0.1)",
          }}
        >
          <Typography variant="h6" sx={{ color: theme.palette.primary.main, mb: 2, fontFamily: "JUST Sans ExBold" }}>
            Payment Provider
          </Typography>
          <RadioGroup
            value={provider}
            onChange={(e) => setProvider(e.target.value as "paystack" | "flutterwave")}
            sx={{ color: theme.palette.text.primary }}
          >
            {/* <FormControlLabel
              value="paystack"
              control={<Radio sx={{ color: theme.palette.primary.main }} />}
              label={<span style={{ fontFamily: "JUST Sans Regular" }}>Paystack (NG)</span>}
            /> */}
            <FormControlLabel
              value="flutterwave"
              control={<Radio sx={{ color: theme.palette.primary.main }} />}
              label={<span style={{ fontFamily: "JUST Sans Regular" }}>Flutterwave (NG + International)</span>}
            />
          </RadioGroup>
        </Paper>

        {/* 🧾 Installment Options */}
        <Paper
          sx={{
            p: 3,
            mb: 3,
            borderRadius: 3,
            bgcolor: "#1F2833",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow: "0 0 20px rgba(0,0,0,0.4)",
          }}
        >
          <Typography variant="h6" sx={{ color: "#FFAB46", mb: 2, fontFamily: "JUST Sans ExBold" }}>
            Installment Options
          </Typography>

          <Select
            value={installment}
            onChange={(e) => setInstallment(e.target.value)}
            sx={{
              mt: 1,
              bgcolor: "#0B0C10",
              color: "#fff",
              borderRadius: 2,
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "rgba(255,255,255,0.2)",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "#FFAB46",
              },
            }}
          >
            <MenuItem value="full">Pay in full</MenuItem>
            <MenuItem value="2">2 installments (2 months)</MenuItem>
            <MenuItem value="4">4 installments (4 months)</MenuItem>
            <MenuItem value="6">6 installments (6 months)</MenuItem>
          </Select>

          {installment !== "full" && (
            <Box sx={{ mt: 3 }}>
              <Divider sx={{ mb: 2, borderColor: "rgba(255,255,255,0.1)" }} />
              <Typography variant="subtitle1" sx={{ color: "#C79B3B", mb: 1, fontFamily: "JUST Sans ExBold" }}>
                Payment Schedule
              </Typography>
              {schedule.map((s) => (
                <Typography
                  key={s.monthOffset}
                  sx={{ color: "rgba(255,255,255,0.7)", mb: 0.5, fontFamily: "JUST Sans Regular" }}
                >
                  Month {s.monthOffset}: NGN {s.amount.toLocaleString()}
                </Typography>
              ))}
            </Box>
          )}
        </Paper>

        {/* 🧮 Total Summary */}
        <Box
          sx={{
            mt: 3,
            p: 3,
            borderRadius: 2,
            bgcolor: theme.palette.background.paper,
            border: `1px solid ${theme.palette.divider}`,
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: walletDiscount > 0 ? 1 : 0 }}>
            <Typography sx={{ color: theme.palette.text.secondary, fontFamily: "JUST Sans Regular" }}>Subtotal</Typography>
            <Typography sx={{ color: theme.palette.text.primary, fontFamily: "JUST Sans ExBold" }}>₦{rawTotal.toLocaleString()}</Typography>
          </Box>

          {walletDiscount > 0 && (
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
              <Typography sx={{ color: "#4caf50", fontFamily: "JUST Sans Regular" }}>Referral Wallet Discount</Typography>
              <Typography sx={{ color: "#4caf50", fontFamily: "JUST Sans ExBold" }}>− ₦{walletDiscount.toLocaleString()}</Typography>
            </Box>
          )}

          <Divider sx={{ my: 1.5, borderColor: theme.palette.divider }} />

          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h6" sx={{ color: theme.palette.text.primary, fontFamily: "JUST Sans ExBold" }}>Total to Pay</Typography>
            <Typography variant="h6" sx={{ color: theme.palette.primary.main, fontFamily: "JUST Sans ExBold" }}>₦{total.toLocaleString()}</Typography>
          </Box>

          {installment !== "full" && (
            <Typography sx={{ mt: 1, color: theme.palette.text.secondary, fontFamily: "JUST Sans Regular", fontSize: "0.82rem", textAlign: "right" }}>
              First payment: ₦{schedule[0]?.amount.toLocaleString()} today
            </Typography>
          )}
        </Box>

        <Box sx={{ mt: 3 }}>
          <Button
            variant="contained"
            onClick={handleConfirmAndPay}
            disabled={loading}
            sx={{
              bgcolor: "#FFAB46",
              color: "#000",
              fontWeight: "600",
              fontFamily: "JUST Sans ExBold",
              borderRadius: 2,
              px: 4,
              py: 1.2,
              boxShadow: "0 0 15px rgba(255,171,70,0.3)",
              "&:hover": {
                bgcolor: "#e9b362",
                boxShadow: "0 0 25px rgba(255,171,70,0.5)",
              },
            }}
          >
            {loading ? "Processing..." : `Confirm & Pay ₦${total.toLocaleString()}`}
          </Button>
        </Box>
      </Container>

      <Footer />
    </Box>
  );
};

export default Checkout;
