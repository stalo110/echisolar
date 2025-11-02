
import { Box, Container, Typography, Grid, Card, CardContent } from "@mui/material";
import { Verified as VerifiedIcon, Support as SupportIcon, Forest as ForestIcon, Savings as SavingsIcon, Security as SecurityIcon, Speed as SpeedIcon } from "@mui/icons-material";

export const WhyChooseUsSection = () => {
  const features = [
    { icon: <VerifiedIcon />, title: "Quality Certified", desc: "International certifications & warranties." },
    { icon: <SavingsIcon />, title: "Cost Effective", desc: "Reduce electricity bills by up to 90%." },
    { icon: <ForestIcon />, title: "Eco Friendly", desc: "Lower carbon footprint with clean energy." },
    { icon: <SupportIcon />, title: "24/7 Support", desc: "Round-the-clock technical support." },
    { icon: <SecurityIcon />, title: "Secure Payment", desc: "Multiple secure payment options." },
    { icon: <SpeedIcon />, title: "Quick Installation", desc: "Fast professional installation." },
  ];

  return (
    <Box sx={{ py: 10, background: "#070707" }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Typography variant="overline" sx={{ color: "#FFAB46", fontWeight: 800 }}>Why Choose EchiSolar</Typography>
          <Typography variant="h3" sx={{ fontWeight: 800, color: "#EAEAEA", mt: 1 }}>The Smart Choice for Solar Energy</Typography>
          <Typography sx={{ color: "rgba(234,234,234,0.75)", maxWidth: 760, mx: "auto", mt: 2 }}>
            We make switching to solar energy simple, affordable, and rewarding with our comprehensive solutions and expert support.
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {features.map((f, i) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={i}>
              <Card sx={{
                height: "100%",
                p: 3,
                background: "linear-gradient(180deg,#121212,#161616)",
                color: "#EAEAEA",
                borderRadius: 2,
                textAlign: "center",
                transition: "transform .28s ease, box-shadow .28s ease",
                "&:hover": {
                  transform: "translateY(-10px)",
                  boxShadow: "0 22px 50px rgba(0,0,0,0.6)"
                }
              }}>
                <CardContent>
                  <Box sx={{ fontSize: 36, mb: 2, color: "#2E7D4D" }}>{f.icon}</Box>
                  <Typography variant="h6" sx={{ fontWeight: 800, mb: 1 }}>{f.title}</Typography>
                  <Typography sx={{ color: "rgba(234,234,234,0.78)" }}>{f.desc}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ mt: 6, p: 4, background: "linear-gradient(90deg,#2E7D4D,#278b57)", borderRadius: 2, color: "#fff", textAlign: "center" }}>
          <Typography variant="h5" sx={{ fontWeight: 800 }}>Ready to Save with Solar?</Typography>
          <Typography sx={{ opacity: 0.95, mt: 1 }}>Join thousands enjoying clean, affordable energy.</Typography>
          <Box sx={{ display: "flex", gap: 3, justifyContent: "center", mt: 3, flexWrap: "wrap" }}>
            <Typography sx={{ fontWeight: 800 }}>Average Savings: ₦500,000/year</Typography>
            <Typography sx={{ fontWeight: 800 }}>ROI: 2-3 Years</Typography>
            <Typography sx={{ fontWeight: 800 }}>Warranty: 25 Years</Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};
