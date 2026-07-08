import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import type { SolarPackage } from "../../services/packageService";
import { useTheme } from "../../contexts/ThemeContext";

interface PackageModalProps {
  pkg: SolarPackage;
  open: boolean;
  onClose: () => void;
  onAddToCart: () => void;
  onCustomRequest: () => void;
}

const toneByName = (name: string) => {
  const lower = name.toLowerCase();
  if (lower.includes("gold")) return "linear-gradient(135deg, #f7c64f 0%, #f39c12 100%)";
  if (lower.includes("silver")) return "linear-gradient(135deg, #d3d3d3 0%, #a7a7a7 100%)";
  if (lower.includes("platinum")) return "linear-gradient(135deg, #dce8f6 0%, #98a9c2 100%)";
  return "linear-gradient(135deg, #7db6ff 0%, #4678b3 100%)";
};

const PackageModal = ({ pkg, open, onClose, onAddToCart, onCustomRequest }: PackageModalProps) => {
  const { theme, mode } = useTheme();
  const images = pkg.images.length ? pkg.images : ["/images/solar.jpg"];
  const [mainImage, setMainImage] = useState(images[0]);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          background: mode === "dark" ? "linear-gradient(180deg, #0A0A0A, #111)" : "linear-gradient(180deg, #ffffff, #f8f9fa)",
          color: theme.palette.text.primary,
          borderRadius: 3,
          border: `1px solid ${theme.palette.divider}`,
          boxShadow: `0 0 25px ${theme.palette.primary.main}20`,
        },
      }}
    >
      <DialogTitle>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              background: "linear-gradient(90deg, #FFAB46, #FFD18A)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontFamily: "JUST Sans ExBold",
            }}
          >
            {pkg.name}
          </Typography>
          <IconButton onClick={onClose} sx={{ color: theme.palette.text.primary }}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 4 }}>
          {/* Image gallery */}
          <Box sx={{ flex: 1 }}>
            <Box
              component="img"
              src={mainImage}
              alt={pkg.name}
              sx={{ width: "100%", borderRadius: 2, maxHeight: 320, objectFit: "cover", boxShadow: "0 0 20px rgba(255,171,70,0.2)" }}
            />
            {images.length > 1 && (
              <Stack direction="row" spacing={1} sx={{ mt: 1.5, overflowX: "auto", "&::-webkit-scrollbar": { display: "none" } }}>
                {images.map((src, i) => (
                  <Box
                    key={i}
                    component="img"
                    src={src}
                    alt={`thumb-${i}`}
                    onClick={() => setMainImage(src)}
                    sx={{
                      width: 68, height: 52, objectFit: "cover", borderRadius: 1.5, flexShrink: 0, cursor: "pointer",
                      border: src === mainImage ? `2px solid ${theme.palette.primary.main}` : `1px solid ${theme.palette.divider}`,
                      opacity: src === mainImage ? 1 : 0.7,
                      transition: "opacity 0.2s",
                    }}
                  />
                ))}
              </Stack>
            )}
          </Box>

          {/* Details */}
          <Box sx={{ flex: 1 }}>
            <Chip
              label={pkg.requiresCustomPrice ? "Custom Quote" : "Fixed Price"}
              sx={{ background: toneByName(pkg.name), color: "#111", fontFamily: "JUST Sans ExBold", mb: 2 }}
            />
            <Typography variant="h6" sx={{ fontFamily: "JUST Sans ExBold", color: theme.palette.primary.main, mb: 1 }}>
              {pkg.requiresCustomPrice || pkg.price === null
                ? "Price on request"
                : `₦${Number(pkg.price).toLocaleString()}`}
            </Typography>
            <Typography sx={{ color: theme.palette.text.secondary, fontFamily: "JUST Sans Regular", lineHeight: 1.8, mb: 3 }}>
              {pkg.description || "Comprehensive solar package tailored for reliable energy output."}
            </Typography>

            {pkg.requiresCustomPrice || pkg.price === null ? (
              <Button
                fullWidth
                variant="contained"
                onClick={() => { onCustomRequest(); onClose(); }}
                sx={{ textTransform: "none", fontFamily: "JUST Sans ExBold", bgcolor: "#25D366", color: "#fff", "&:hover": { bgcolor: "#1dbb57" } }}
              >
                Request for Custom Price
              </Button>
            ) : (
              <Button
                fullWidth
                variant="contained"
                onClick={() => { onAddToCart(); onClose(); }}
                sx={{ textTransform: "none", fontFamily: "JUST Sans ExBold", bgcolor: theme.palette.secondary.main, color: mode === "dark" ? "#111" : "#000" }}
              >
                Add Package to Cart
              </Button>
            )}
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default PackageModal;
