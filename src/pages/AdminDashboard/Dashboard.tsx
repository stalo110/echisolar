import {
  Box,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import AdminLayout from "../../components/Admin/AdminLayout";

const brandAmber = "#FFAB46";
const brandGreen = "#2E7D4D";

const AdminDashboard = () => {
  return (
    <AdminLayout>
      <Box sx={{ bgcolor: "#0D0D0D", minHeight: "100vh", p: { xs: 2, sm: 3 } }}>
        {/* Header */}
        <Typography
          variant="h5"
          sx={{
            fontWeight: "bold",
            color: brandAmber,
            mb: 4,
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
                  background:
                    "linear-gradient(145deg, rgba(255,171,70,0.1), rgba(46,125,77,0.15))",
                  color: "#fff",
                  backdropFilter: "blur(8px)",
                  boxShadow: "0 0 20px rgba(0,0,0,0.4)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: `0 0 25px ${brandAmber}`,
                  },
                }}
              >
                <Typography variant="subtitle2" sx={{ opacity: 0.7 }}>
                  {card.title}
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: "bold" }}>
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
            background: "linear-gradient(145deg, #181818, #1F1F1F)",
            color: "#fff",
            boxShadow: "0 0 25px rgba(0,0,0,0.5)",
          }}
        >
          <Typography variant="h6" sx={{ mb: 2, color: brandGreen }}>
            Sales Analytics (Coming Soon)
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.7 }}>
            Visual charts for revenue growth, top products, and order trends
            will appear here.
          </Typography>
        </Paper>
      </Box>
    </AdminLayout>
  );
};

export default AdminDashboard;
