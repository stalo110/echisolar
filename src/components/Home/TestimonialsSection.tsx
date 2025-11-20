import { Box, Container, Typography, Grid, Card, CardContent, Avatar, Rating } from "@mui/material";
import { FormatQuote as QuoteIcon } from "@mui/icons-material";
import { useTheme } from "../../contexts/ThemeContext";

export const TestimonialsSection = () => {
  const { theme, mode } = useTheme();
  const testimonials = [
    { name: "John Adekunle", company: "Green Homes Ltd", avatar: "/images/avatars/1.jpg", rating: 5, content: "The solar installation from EchiSolar has cut our electricity bills by 80%." },
    { name: "Sarah Johnson", company: "Johnson Enterprises", avatar: "/images/avatars/2.jpg", rating: 5, content: "Outstanding quality and service. Our business now runs entirely on solar power." },
    { name: "Michael Chen", company: "Tech Solutions Inc", avatar: "/images/avatars/3.jpg", rating: 4, content: "The installment payment plan made it easy to switch to solar." },
  ];

  return (
    <Box sx={{ 
      py: 10, 
      background: mode === 'dark' ? "#050505" : "#f0f2f5",
      position: "relative",
      overflow: "hidden"
    }}>
      {/* Wave Pattern Background */}
      <Box sx={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "120%",
        height: "100%",
        opacity: mode === 'dark' ? 0.04 : 0.025,
        background: `
          repeating-linear-gradient(
            45deg,
            ${theme.palette.primary.main}20,
            ${theme.palette.primary.main}20 2px,
            transparent 2px,
            transparent 20px
          ),
          repeating-linear-gradient(
            -45deg,
            ${theme.palette.secondary.main}15,
            ${theme.palette.secondary.main}15 1px,
            transparent 1px,
            transparent 30px
          )
        `,
        animation: "wave 18s ease-in-out infinite",
        "@keyframes wave": {
          "0%, 100%": { transform: "translateX(-10%) skewX(0deg)" },
          "50%": { transform: "translateX(0%) skewX(2deg)" }
        }
      }} />
      <Container maxWidth="lg">
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Typography variant="h6" sx={{ color: theme.palette.primary.main, fontWeight: 800, fontFamily: "JUST Sans ExBold", textTransform: "uppercase", letterSpacing: 2, fontSize: { xs: "0.9rem", md: "1.25rem" } }}>Testimonials</Typography>
          <Typography variant="h2" sx={{ fontWeight: 800, color: theme.palette.text.primary, mt: 1, fontFamily: "JUST Sans ExBold", fontSize: { xs: "2.2rem", md: "3.8rem" } }}>What Our Customers Say</Typography>
          <Typography sx={{ color: theme.palette.text.secondary, maxWidth: 760, mx: "auto", mt: 2, fontFamily: "JUST Sans Regular" }}>
            Hear from homeowners and businesses who have transformed their energy consumption with our solar solutions.
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {testimonials.map((t, i) => (
            <Grid size={{ xs: 12, md: 4 }} key={i}>
              <Card
                sx={{
                  p: 3,
                  borderRadius: 2,
                  background: theme.palette.background.paper,
                  color: theme.palette.text.primary,
                  position: "relative",
                  overflow: "hidden",
                  animation: `slideInFromRight 0.8s ease-out ${i * 0.2}s both`,
                  "@keyframes slideInFromRight": {
                    "0%": { opacity: 0, transform: "translateX(50px)" },
                    "100%": { opacity: 1, transform: "translateX(0)" }
                  },
                  "&:hover": { transform: "translateY(-8px)", boxShadow: mode === 'dark' ? "0 18px 40px rgba(0,0,0,0.6)" : "0 18px 40px rgba(0,0,0,0.15)" },
                }}
              >
                <QuoteIcon sx={{ 
                  position: "absolute", 
                  right: 16, 
                  top: 16, 
                  fontSize: 42, 
                  color: theme.palette.secondary.main, 
                  opacity: 0.08,
                  animation: "float 3s ease-in-out infinite",
                  "@keyframes float": {
                    "0%, 100%": { transform: "translateY(0px)" },
                    "50%": { transform: "translateY(-5px)" }
                  }
                }} />
                <CardContent sx={{ p: 0 }}>
                  <Rating value={t.rating} readOnly sx={{ mb: 2 }} />
                  <Typography sx={{ mb: 2, color: theme.palette.text.primary, fontFamily: "JUST Sans Regular" }}>"{t.content}"</Typography>
                  <Box sx={{ display: "flex", alignItems: "center", mt: 3 }}>
                    <Avatar src={t.avatar} alt={t.name} sx={{ mr: 2, width: 48, height: 48 }} />
                    <Box>
                      <Typography sx={{ fontWeight: 800, fontFamily: "JUST Sans ExBold" }}>{t.name}</Typography>
                      <Typography sx={{ color: theme.palette.text.secondary, fontFamily: "JUST Sans Regular" }}>{t.company}</Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

