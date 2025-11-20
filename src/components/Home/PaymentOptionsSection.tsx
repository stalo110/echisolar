import { Box, Typography, Grid, Paper } from "@mui/material";

export const PaymentOptionsSection = () => {
  const AMBER = "#FFAB46";
  const GREEN = "#2E7D4D";

  return (
    <Box sx={{ 
      py: 8, 
      px: { xs: 2, md: 6 }, 
      background: "#0b0b0b",
      position: "relative",
      overflow: "hidden"
    }}>
      {/* Circuit Board Pattern */}
      <Box sx={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        opacity: 0.03,
        backgroundImage: `
          linear-gradient(90deg, ${AMBER}20 1px, transparent 1px),
          linear-gradient(${GREEN}20 1px, transparent 1px),
          radial-gradient(circle at 20% 30%, ${AMBER}30 2px, transparent 2px),
          radial-gradient(circle at 80% 70%, ${GREEN}25 1px, transparent 1px)
        `,
        backgroundSize: "50px 50px, 50px 50px, 100px 100px, 80px 80px",
        animation: "circuit 12s linear infinite",
        "@keyframes circuit": {
          "0%": { backgroundPosition: "0 0, 0 0, 0 0, 0 0" },
          "100%": { backgroundPosition: "50px 0, 0 50px, 100px 100px, 80px 80px" }
        }
      }} />
      <Typography variant="h2" sx={{ textAlign: "center", mb: 6, fontWeight: 800, color: "#EAEAEA", fontFamily: "JUST Sans ExBold", fontSize: { xs: "2.2rem", md: "3.8rem" } }}>
        Flexible Payment Options
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {[
          {
            title: "Pay Once",
            desc: "Make a one-time payment for your solar products and enjoy a seamless checkout experience.",
            accent: AMBER,
          },
          {
            title: "Installment Plans",
            desc: "Choose flexible installment plans (1, 4, or 6 months) and manage payments easily.",
            accent: GREEN,
          },
        ].map((p, idx) => (
          <Grid size={{ xs: 12, md: 5 }} key={idx}>
            <Paper
              elevation={6}
              sx={{
                p: 4,
                borderRadius: 2,
                background: "linear-gradient(180deg, #121212, #161616)",
                color: "#EAEAEA",
                transition: "transform .25s ease, box-shadow .25s ease",
                "&:hover": { transform: "translateY(-8px)", boxShadow: "0 20px 50px rgba(0,0,0,0.6)" },
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 800, mb: 1, color: p.accent, fontFamily: "JUST Sans ExBold" }}>
                {p.title}
              </Typography>
              <Typography sx={{ color: "rgba(234,234,234,0.8)", fontFamily: "JUST Sans Regular" }}>{p.desc}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
