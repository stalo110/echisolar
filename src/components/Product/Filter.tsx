import {
  Box,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
} from "@mui/material";

const categories = ["Solar Panels", "Inverters", "Batteries", "Accessories"];

interface ProductFilterProps {
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
  setPriceRange: React.Dispatch<React.SetStateAction<string>>;
}

const ProductFilter = ({
  setQuery,
  setCategory,
  setPriceRange,
}: ProductFilterProps) => {
  return (
    <Box
      sx={{
        my: 6,
        p: 3,
        borderRadius: 3,
        background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,255,255,0.08)",
        backdropFilter: "blur(10px)",
        boxShadow: "0 0 20px rgba(0,0,0,0.3)",
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
              input: { color: "#fff" },
              label: { color: "rgba(255,255,255,0.7)" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "rgba(255,255,255,0.2)" },
                "&:hover fieldset": { borderColor: "#FFAB46" },
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
            onChange={(e) => setPriceRange(e.target.value)}
            sx={{
              input: { color: "#fff" },
              label: { color: "rgba(255,255,255,0.7)" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "rgba(255,255,255,0.2)" },
                "&:hover fieldset": { borderColor: "#FFAB46" },
              },
            }}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <FormControl fullWidth variant="outlined">
            <InputLabel sx={{ color: "rgba(255,255,255,0.7)" }}>
              Category
            </InputLabel>
            <Select
              label="Category"
             onChange={(e) => setCategory(e.target.value as string)}
              sx={{
                color: "#fff",
                ".MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgba(255,255,255,0.2)",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#FFAB46",
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
