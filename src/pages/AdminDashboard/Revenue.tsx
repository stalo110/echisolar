import { Box, Typography, Paper, Grid, LinearProgress } from "@mui/material";
import AdminLayout from "../../components/Admin/AdminLayout";
import { useTheme } from "../../contexts/ThemeContext";

const Revenue = () => {
  const { theme, mode } = useTheme();
  
  return (
    <AdminLayout>
      <Box sx={{ p: 3, bgcolor: theme.palette.background.default, color: theme.palette.text.primary, minHeight: "100vh" }}>
        <Typography variant="h5" sx={{ color: theme.palette.primary.main, mb: 3, fontFamily: "JUST Sans ExBold" }}>
          Revenue & Analytics
        </Typography>

        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Paper
              sx={{
                p: 3,
                borderRadius: 3,
                background: theme.palette.background.paper,
                boxShadow: mode === 'dark' ? "0 0 20px rgba(0,0,0,0.4)" : "0 0 20px rgba(0,0,0,0.1)",
              }}
            >
              <Typography variant="subtitle1" sx={{color: theme.palette.text.primary, fontFamily: "JUST Sans Regular"}}>Total Revenue</Typography>
              <Typography variant="h5" sx={{ color: theme.palette.primary.main, fontWeight: "bold", fontFamily: "JUST Sans ExBold" }}>
                ₦5.4M
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.7, color: theme.palette.text.secondary, fontFamily: "JUST Sans Regular" }}>
                +12% from last month
              </Typography>
            </Paper>
          </Grid>

          <Grid size={{ xs: 12, md: 8 }}>
            <Paper
              sx={{
                p: 3,
                borderRadius: 3,
                background: theme.palette.background.paper,
                border: `1px solid ${theme.palette.divider}`,
              }}
            >
              <Typography variant="subtitle1" sx={{ mb: 1, color: theme.palette.text.primary, fontFamily: "JUST Sans ExBold" }}>
                Monthly Growth
              </Typography>
              <LinearProgress
                variant="determinate"
                value={72}
                sx={{
                  height: 10,
                  borderRadius: 5,
                  bgcolor: theme.palette.divider,
                  "& .MuiLinearProgress-bar": { bgcolor: theme.palette.secondary.main },
                }}
              />
              <Typography variant="caption" sx={{ mt: 1, display: "block", color: theme.palette.secondary.main, fontFamily: "JUST Sans Regular" }}>
                72% of goal achieved
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </AdminLayout>
  );
};

export default Revenue;