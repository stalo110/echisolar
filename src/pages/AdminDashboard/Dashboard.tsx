import {
  Box,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import AdminLayout from "../../components/Admin/AdminLayout";
import { useTheme } from "../../contexts/ThemeContext";

const AdminDashboard = () => {
  const { theme, mode } = useTheme();

  return (
    <AdminLayout>
      <Box sx={{ bgcolor: theme.palette.background.default, minHeight: "100vh", p: { xs: 2, sm: 3 } }}>
        {/* Header */}
        <Typography
          variant="h5"
          sx={{
            fontWeight: "bold",
            color: theme.palette.primary.main,
            mb: 4,
            fontFamily: "JUST Sans ExBold",
          }}
        >
          Dashboard Overview
        </Typography>

        {/* Summary Cards */}
        <Grid container spacing={3}>
          {[
            { title: "Total Sales", value: "₦2.3M" },
            { title: "Orders", value: "432" },
            { title: "Users", value: "1,248" },
            { title: "Products", value: "76" },
          ].map((card, index) => (
            <Grid size={{xs:12, sm:6, md:3}} key={index}>
              <Paper
                sx={{
                  p: 3,
                  borderRadius: 3,
                  background: theme.palette.background.paper,
                  color: theme.palette.text.primary,
                  backdropFilter: "blur(8px)",
                  boxShadow: mode === 'dark' ? "0 0 20px rgba(0,0,0,0.4)" : "0 0 20px rgba(0,0,0,0.1)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: `0 0 25px ${theme.palette.primary.main}40`,
                  },
                }}
              >
                <Typography variant="subtitle2" sx={{ opacity: 0.7, fontFamily: "JUST Sans Regular" }}>
                  {card.title}
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: "bold", fontFamily: "JUST Sans ExBold" }}>
                  {card.value}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* Analytics Section */}
        <Paper
          sx={{
            mt: 5,
            p: 4,
            borderRadius: 3,
            background: theme.palette.background.paper,
            color: theme.palette.text.primary,
            boxShadow: mode === 'dark' ? "0 0 25px rgba(0,0,0,0.5)" : "0 0 25px rgba(0,0,0,0.1)",
          }}
        >
          <Typography variant="h6" sx={{ mb: 2, color: theme.palette.secondary.main, fontFamily: "JUST Sans ExBold" }}>
            Sales Analytics (Coming Soon)
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.7, fontFamily: "JUST Sans Regular" }}>
            Visual charts for revenue growth, top products, and order trends
            will appear here.
          </Typography>
        </Paper>
      </Box>
    </AdminLayout>
  );
};

export default AdminDashboard;