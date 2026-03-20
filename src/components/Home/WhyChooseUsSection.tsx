import { Box, Container, Typography, Grid, Card, CardContent } from "@mui/material";
import { alpha } from "@mui/material/styles";
import { HiShieldCheck } from "react-icons/hi2";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { FaLeaf } from "react-icons/fa";
import { MdSupportAgent } from "react-icons/md";
import { RiSecurePaymentFill } from "react-icons/ri";
import { IoFlashSharp } from "react-icons/io5";
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
  const metrics = [
    { label: "Average Savings", value: "N500,000/year" },
    { label: "ROI", value: "2-3 Years" },
    { label: "Warranty", value: "25 Years" },
  ];

  return (
    <Box sx={{ py: 10, background: "transparent" }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Typography variant="h6" sx={{ color: theme.palette.primary.main, fontWeight: 700, fontFamily: "JUST Sans ExBold", textTransform: "uppercase", letterSpacing: 2, fontSize: { xs: "0.82rem", md: "1.05rem" } }}>
            Why Choose EchiSolar
          </Typography>
          <Typography variant="h2" sx={{ fontWeight: 700, color: theme.palette.text.primary, mt: 1, fontFamily: "JUST Sans ExBold", fontSize: { xs: "1.95rem", md: "3.1rem" } }}>
            The smart choice for solar energy
          </Typography>
          <Typography sx={{ color: theme.palette.text.secondary, maxWidth: 760, mx: "auto", mt: 2, fontFamily: "JUST Sans Regular", lineHeight: 1.8 }}>
            We make switching to solar energy simple, affordable, and rewarding with our comprehensive solutions and expert support.
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {features.map((f, i) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={i}>
              <Card sx={{
                height: "100%",
                p: 3,
                background: mode === "dark" ? alpha("#10202A", 0.74) : alpha("#FFFFFF", 0.82),
                color: theme.palette.text.primary,
                borderRadius: 4,
                border: `1px solid ${theme.palette.divider}`,
                textAlign: "center",
                boxShadow: mode === "dark" ? "0 20px 48px rgba(3,10,18,0.24)" : "0 18px 44px rgba(15,23,42,0.08)",
                transition: "transform .28s ease, box-shadow .28s ease, border-color .28s ease",
                "&:hover": {
                  transform: "translateY(-10px)",
                  borderColor: alpha(theme.palette.secondary.main, 0.28),
                  boxShadow: mode === 'dark' ? "0 24px 54px rgba(3,10,18,0.32)" : "0 22px 50px rgba(15,23,42,0.12)"
                }
              }}>
                <CardContent>
                  <Box sx={{ 
                    width: 64,
                    height: 64,
                    mx: "auto",
                    mb: 2,
                    borderRadius: 3,
                    display: "grid",
                    placeItems: "center",
                    fontSize: 34,
                    background: alpha(theme.palette.primary.main, 0.12),
                    color: theme.palette.primary.main,
                    border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                  }}>{f.icon}</Box>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, fontFamily: "JUST Sans ExBold" }}>{f.title}</Typography>
                  <Typography sx={{ color: theme.palette.text.secondary, fontFamily: "JUST Sans Regular", lineHeight: 1.7 }}>{f.desc}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ 
          mt: 6, 
          px: { xs: 2.5, sm: 3.5, md: 5 },
          pt: { xs: 4, md: 5 },
          pb: { xs: 4, md: 2.5 },
          background: "linear-gradient(180deg, #0D3A28 0%, #0A2E21 100%)",
          borderRadius: { xs: 4, md: 5 },
          color: "#fff",
          textAlign: "left",
          position: "relative",
          overflow: "hidden",
          border: `1px solid ${alpha(theme.palette.primary.main, 0.22)}`,
          boxShadow: "0 28px 70px rgba(2, 19, 13, 0.36)",
        }}>
          <Box sx={{
            position: "absolute",
            inset: 0,
            opacity: 0.3,
            backgroundImage: `
              radial-gradient(ellipse 22% 18% at 6% 12%, transparent 66%, rgba(122, 181, 145, 0.16) 67%, transparent 70%),
              radial-gradient(ellipse 18% 15% at 24% 10%, transparent 66%, rgba(122, 181, 145, 0.12) 67%, transparent 70%),
              radial-gradient(ellipse 18% 16% at 46% 14%, transparent 66%, rgba(122, 181, 145, 0.12) 67%, transparent 70%),
              radial-gradient(ellipse 24% 16% at 70% 10%, transparent 66%, rgba(122, 181, 145, 0.13) 67%, transparent 70%),
              radial-gradient(ellipse 22% 18% at 92% 14%, transparent 66%, rgba(122, 181, 145, 0.14) 67%, transparent 70%),
              radial-gradient(ellipse 22% 18% at 18% 76%, transparent 66%, rgba(122, 181, 145, 0.1) 67%, transparent 70%)
            `,
          }} />
          <Box
            sx={{
              position: "absolute",
              bottom: { xs: 96, md: -80 },
              left: { xs: "50%", md: "57%" },
              transform: "translateX(-50%)",
              width: { xs: 220, sm: 280, md: 300 },
              height: { xs: 90, sm: 110, md: 180 },
              borderRadius: "50%",
              background: "rgba(102, 168, 117, 0.26)",
              filter: "blur(2px)",
              zIndex: 0,
            }}
          />
          <Grid container spacing={{ xs: 3, md: 2 }} sx={{ position: "relative", zIndex: 1, alignItems: "center" }}>
            <Grid size={{ xs: 12, md: 5 }}>
              <Typography
                sx={{
                  color: theme.palette.primary.main,
                  fontWeight: 700,
                  fontFamily: "JUST Sans ExBold",
                  fontSize: { xs: "1.5rem", sm: "1.6rem", md: "1.7rem" },
                  lineHeight: 1.05,
                  textTransform: "uppercase",
                  textAlign: { xs: "center", md: "left" },
                }}
              >
                Ready to save with solar?
              </Typography>
              <Typography
                sx={{
                  mt: 2,
                  color: "rgba(255,255,255,0.9)",
                  fontFamily: "JUST Sans Regular",
                  fontWeight: 500,
                  fontSize: { xs: "0.8rem", sm: "0.8rem", md: "0.9rem" },
                  letterSpacing: { xs: "0.12em", sm: "0.18em", md: "0.22em" },
                  textTransform: "uppercase",
                  textAlign: { xs: "center", md: "left" },
                }}
              >
                Join thousands enjoying clean, affordable energy.
              </Typography>
            </Grid>

            <Grid size={{ xs: 12, md: 3 }}>
              <Box
                sx={{
                  position: "relative",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "flex-end",
                  mt: { xs: 1, md: 0 },
                  mb: { xs: 0.5, md: -8 },
                }}
              >
                <Box
                  component="img"
                  src="/images/PanelSun.png"
                  alt="Solar panel and sun"
                  sx={{
                    width: { xs: "72%", sm: "58%", md: "100%" },
                    maxWidth: { xs: 260, md: 310 },
                    objectFit: "contain",
                    display: "block",
                    filter: "drop-shadow(0 20px 35px rgba(3,10,18,0.24))",
                  }}
                />
              </Box>
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <Box
                sx={{
                  width: "100%",
                  maxWidth: { xs: 320, md: "100%" },
                  mx: { xs: "auto", md: 0 },
                  display: "grid",
                  gap: { xs: 1.35, md: 1.8 },
                }}
              >
                {metrics.map((metric) => (
                  <Box
                    key={metric.label}
                    sx={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 1.5,
                    }}
                  >
                    <Box sx={{ width: 10, height: 10, borderRadius: "50%", mt: "10px", backgroundColor: theme.palette.primary.main, flexShrink: 0 }} />
                    <Typography
                      sx={{
                        color: "#ffffff",
                        fontFamily: "JUST Sans Regular",
                        fontSize: { xs: "1rem", md: "1.1rem" },
                        lineHeight: 1.45,
                      }}
                    >
                      <Box component="span" sx={{ color: theme.palette.primary.main, fontFamily: "JUST Sans ExBold", fontWeight: 700 }}>
                        {metric.label}:
                      </Box>{" "}
                      {metric.value}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};
