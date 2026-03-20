import { Box, Container, Typography, Grid, Chip } from "@mui/material";
import { alpha } from "@mui/material/styles";
import {
  BoltOutlined,
  CalendarMonthOutlined,
  PaymentsOutlined,
  ShieldOutlined,
  SupportAgentOutlined,
  TaskAltOutlined,
} from "@mui/icons-material";
import { useTheme } from "../../contexts/ThemeContext";

export const PaymentOptionsSection = () => {
  const { theme, mode } = useTheme();
  const plans = [
    {
      title: "Pay Once",
      accent: theme.palette.primary.main,
      badge: "Fastest route",
      description: "Complete your payment in one checkout and move straight into project confirmation, logistics, and installation scheduling.",
      highlights: [
        "Immediate ownership with one approval cycle",
        "Best for projects with urgent deployment timelines",
        "Single invoice and straightforward reconciliation",
      ],
      details: [
        { label: "Processing", value: "One checkout" },
        { label: "Handover", value: "Priority queue" },
        { label: "Support", value: "Dedicated follow-up" },
      ],
    },
    {
      title: "Installment Plans",
      accent: theme.palette.secondary.main,
      badge: "Most flexible",
      description: "Spread project costs into structured milestones while keeping your energy upgrade plan clear, predictable, and manageable.",
      highlights: [
        "Available across 2, 4, or 6-month plan windows",
        "Designed for homes and businesses balancing cash flow",
        "Clear payment milestones with status tracking support",
      ],
      details: [
        { label: "Terms", value: "2 / 4 / 6 months" },
        { label: "Cash flow", value: "Lower upfront load" },
        { label: "Visibility", value: "Milestone reminders" },
      ],
    },
  ];
  const sectionPerks = [
    { icon: ShieldOutlined, title: "Secure checkout", description: "Protected payment flow with clear confirmation." },
    { icon: CalendarMonthOutlined, title: "Structured timelines", description: "Plan delivery and payment dates with confidence." },
    { icon: SupportAgentOutlined, title: "Human support", description: "Our team stays available through the process." },
  ];

  return (
    <Box sx={{ 
      py: 10,
      position: "relative",
      overflow: "hidden"
    }}>
      <Box sx={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        opacity: mode === "dark" ? 0.18 : 0.24,
        backgroundImage: `
          linear-gradient(${alpha(theme.palette.divider, 0.42)} 1px, transparent 1px),
          linear-gradient(90deg, ${alpha(theme.palette.divider, 0.42)} 1px, transparent 1px)
        `,
        backgroundSize: "88px 88px",
      }} />
      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        <Box sx={{ textAlign: "center", maxWidth: 760, mx: "auto" }}>
          <Typography
            sx={{
              color: theme.palette.primary.main,
              fontWeight: 700,
              fontFamily: "JUST Sans ExBold",
              textTransform: "uppercase",
              letterSpacing: 2,
              fontSize: { xs: "0.82rem", md: "1.05rem" },
            }}
          >
            Payment Planning
          </Typography>
          <Typography
            variant="h2"
            sx={{
              mt: 1,
              fontWeight: 700,
              color: theme.palette.text.primary,
              fontFamily: "JUST Sans ExBold",
              fontSize: { xs: "1.95rem", md: "3.1rem" },
            }}
          >
            Flexible payment options
          </Typography>
          <Typography sx={{ mt: 2, color: theme.palette.text.secondary, fontFamily: "JUST Sans Regular", lineHeight: 1.8 }}>
            Choose the payment structure that matches your timeline, budget rhythm, and deployment urgency without sacrificing clarity.
          </Typography>
        </Box>

        <Box
          sx={{
            mt: 6,
            p: { xs: 2.2, md: 3.5 },
            borderRadius: 5,
            border: `1px solid ${theme.palette.divider}`,
            background: mode === "dark" ? alpha("#10202A", 0.76) : alpha("#FFFFFF", 0.8),
            backdropFilter: "blur(16px)",
            boxShadow: mode === "dark" ? "0 28px 70px rgba(3,10,18,0.28)" : "0 22px 60px rgba(15,23,42,0.08)",
          }}
        >
          <Grid container spacing={3}>
            {plans.map((plan) => (
              <Grid size={{ xs: 12, lg: 6 }} key={plan.title}>
                <Box
                  sx={{
                    height: "100%",
                    p: { xs: 2.6, md: 3.2 },
                    borderRadius: 4.5,
                    border: `1px solid ${alpha(plan.accent, 0.18)}`,
                    background: mode === "dark"
                      ? `linear-gradient(180deg, ${alpha(plan.accent, 0.08)}, ${alpha("#08131D", 0.7)})`
                      : `linear-gradient(180deg, ${alpha(plan.accent, 0.08)}, ${alpha("#FFFFFF", 0.86)})`,
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 2, flexWrap: "wrap" }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                      <Box
                        sx={{
                          width: 52,
                          height: 52,
                          borderRadius: 3,
                          display: "grid",
                          placeItems: "center",
                          background: alpha(plan.accent, 0.14),
                          color: plan.accent,
                          border: `1px solid ${alpha(plan.accent, 0.2)}`,
                        }}
                      >
                        {plan.title === "Pay Once" ? <PaymentsOutlined /> : <CalendarMonthOutlined />}
                      </Box>
                      <Box>
                        <Typography sx={{ color: theme.palette.text.primary, fontWeight: 700, fontFamily: "JUST Sans ExBold", fontSize: "1.35rem" }}>
                          {plan.title}
                        </Typography>
                        <Typography sx={{ color: theme.palette.text.secondary, fontFamily: "JUST Sans Regular", fontSize: "0.92rem" }}>
                          Designed around practical project execution
                        </Typography>
                      </Box>
                    </Box>
                    <Chip
                      label={plan.badge}
                      sx={{
                        background: alpha(plan.accent, 0.12),
                        border: `1px solid ${alpha(plan.accent, 0.18)}`,
                        color: plan.accent,
                        fontFamily: "JUST Sans ExBold",
                        fontWeight: 700,
                      }}
                    />
                  </Box>

                  <Typography sx={{ mt: 2.5, color: theme.palette.text.secondary, fontFamily: "JUST Sans Regular", lineHeight: 1.8 }}>
                    {plan.description}
                  </Typography>

                  <Box sx={{ mt: 3, display: "grid", gap: 1.5 }}>
                    {plan.highlights.map((point) => (
                      <Box key={point} sx={{ display: "flex", gap: 1.5, alignItems: "flex-start" }}>
                        <TaskAltOutlined sx={{ color: plan.accent, fontSize: 20, mt: "2px" }} />
                        <Typography sx={{ color: theme.palette.text.primary, fontFamily: "JUST Sans Regular", lineHeight: 1.7 }}>
                          {point}
                        </Typography>
                      </Box>
                    ))}
                  </Box>

                  {plan.title === "Installment Plans" && (
                    <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mt: 3 }}>
                      {["2 months", "4 months", "6 months"].map((term) => (
                        <Chip
                          key={term}
                          label={term}
                          sx={{
                            background: alpha(theme.palette.secondary.main, 0.12),
                            color: theme.palette.secondary.main,
                            border: `1px solid ${alpha(theme.palette.secondary.main, 0.16)}`,
                            fontFamily: "JUST Sans ExBold",
                            fontWeight: 700,
                          }}
                        />
                      ))}
                    </Box>
                  )}

                  <Grid container spacing={1.5} sx={{ mt: 2.5 }}>
                    {plan.details.map((detail) => (
                      <Grid size={{ xs: 12, sm: 4 }} key={detail.label}>
                        <Box
                          sx={{
                            p: 1.7,
                            height: "100%",
                            borderRadius: 3,
                            border: `1px solid ${theme.palette.divider}`,
                            background: mode === "dark" ? alpha("#08131D", 0.56) : alpha("#FFFFFF", 0.64),
                          }}
                        >
                          <Typography sx={{ color: theme.palette.text.secondary, fontSize: "0.78rem", textTransform: "uppercase", letterSpacing: "0.08em", fontFamily: "JUST Sans ExBold" }}>
                            {detail.label}
                          </Typography>
                          <Typography sx={{ mt: 0.6, color: theme.palette.text.primary, fontWeight: 700, fontFamily: "JUST Sans ExBold" }}>
                            {detail.value}
                          </Typography>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              </Grid>
            ))}
          </Grid>

          <Grid container spacing={2} sx={{ mt: 1 }}>
            {sectionPerks.map((perk) => {
              const Icon = perk.icon;

              return (
                <Grid size={{ xs: 12, md: 4 }} key={perk.title}>
                  <Box
                    sx={{
                      p: 2.2,
                      display: "flex",
                      gap: 1.6,
                      borderRadius: 3.5,
                      border: `1px solid ${theme.palette.divider}`,
                      background: mode === "dark" ? alpha("#08131D", 0.54) : alpha("#FFFFFF", 0.66),
                    }}
                  >
                    <Box
                      sx={{
                        width: 44,
                        height: 44,
                        borderRadius: 3,
                        display: "grid",
                        placeItems: "center",
                        flexShrink: 0,
                        background: alpha(theme.palette.primary.main, 0.12),
                        color: theme.palette.primary.main,
                      }}
                    >
                      <Icon fontSize="small" />
                    </Box>
                    <Box>
                      <Typography sx={{ color: theme.palette.text.primary, fontWeight: 700, fontFamily: "JUST Sans ExBold" }}>
                        {perk.title}
                      </Typography>
                      <Typography sx={{ mt: 0.6, color: theme.palette.text.secondary, fontFamily: "JUST Sans Regular", lineHeight: 1.7 }}>
                        {perk.description}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              );
            })}
          </Grid>

          <Box
            sx={{
              mt: 2.4,
              px: 2.2,
              py: 1.8,
              borderRadius: 3.5,
              border: `1px solid ${alpha(theme.palette.primary.main, 0.16)}`,
              background: alpha(theme.palette.primary.main, 0.08),
              display: "flex",
              alignItems: { xs: "flex-start", md: "center" },
              gap: 1.4,
              flexDirection: { xs: "column", md: "row" },
            }}
          >
            <Box sx={{ width: 42, height: 42, borderRadius: 3, display: "grid", placeItems: "center", background: alpha(theme.palette.primary.main, 0.14), color: theme.palette.primary.main }}>
              <BoltOutlined fontSize="small" />
            </Box>
            <Typography sx={{ color: theme.palette.text.primary, fontFamily: "JUST Sans Regular", lineHeight: 1.7 }}>
              Every payment path keeps the project scope visible from the start, so you know how budget choice affects deployment timing and support.
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};
