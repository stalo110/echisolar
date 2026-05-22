import { useEffect, useState } from "react";
import { Box, Container, Typography, Grid, Card, CardContent, Avatar, Rating } from "@mui/material";
import { alpha } from "@mui/material/styles";
import { FormatQuote as QuoteIcon } from "@mui/icons-material";
import { useTheme } from "../../contexts/ThemeContext";
import { fetchPublicReviews, type PublicReview } from "../../services/reviewService";

const getInitials = (name: string) =>
  String(name || "VC")
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("") || "VC";

export const TestimonialsSection = () => {
  const { theme, mode } = useTheme();
  const [reviews, setReviews] = useState<PublicReview[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    fetchPublicReviews(3)
      .then((data) => {
        if (active) setReviews(data);
      })
      .catch(() => {
        if (active) setReviews([]);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const cards = reviews.length
    ? reviews
    : [
        {
          id: 0,
          reviewerName: "Your Review",
          itemType: "product" as const,
          itemName: "Could appear here next",
          rating: 5,
          comment: loading
            ? "We are loading recent customer feedback from completed orders."
            : "Customer reviews from completed orders will appear here once feedback starts coming in.",
        },
      ];

  return (
    <Box
      sx={{
        py: 10,
        background: "transparent",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          opacity: mode === "dark" ? 0.16 : 0.24,
          backgroundImage: `
          linear-gradient(${alpha(theme.palette.divider, 0.4)} 1px, transparent 1px),
          linear-gradient(90deg, ${alpha(theme.palette.divider, 0.4)} 1px, transparent 1px)
        `,
          backgroundSize: "88px 88px",
        }}
      />
      <Container maxWidth="lg">
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Typography
            variant="h6"
            sx={{
              color: theme.palette.primary.main,
              fontWeight: 600,
              fontFamily: "JUST Sans ExBold",
              textTransform: "uppercase",
              letterSpacing: 2,
              fontSize: { xs: "0.82rem", md: "1.05rem" },
            }}
          >
            Customer Reviews
          </Typography>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 600,
              color: theme.palette.text.primary,
              mt: 1,
              fontFamily: "JUST Sans ExBold",
              fontSize: { xs: "1.95rem", md: "3.1rem" },
            }}
          >
            What paying customers say
          </Typography>
          <Typography
            sx={{
              color: theme.palette.text.secondary,
              maxWidth: 760,
              mx: "auto",
              mt: 2,
              fontFamily: "JUST Sans Regular",
              lineHeight: 1.8,
            }}
          >
            Real ratings and comments submitted after successful product and package payments on EchiSolar.
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {cards.map((review) => (
            <Grid size={{ xs: 12, md: cards.length === 1 ? 12 : cards.length === 2 ? 6 : 4 }} key={review.id}>
              <Card
                sx={{
                  p: 3,
                  height: "100%",
                  borderRadius: 4,
                  border: `1px solid ${theme.palette.divider}`,
                  background: mode === "dark" ? alpha("#10202A", 0.76) : alpha("#FFFFFF", 0.82),
                  color: theme.palette.text.primary,
                  position: "relative",
                  overflow: "hidden",
                  boxShadow: mode === "dark" ? "0 20px 48px rgba(3,10,18,0.24)" : "0 18px 46px rgba(15,23,42,0.08)",
                  transition: "transform .28s ease, box-shadow .28s ease, border-color .28s ease",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    borderColor: alpha(theme.palette.primary.main, 0.28),
                    boxShadow: mode === "dark" ? "0 24px 54px rgba(3,10,18,0.3)" : "0 22px 50px rgba(15,23,42,0.12)",
                  },
                }}
              >
                <QuoteIcon
                  sx={{
                    position: "absolute",
                    right: 16,
                    top: 16,
                    fontSize: 42,
                    color: theme.palette.secondary.main,
                    opacity: 0.08,
                  }}
                />
                <CardContent sx={{ p: 0 }}>
                  <Rating value={review.rating} readOnly sx={{ mb: 2 }} />
                  <Typography sx={{ mb: 2, color: theme.palette.text.primary, fontFamily: "JUST Sans Regular", lineHeight: 1.8 }}>
                    "{review.comment}"
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", mt: 3 }}>
                    <Avatar
                      sx={{
                        mr: 2,
                        width: 50,
                        height: 50,
                        border: `2px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                        bgcolor: alpha(theme.palette.primary.main, 0.18),
                        color: theme.palette.text.primary,
                        fontFamily: "JUST Sans ExBold",
                      }}
                    >
                      {getInitials(review.reviewerName)}
                    </Avatar>
                    <Box>
                      <Typography sx={{ fontWeight: 700, fontFamily: "JUST Sans ExBold" }}>{review.reviewerName}</Typography>
                      <Typography sx={{ color: theme.palette.text.secondary, fontFamily: "JUST Sans Regular" }}>
                        {review.itemType === "package" ? "Package Experience" : "Product Feedback"} • {review.itemName}
                      </Typography>
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
