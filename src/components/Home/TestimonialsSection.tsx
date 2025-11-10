import { Box, Container, Typography, Grid, Card, CardContent, Avatar, Rating } from "@mui/material";
import { FormatQuote as QuoteIcon } from "@mui/icons-material";

export const TestimonialsSection = () => {
  const testimonials = [
    { name: "John Adekunle", company: "Green Homes Ltd", avatar: "/images/avatars/1.jpg", rating: 5, content: "The solar installation from EchiSolar has cut our electricity bills by 80%." },
    { name: "Sarah Johnson", company: "Johnson Enterprises", avatar: "/images/avatars/2.jpg", rating: 5, content: "Outstanding quality and service. Our business now runs entirely on solar power." },
    { name: "Michael Chen", company: "Tech Solutions Inc", avatar: "/images/avatars/3.jpg", rating: 4, content: "The installment payment plan made it easy to switch to solar." },
  ];

  return (
    <Box sx={{ py: 10, background: "#050505" }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Typography variant="overline" sx={{ color: "#FFAB46", fontWeight: 800, fontFamily: "JUST Sans ExBold" }}>Testimonials</Typography>
          <Typography variant="h3" sx={{ fontWeight: 800, color: "#EAEAEA", mt: 1, fontFamily: "JUST Sans ExBold" }}>What Our Customers Say</Typography>
          <Typography sx={{ color: "rgba(234,234,234,0.75)", maxWidth: 760, mx: "auto", mt: 2, fontFamily: "JUST Sans Regular" }}>
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
                  background: "#141414",
                  color: "#EAEAEA",
                  position: "relative",
                  overflow: "hidden",
                  "&:hover": { transform: "translateY(-8px)", boxShadow: "0 18px 40px rgba(0,0,0,0.6)" },
                }}
              >
                <QuoteIcon sx={{ position: "absolute", right: 16, top: 16, fontSize: 42, color: "#2E7D4D", opacity: 0.08 }} />
                <CardContent sx={{ p: 0 }}>
                  <Rating value={t.rating} readOnly sx={{ mb: 2 }} />
                  <Typography sx={{ mb: 2, color: "rgba(234,234,234,0.95)", fontFamily: "JUST Sans Regular" }}>"{t.content}"</Typography>
                  <Box sx={{ display: "flex", alignItems: "center", mt: 3 }}>
                    <Avatar src={t.avatar} alt={t.name} sx={{ mr: 2, width: 48, height: 48 }} />
                    <Box>
                      <Typography sx={{ fontWeight: 800, fontFamily: "JUST Sans ExBold" }}>{t.name}</Typography>
                      <Typography sx={{ color: "rgba(234,234,234,0.7)", fontFamily: "JUST Sans Regular" }}>{t.company}</Typography>
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

