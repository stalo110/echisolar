import {
  Box,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
} from "@mui/material";
import { useTheme } from "../../contexts/ThemeContext";

const categories = ["Solar Panels", "Inverters", "Batteries", "Accessories"];

interface ProductFilterProps {
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
  setMaxPrice: React.Dispatch<React.SetStateAction<string>>;
}

const ProductFilter = ({
  setQuery,
  setCategory,
  setMaxPrice,
}: ProductFilterProps) => {
  const { theme, mode } = useTheme();

  return (
    <Box
      sx={{
        my: 6,
        p: 3,
        borderRadius: 3,
        background: theme.palette.background.paper,
        border: `1px solid ${theme.palette.divider}`,
        backdropFilter: "blur(10px)",
        boxShadow: mode === 'dark' ? "0 0 20px rgba(0,0,0,0.3)" : "0 0 20px rgba(0,0,0,0.1)",
      }}
    >
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, sm: 4 }}>
          <TextField
            fullWidth
            variant="outlined"
            label="Product Name"
            onChange={(e) => setQuery(e.target.value)}
            sx={{
              input: { color: theme.palette.text.primary },
              label: { color: theme.palette.text.secondary },
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: theme.palette.divider },
                "&:hover fieldset": { borderColor: theme.palette.primary.main },
              },
            }}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <TextField
            fullWidth
            variant="outlined"
            label="Max Price"
            type="number"
            onChange={(e) => setMaxPrice(e.target.value)}
            sx={{
              input: { color: theme.palette.text.primary },
              label: { color: theme.palette.text.secondary },
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: theme.palette.divider },
                "&:hover fieldset": { borderColor: theme.palette.primary.main },
              },
            }}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <FormControl fullWidth variant="outlined">
            <InputLabel sx={{ color: theme.palette.text.secondary }}>
              Category
            </InputLabel>
            <Select
              label="Category"
             onChange={(e) => setCategory(e.target.value as string)}
              sx={{
                color: theme.palette.text.primary,
                ".MuiOutlinedInput-notchedOutline": {
                  borderColor: theme.palette.divider,
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: theme.palette.primary.main,
                },
              }}
            >
              <MenuItem value="all">
                <em>All</em>
              </MenuItem>
              {categories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProductFilter;
