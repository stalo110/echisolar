import { Box, Container, Typography, Grid, Card, CardContent, Avatar } from "@mui/material";
import { useTheme } from "../../contexts/ThemeContext";

export const TeamSection = () => {
  const { theme, mode } = useTheme();
  
  const teamMembers = [
    {
      name: "David Okafor",
      title: "Chief Executive Officer",
      image: "/images/team.jpg"
    },
    {
      name: "Sarah Johnson",
      title: "Chief Technology Officer",
      image: "/images/team.jpg"
    },
    {
      name: "Michael Chen",
      title: "Head of Engineering",
      image: "/images/team.jpg"
    },
    {
      name: "Emily Rodriguez",
      title: "Operations Manager",
      image: "/images/team.jpg"
    },
    {
      name: "James Wilson",
      title: "Sales Director",
      image: "/images/team.jpg"
    }
  ];

  return (
    <Box sx={{ py: 10, background: mode === 'dark' ? "#070707" : "#f8f9fa" }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Typography variant="h6" sx={{ color: theme.palette.primary.main, fontWeight: 800, fontFamily: "JUST Sans ExBold", textTransform: "uppercase", letterSpacing: 2, fontSize: { xs: "0.9rem", md: "1.25rem" } }}>
            Our Team
          </Typography>
          <Typography variant="h2" sx={{ fontWeight: 800, color: theme.palette.text.primary, mt: 1, fontFamily: "JUST Sans ExBold", fontSize: { xs: "2.2rem", md: "3.8rem" } }}>
            Meet the Experts Behind EchiSolar
          </Typography>
          <Typography sx={{ color: theme.palette.text.secondary, maxWidth: 700, mx: "auto", mt: 2, fontFamily: "JUST Sans Regular" }}>
            Our dedicated team of professionals brings years of experience in renewable energy, engineering, and customer service.
          </Typography>
        </Box>

        <Grid container spacing={4} justifyContent="center">
          {teamMembers.map((member, i) => (
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2.4 }} key={i}>
              <Card
                sx={{
                  height: "100%",
                  p: 3,
                  background: theme.palette.background.paper,
                  color: theme.palette.text.primary,
                  borderRadius: 3,
                  textAlign: "center",
                  transition: "transform .28s ease, box-shadow .28s ease",
                  border: `1px solid ${theme.palette.divider}`,
                  animation: `fadeInScale 0.6s ease-out ${i * 0.1}s both`,
                  "@keyframes fadeInScale": {
                    "0%": { opacity: 0, transform: "scale(0.8)" },
                    "100%": { opacity: 1, transform: "scale(1)" }
                  },
                  "&:hover": {
                    transform: "translateY(-10px)",
                    boxShadow: mode === 'dark' ? "0 22px 50px rgba(0,0,0,0.6)" : "0 22px 50px rgba(0,0,0,0.15)"
                  }
                }}
              >
                <CardContent>
                  <Avatar
                    src={member.image}
                    alt={member.name}
                    sx={{
                      width: 100,
                      height: 100,
                      mx: "auto",
                      mb: 2,
                      border: `3px solid ${theme.palette.primary.main}`,
                      boxShadow: `0 0 20px ${theme.palette.primary.main}30`,
                      animation: "glow 2s ease-in-out infinite alternate",
                      "@keyframes glow": {
                        "0%": { boxShadow: `0 0 20px ${theme.palette.primary.main}30` },
                        "100%": { boxShadow: `0 0 30px ${theme.palette.primary.main}50` }
                      }
                    }}
                  />
                  <Typography variant="h6" sx={{ fontWeight: 800, mb: 1, fontFamily: "JUST Sans ExBold", color: theme.palette.text.primary }}>
                    {member.name}
                  </Typography>
                  <Typography sx={{ color: theme.palette.secondary.main, fontFamily: "JUST Sans Regular", fontWeight: 600 }}>
                    {member.title}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};