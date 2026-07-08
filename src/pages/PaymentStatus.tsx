import { Box, Button, Card, CardContent, Container, Paper, Rating, Stack, TextField, Typography } from "@mui/material";
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
import { fetchOrderReviewItems, submitOrderItemReview, type ReviewableOrderItem } from "../services/reviewService";

type ReviewDraft = {
  rating: number;
  comment: string;
};

const formatCurrency = (value: number) => `NGN ${Number(value || 0).toLocaleString()}`;

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
  const [resolvedOrderId, setResolvedOrderId] = useState<number | null>(orderId);
  const [reviewItems, setReviewItems] = useState<ReviewableOrderItem[]>([]);
  const [reviewDrafts, setReviewDrafts] = useState<Record<number, ReviewDraft>>({});
  const [reviewLoading, setReviewLoading] = useState(false);
  const [reviewMessage, setReviewMessage] = useState("");
  const [submittingOrderItemId, setSubmittingOrderItemId] = useState<number | null>(null);
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
  const reviewStatus = String(verifiedStatus || status || "").toLowerCase();
  const canLeaveReview = isAuthenticated && Boolean(resolvedOrderId) && ["paid", "successful", "success"].includes(reviewStatus);
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

  const hydrateReviewDrafts = (items: ReviewableOrderItem[]) => {
    setReviewDrafts((current) =>
      items.reduce<Record<number, ReviewDraft>>((next, item) => {
        next[item.orderItemId] = {
          rating: current[item.orderItemId]?.rating ?? item.review?.rating ?? 0,
          comment: current[item.orderItemId]?.comment ?? item.review?.comment ?? "",
        };
        return next;
      }, {})
    );
  };

  const handleReviewDraftChange = (orderItemId: number, patch: Partial<ReviewDraft>) => {
    setReviewDrafts((current) => ({
      ...current,
      [orderItemId]: {
        rating: current[orderItemId]?.rating ?? 0,
        comment: current[orderItemId]?.comment ?? "",
        ...patch,
      },
    }));
  };

  const handleReviewSubmit = async (item: ReviewableOrderItem) => {
    if (!resolvedOrderId) return;

    const draft = reviewDrafts[item.orderItemId] || { rating: item.review?.rating ?? 0, comment: item.review?.comment ?? "" };
    const comment = draft.comment.trim();

    if (!draft.rating) {
      toast.error("Select a star rating before submitting your feedback.");
      return;
    }

    if (comment.length < 8) {
      toast.error("Please enter a more helpful comment.");
      return;
    }

    setSubmittingOrderItemId(item.orderItemId);
    try {
      const result = await submitOrderItemReview({
        orderId: resolvedOrderId,
        orderItemId: item.orderItemId,
        rating: draft.rating,
        comment,
      });

      setReviewItems((current) =>
        current.map((entry) =>
          entry.orderItemId === item.orderItemId
            ? {
                ...entry,
                review: result.review,
              }
            : entry
        )
      );
      handleReviewDraftChange(item.orderItemId, {
        rating: result.review?.rating ?? draft.rating,
        comment: result.review?.comment ?? comment,
      });
      toast.success(result.message || "Feedback submitted successfully.");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || error?.response?.data?.error || "Unable to submit feedback right now.");
    } finally {
      setSubmittingOrderItemId(null);
    }
  };

  useEffect(() => {
    setResolvedOrderId(orderId);
  }, [orderId]);

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
        const nextOrderId = Number(data.order?.id || orderId || 0) || null;
        setVerifiedStatus(serverStatus);
        setResolvedOrderId(nextOrderId);
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
  }, [orderId, reference]);

  useEffect(() => {
    if (!canLeaveReview || !resolvedOrderId) return;

    let active = true;
    setReviewLoading(true);
    setReviewMessage("");

    fetchOrderReviewItems(resolvedOrderId)
      .then((data) => {
        if (!active) return;
        setReviewItems(data.items);
        hydrateReviewDrafts(data.items);
        if (!data.items.length) {
          setReviewMessage("No reviewable items were found for this order.");
        }
      })
      .catch((error: any) => {
        if (!active) return;
        setReviewItems([]);
        setReviewMessage(
          error?.response?.data?.message ||
            error?.response?.data?.error ||
            "Your feedback form will appear once payment confirmation is fully complete."
        );
      })
      .finally(() => {
        if (active) setReviewLoading(false);
      });

    return () => {
      active = false;
    };
  }, [canLeaveReview, resolvedOrderId, reviewStatus]);

  return (
    <Box>
      <TopNav />
      <Container
        sx={{
          py: 6,
          minHeight: "55vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 3,
        }}
      >
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
          {resolvedOrderId && (
            <Typography sx={{ fontFamily: "JUST Sans Regular", color: theme.palette.text.secondary, mt: 1 }}>
              Order: #{resolvedOrderId}
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
          {(["successful", "paid"].includes(String(verifiedStatus || status).toLowerCase())) && (
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

        {canLeaveReview && (
          <Paper
            elevation={0}
            sx={{
              width: "100%",
              maxWidth: 720,
              p: { xs: 3, md: 4 },
              borderRadius: 3,
              border: `1px solid ${theme.palette.divider}`,
              background: theme.palette.background.paper,
              boxShadow: mode === "dark" ? "0 0 20px rgba(0,0,0,0.22)" : "0 0 20px rgba(0,0,0,0.08)",
            }}
          >
            <Typography variant="h5" sx={{ fontFamily: "JUST Sans ExBold", color: theme.palette.text.primary }}>
              Leave Your Feedback
            </Typography>
            <Typography sx={{ mt: 1, color: theme.palette.text.secondary, fontFamily: "JUST Sans Regular" }}>
              Rate the product or package you just paid for. Your feedback can be featured on the home page in place of testimonials.
            </Typography>

            {reviewLoading ? (
              <Typography sx={{ mt: 3, color: theme.palette.text.secondary, fontFamily: "JUST Sans Regular" }}>
                Loading your review items...
              </Typography>
            ) : reviewMessage ? (
              <Typography sx={{ mt: 3, color: theme.palette.text.secondary, fontFamily: "JUST Sans Regular" }}>
                {reviewMessage}
              </Typography>
            ) : (
              <Stack spacing={2.5} sx={{ mt: 3 }}>
                {reviewItems.map((item) => {
                  const draft = reviewDrafts[item.orderItemId] || {
                    rating: item.review?.rating ?? 0,
                    comment: item.review?.comment ?? "",
                  };

                  return (
                    <Card
                      key={item.orderItemId}
                      sx={{
                        borderRadius: 3,
                        border: `1px solid ${theme.palette.divider}`,
                        background: mode === "dark" ? "rgba(7, 17, 27, 0.55)" : "rgba(255,255,255,0.84)",
                        boxShadow: "none",
                      }}
                    >
                      <CardContent sx={{ p: { xs: 2, md: 2.5 } }}>
                        <Stack direction={{ xs: "column", md: "row" }} spacing={2.5}>
                          <Box
                            component="img"
                            src={item.images[0] || "/images/sample1.jpg"}
                            alt={item.name}
                            sx={{
                              width: { xs: "100%", md: 132 },
                              height: { xs: 200, md: 132 },
                              objectFit: "cover",
                              borderRadius: 2,
                              flexShrink: 0,
                            }}
                          />
                          <Box sx={{ flex: 1 }}>
                            <Typography sx={{ fontFamily: "JUST Sans ExBold", color: theme.palette.text.primary }}>
                              {item.name}
                            </Typography>
                            <Typography sx={{ mt: 0.5, color: theme.palette.text.secondary, fontFamily: "JUST Sans Regular" }}>
                              {item.itemType === "package" ? "Package Experience" : "Product Feedback"} • Qty {item.quantity} • {formatCurrency(item.unitPrice)}
                            </Typography>
                            {item.review && (
                              <Typography sx={{ mt: 1.2, color: theme.palette.primary.main, fontFamily: "JUST Sans Regular" }}>
                                Existing feedback saved. You can update it anytime.
                              </Typography>
                            )}

                            <Box sx={{ mt: 2 }}>
                              <Rating
                                value={draft.rating}
                                onChange={(_, value) =>
                                  handleReviewDraftChange(item.orderItemId, {
                                    rating: value || 0,
                                  })
                                }
                              />
                            </Box>

                            <TextField
                              fullWidth
                              multiline
                              minRows={3}
                              placeholder="Tell us about the product, package, or overall experience."
                              value={draft.comment}
                              onChange={(event) =>
                                handleReviewDraftChange(item.orderItemId, {
                                  comment: event.target.value,
                                })
                              }
                              sx={{ mt: 2 }}
                            />

                            <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-start" }}>
                              <Button
                                variant="contained"
                                onClick={() => handleReviewSubmit(item)}
                                disabled={submittingOrderItemId === item.orderItemId}
                                sx={{ textTransform: "none", fontFamily: "JUST Sans ExBold" }}
                              >
                                {submittingOrderItemId === item.orderItemId
                                  ? "Saving Feedback..."
                                  : item.review
                                  ? "Update Feedback"
                                  : "Submit Feedback"}
                              </Button>
                            </Box>
                          </Box>
                        </Stack>
                      </CardContent>
                    </Card>
                  );
                })}
              </Stack>
            )}
          </Paper>
        )}
      </Container>
      <Footer />
    </Box>
  );
};

export default PaymentStatus;
