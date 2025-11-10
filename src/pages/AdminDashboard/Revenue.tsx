import { Box, Typography, Paper, Grid, LinearProgress } from "@mui/material";
import AdminLayout from "../../components/Admin/AdminLayout";

const brandAmber = "#FFAB46";
const brandGreen = "#2E7D4D";

const Revenue = () => (
  <AdminLayout>
      <Box sx={{ p: 3, bgcolor: "#0D0D0D", color: "#fff", minHeight: "100vh" }}>
    <Typography variant="h5" sx={{ color: brandAmber, mb: 3, fontFamily: "JUST Sans ExBold" }}>
      Revenue & Analytics
    </Typography>

    <Grid container spacing={3}>
      <Grid size={{ xs: 12, md: 4 }}>
        <Paper
          sx={{
            p: 3,
            borderRadius: 3,
            background: "linear-gradient(145deg, rgba(255,171,70,0.1), rgba(46,125,77,0.15))",
            boxShadow: "0 0 20px rgba(0,0,0,0.4)",
          }}
        >
          <Typography variant="subtitle1" sx={{color:"#ffffff", fontFamily: "JUST Sans Regular"}}>Total Revenue</Typography>
          <Typography variant="h5" sx={{ color: brandAmber, fontWeight: "bold", fontFamily: "JUST Sans ExBold" }}>
            ₦5.4M
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.7, color:"#ffffff", fontFamily: "JUST Sans Regular" }}>
            +12% from last month
          </Typography>
        </Paper>
      </Grid>

      <Grid size={{ xs: 12, md: 8 }}>
        <Paper
          sx={{
            p: 3,
            borderRadius: 3,
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <Typography variant="subtitle1" sx={{ mb: 1, color:"#ffffff", fontFamily: "JUST Sans ExBold" }}>
            Monthly Growth
          </Typography>
          <LinearProgress
            variant="determinate"
            value={72}
            sx={{
              height: 10,
              borderRadius: 5,
              bgcolor: "rgba(255,255,255,0.1)",
              "& .MuiLinearProgress-bar": { bgcolor: brandGreen },
            }}
          />
          <Typography variant="caption" sx={{ mt: 1, display: "block", color: brandGreen, fontFamily: "JUST Sans Regular" }}>
            72% of goal achieved
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  </Box>
  </AdminLayout>

);

export default Revenue;
