import { Box, Button, Container, Paper, Typography } from "@mui/material";
import TopNav from "../navigation/TopNav";
import Footer from "../navigation/Footer";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { toast } from "material-react-toastify";
import { getOrderById, getOrderByReference } from "../services/orderService";
import { BACKEND_PUBLIC_URL } from "../config/env";
import { useAuth } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemeContext";
import { getProfile } from "../services/userService";
import { buildWhatsAppMessageUrl } from "../config/company";

const PaymentStatus = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { theme, mode } = useTheme();
  const { search, pathname } = useLocation();
  const params = useMemo(() => new URLSearchParams(search), [search]);
  const gateway = params.get("gateway");
  const callbackReference = params.get("reference") || params.get("tx_ref") || params.get("ref");
  const pathStatus = pathname.includes("/order/success")
    ? "successful"
    : pathname.includes("/order/failed")
    ? "failed"
    : null;
  const status = pathStatus || params.get("status") || params.get("result") || "pending";
  const reference = params.get("ref") || params.get("tx_ref") || params.get("reference") || params.get("transaction_id");
  const [verifiedStatus, setVerifiedStatus] = useState<string | null>(null);
  const [verifying, setVerifying] = useState(false);
  const [deliveryAddress, setDeliveryAddress] = useState<string>("");
  const orderIdParam = params.get("orderId") || localStorage.getItem("echi_last_order_id");
  const parsedOrderId = orderIdParam ? Number(orderIdParam) : NaN;
  const orderId = Number.isFinite(parsedOrderId) && parsedOrderId > 0 ? parsedOrderId : null;
  const statusTitle =
    status === "successful" || status === "paid"
      ? "Payment Successful"
      : status === "cancelled" || status === "failed"
      ? "Payment Failed"
      : "Payment Processing";
  const statusMessage =
    status === "successful" || status === "paid"
      ? "Your payment has been completed successfully."
      : status === "cancelled" || status === "failed"
      ? "Your payment was not completed. You can try again."
      : "We're confirming your payment. This may take a moment.";
  const isCompleted = ["successful", "paid", "cancelled", "failed"].includes(String(status).toLowerCase());
  const whatsappMessage = `Hello Echisolar, I just made a payment. Please deliver to my address: ${
    deliveryAddress || "[User's Address]"
  } for free delivery as promised.${reference ? ` Reference: ${reference}` : ""}`;
  const whatsappUrl = buildWhatsAppMessageUrl(whatsappMessage);
  const goToDashboard = () => {
    if (isAuthenticated) {
      navigate("/user/dashboard");
      return;
    }
    navigate("/login", { state: { redirectTo: "/user/dashboard" } });
  };

  useEffect(() => {
    if (!isAuthenticated || !isCompleted) return;
    getProfile()
      .then((profile) => {
        const address = String(profile.address || "").trim();
        if (address) setDeliveryAddress(address);
      })
      .catch(() => {
        setDeliveryAddress("");
      });
  }, [isAuthenticated, isCompleted]);

  useEffect(() => {
    if (pathname !== "/verify-payment") return;
    if (!gateway || !callbackReference) return;
    const target = `${BACKEND_PUBLIC_URL}/verify-payment?gateway=${encodeURIComponent(
      gateway
    )}&reference=${encodeURIComponent(callbackReference)}`;
    window.location.replace(target);
  }, [pathname, gateway, callbackReference]);

  useEffect(() => {
    if (!search) return;
    if (status === "successful" || status === "paid") {
      toast.success("Payment successful. Thank you!");
    } else if (status === "cancelled" || status === "failed") {
      toast.error("Payment was not completed.");
    } else {
      toast.info("Payment is processing. We'll update your order shortly.");
    }
  }, [search, status]);

  useEffect(() => {
    const ref = reference || "";
    if (!orderId && !ref) return;

    setVerifying(true);
    const lookup = orderId ? getOrderById(orderId) : getOrderByReference(ref);
    lookup
      .then((data) => {
        const serverStatus = data.order?.paymentStatus || data.order?.status || null;
        setVerifiedStatus(serverStatus);
        if (serverStatus === "paid") {
          toast.success("Payment confirmed on server.");
        } else if (serverStatus) {
          toast.info(`Server status: ${serverStatus}`);
        }
      })
      .catch(() => {
        toast.error("Unable to verify order status from server.");
      })
      .finally(() => {
        setVerifying(false);
      });
  }, [orderId, params, reference]);

  return (
    <Box>
      <TopNav />
      <Container sx={{ py: 6, minHeight: "55vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Paper
          elevation={0}
          sx={{
            width: "100%",
            maxWidth: 720,
            p: { xs: 3, md: 4 },
            borderRadius: 3,
            border: `1px solid ${theme.palette.divider}`,
            backdropFilter: "blur(8px)",
            background: theme.palette.background.paper,
            boxShadow: mode === "dark" ? "0 0 20px rgba(0,0,0,0.3)" : "0 0 20px rgba(0,0,0,0.1)",
            color: theme.palette.text.primary,
          }}
        >
          <Typography
            variant="h4"
            sx={{ fontWeight: "bold", mb: 1, fontFamily: "JUST Sans ExBold", color: theme.palette.text.primary }}
          >
            {statusTitle}
          </Typography>
          <Typography sx={{ fontFamily: "JUST Sans Regular", color: theme.palette.text.secondary, mb: 2 }}>
            {statusMessage}
          </Typography>
          {isCompleted && (
            <Box sx={{ mb: 2, display: "flex", gap: 1.5, flexWrap: "wrap" }}>
              <Button
                variant="contained"
                onClick={goToDashboard}
                sx={{ textTransform: "none", fontFamily: "JUST Sans ExBold" }}
              >
                Go to Dashboard
              </Button>
            </Box>
          )}
          <Typography sx={{ fontFamily: "JUST Sans Regular", color: theme.palette.text.secondary }}>Status: {status}</Typography>
          {verifiedStatus && (
            <Typography sx={{ fontFamily: "JUST Sans Regular", color: theme.palette.text.secondary, mt: 1 }}>
              Verified: {verifiedStatus}
            </Typography>
          )}
          {verifying && (
            <Typography sx={{ fontFamily: "JUST Sans Regular", color: theme.palette.text.secondary, mt: 1 }}>
              Verifying order status...
            </Typography>
          )}
          {pathname === "/verify-payment" && gateway && callbackReference && (
            <Typography sx={{ fontFamily: "JUST Sans Regular", color: theme.palette.text.secondary, mt: 1 }}>
              Finalizing payment with {gateway}...
            </Typography>
          )}
          {reference && (
            <Typography sx={{ fontFamily: "JUST Sans Regular", color: theme.palette.text.secondary, mt: 1 }}>
              Reference: {reference}
            </Typography>
          )}
          {deliveryAddress && (
            <Typography sx={{ fontFamily: "JUST Sans Regular", color: theme.palette.text.secondary, mt: 1 }}>
              Delivery address: {deliveryAddress}
            </Typography>
          )}
          <Box sx={{ mt: 3, display: "flex", gap: 1.5, flexWrap: "wrap" }}>
            <Button
              variant="outlined"
              onClick={() => navigate("/")}
              sx={{ textTransform: "none", fontFamily: "JUST Sans ExBold" }}
            >
              Back to Home
            </Button>
          </Box>
          {isCompleted && (
            <Box sx={{ mt: 2 }}>
              <Button
                component="a"
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                fullWidth
                variant="contained"
                sx={{
                  textTransform: "none",
                  fontFamily: "JUST Sans ExBold",
                  backgroundColor: "#25D366",
                  color: "#fff",
                  py: 1.2,
                  boxShadow: "0 8px 18px rgba(37, 211, 102, 0.35)",
                  "&:hover": {
                    backgroundColor: "#20BE5A",
                  },
                }}
              >
                Send WhatsApp Message for Free Delivery
              </Button>
            </Box>
          )}
        </Paper>
      </Container>
      <Footer />
    </Box>
  )
}

export default PaymentStatus;
