
import { Box, Container, Typography, Grid, Card, CardContent } from "@mui/material";
import { HiShieldCheck } from "react-icons/hi2";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { FaLeaf } from "react-icons/fa";
import { MdSupportAgent } from "react-icons/md";
import { RiSecurePaymentFill } from "react-icons/ri";
import { IoFlashSharp } from "react-icons/io5";
import { FaSolarPanel, FaMoneyBillWave, FaShieldAlt } from "react-icons/fa";
import { useTheme } from "../../contexts/ThemeContext";

export const WhyChooseUsSection = () => {
  const { theme, mode } = useTheme();
  const features = [
    { icon: <HiShieldCheck />, title: "Quality Certified", desc: "International certifications & warranties." },
    { icon: <RiMoneyDollarCircleFill />, title: "Cost Effective", desc: "Reduce electricity bills by up to 90%." },
    { icon: <FaLeaf />, title: "Eco Friendly", desc: "Lower carbon footprint with clean energy." },
    { icon: <MdSupportAgent />, title: "24/7 Support", desc: "Round-the-clock technical support." },
    { icon: <RiSecurePaymentFill />, title: "Secure Payment", desc: "Multiple secure payment options." },
    { icon: <IoFlashSharp />, title: "Quick Installation", desc: "Fast professional installation." },
  ];

  return (
    <Box sx={{ py: 10, background: mode === 'dark' ? "#070707" : "#f8f9fa" }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Typography variant="h6" sx={{ color: theme.palette.primary.main, fontWeight: 800, fontFamily: "JUST Sans ExBold", textTransform: "uppercase", letterSpacing: 2, fontSize: { xs: "0.9rem", md: "1.25rem" } }}>Why Choose EchiSolar</Typography>
          <Typography variant="h2" sx={{ fontWeight: 800, color: theme.palette.text.primary, mt: 1, fontFamily: "JUST Sans ExBold", fontSize: { xs: "2.2rem", md: "3.8rem" } }}>The Smart Choice for Solar Energy</Typography>
          <Typography sx={{ color: theme.palette.text.secondary, maxWidth: 760, mx: "auto", mt: 2, fontFamily: "JUST Sans Regular" }}>
            We make switching to solar energy simple, affordable, and rewarding with our comprehensive solutions and expert support.
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {features.map((f, i) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={i}>
              <Card sx={{
                height: "100%",
                p: 3,
                background: theme.palette.background.paper,
                color: theme.palette.text.primary,
                borderRadius: 2,
                textAlign: "center",
                transition: "transform .28s ease, box-shadow .28s ease",
                "&:hover": {
                  transform: "translateY(-10px)",
                  boxShadow: mode === 'dark' ? "0 22px 50px rgba(0,0,0,0.6)" : "0 22px 50px rgba(0,0,0,0.15)"
                }
              }}>
                <CardContent>
                  <Box sx={{ 
                    fontSize: 48, 
                    mb: 2, 
                    background: `linear-gradient(135deg, ${theme.palette.primary.main}, #FF8C42)`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    filter: "drop-shadow(0 4px 8px rgba(255,171,70,0.3))",
                    transition: "transform .3s ease, filter .3s ease",
                    "&:hover": {
                      transform: "scale(1.1) rotateY(15deg)",
                      filter: "drop-shadow(0 8px 16px rgba(255,171,70,0.5))"
                    }
                  }}>{f.icon}</Box>
                  <Typography variant="h6" sx={{ fontWeight: 800, mb: 1, fontFamily: "JUST Sans ExBold" }}>{f.title}</Typography>
                  <Typography sx={{ color: theme.palette.text.secondary, fontFamily: "JUST Sans Regular" }}>{f.desc}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ 
          mt: 6, 
          p: 4, 
          background: `linear-gradient(135deg, ${theme.palette.secondary.main}, ${theme.palette.secondary.light})`, 
          borderRadius: 3, 
          color: mode === 'dark' ? "#fff" : "#000", 
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
          boxShadow: `0 20px 40px ${theme.palette.secondary.main}30`
        }}>
          {/* Animated background icons */}
          <Box sx={{
            position: "absolute",
            top: -10,
            right: -10,
            fontSize: 140,
            opacity: 0.25,
            color: theme.palette.primary.main,
            animation: "float 5s ease-in-out infinite",
            "@keyframes float": {
              "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
              "50%": { transform: "translateY(-30px) rotate(15deg)" }
            }
          }}>
            <FaSolarPanel />
          </Box>
          
          <Box sx={{
            position: "absolute",
            bottom: -20,
            left: -20,
            fontSize: 120,
            opacity: 0.2,
            color: theme.palette.primary.main,
            animation: "pulse 3s ease-in-out infinite",
            "@keyframes pulse": {
              "0%, 100%": { transform: "scale(1) rotate(0deg)" },
              "50%": { transform: "scale(1.2) rotate(5deg)" }
            }
          }}>
            <FaMoneyBillWave />
          </Box>

          <Typography variant="h5" sx={{ fontWeight: 800, fontFamily: "JUST Sans ExBold", position: "relative", zIndex: 2 }}>Ready to Save with Solar?</Typography>
          <Typography sx={{ opacity: 0.95, mt: 1, fontFamily: "JUST Sans Regular", position: "relative", zIndex: 2 }}>Join thousands enjoying clean, affordable energy.</Typography>
          
          <Box sx={{ display: "flex", gap: 3, justifyContent: "center", mt: 3, flexWrap: "wrap", position: "relative", zIndex: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <FaMoneyBillWave style={{ fontSize: 20, color: theme.palette.primary.main }} />
              <Typography sx={{ fontWeight: 800, fontFamily: "JUST Sans ExBold" }}>Average Savings: ₦500,000/year</Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <IoFlashSharp style={{ fontSize: 20, color: theme.palette.primary.main }} />
              <Typography sx={{ fontWeight: 800, fontFamily: "JUST Sans ExBold" }}>ROI: 2-3 Years</Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <FaShieldAlt style={{ fontSize: 20, color: theme.palette.primary.main }} />
              <Typography sx={{ fontWeight: 800, fontFamily: "JUST Sans ExBold" }}>Warranty: 25 Years</Typography>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};
