import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "material-react-toastify";
import TopNav from "../navigation/TopNav";
import Footer from "../navigation/Footer";
import { useTheme } from "../contexts/ThemeContext";
import { useCart } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthContext";
import {
  fetchPackages,
  optInForCustomPackage,
  type SolarPackage,
} from "../services/packageService";
import { buildWhatsAppMessageUrl } from "../config/company";

const formatCurrency = (amount: number) => `₦${Number(amount).toLocaleString()}`;

const toneByName = (name: string) => {
  const lower = name.toLowerCase();
  if (lower.includes("gold")) return "linear-gradient(135deg, #f7c64f 0%, #f39c12 100%)";
  if (lower.includes("silver")) return "linear-gradient(135deg, #d3d3d3 0%, #a7a7a7 100%)";
  if (lower.includes("platinum")) return "linear-gradient(135deg, #dce8f6 0%, #98a9c2 100%)";
  return "linear-gradient(135deg, #7db6ff 0%, #4678b3 100%)";
};

const Packages = () => {
  const { theme, mode } = useTheme();
  const { add } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [packages, setPackages] = useState<SolarPackage[]>([]);

  useEffect(() => {
    fetchPackages()
      .then((data) => setPackages(data))
      .catch(() => setPackages([]));
  }, []);

  const featured = useMemo(() => packages.slice(0, 3), [packages]);
  const nonFeatured = useMemo(
    () => packages.filter((pkg) => !featured.some((item) => item.id === pkg.id)),
    [packages, featured]
  );

  const handleAddPackageToCart = (pkg: SolarPackage) => {
    if (pkg.price === null || pkg.requiresCustomPrice) {
      toast.info("This package requires a custom quote.");
      return;
    }

    add({
      itemType: "package",
      packageId: String(pkg.id),
      name: pkg.name,
      price: Number(pkg.price),
      quantity: 1,
    });
  };

  const handleCustomRequest = async (pkg: SolarPackage) => {
    const message = `Hello Echisolar, I want a custom quote for the ${pkg.name} package.`;
    const fallbackLink = pkg.whatsappLink || buildWhatsAppMessageUrl(message);

    if (!isAuthenticated) {
      window.open(fallbackLink, "_blank", "noopener,noreferrer");
      toast.info("Sign in to track this package request in your dashboard.");
      return;
    }

    try {
      const result = await optInForCustomPackage(pkg.id);
      const whatsappLink = result.whatsappLink || fallbackLink;
      toast.success("Request recorded. Redirecting to WhatsApp...");
      window.open(whatsappLink, "_blank", "noopener,noreferrer");
    } catch (err: any) {
      toast.error(err?.response?.data?.error || "Unable to submit request right now.");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: theme.palette.background.default,
        color: theme.palette.text.primary,
      }}
    >
      <TopNav />

      <Box
        sx={{
          position: "relative",
          overflow: "hidden",
          background:
            mode === "dark"
              ? "radial-gradient(circle at 20% 20%, rgba(247,198,79,0.2), transparent 50%), radial-gradient(circle at 80% 80%, rgba(46,125,77,0.22), transparent 50%), #0b1016"
              : "radial-gradient(circle at 20% 20%, rgba(247,198,79,0.24), transparent 50%), radial-gradient(circle at 80% 80%, rgba(46,125,77,0.18), transparent 50%), #f6faf7",
        }}
      >
        <Container sx={{ py: { xs: 6, md: 10 } }}>
          <Typography
            variant="overline"
            sx={{
              letterSpacing: "0.22em",
              color: theme.palette.secondary.main,
              fontFamily: "JUST Sans ExBold",
            }}
          >
            ECHISOLAR TIERS
          </Typography>
          <Typography
            variant="h2"
            sx={{
              mt: 1,
              maxWidth: 760,
              fontSize: { xs: "2.1rem", md: "3.6rem" },
              lineHeight: 1.05,
              fontFamily: "JUST Sans ExBold",
            }}
          >
            Power packages built for every stage.
          </Typography>
          <Typography
            sx={{
              mt: 2,
              maxWidth: 700,
              color: theme.palette.text.secondary,
              fontSize: "1.05rem",
              fontFamily: "JUST Sans Regular",
            }}
          >
            Choose a fixed-price package to checkout instantly, or request a custom quote for advanced energy requirements.
          </Typography>

          <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ mt: 4 }}>
            <Button
              variant="contained"
              onClick={() => navigate("/cart")}
              sx={{
                px: 3,
                py: 1.2,
                textTransform: "none",
                fontFamily: "JUST Sans ExBold",
                bgcolor: theme.palette.primary.main,
                color: mode === "dark" ? "#000" : "#fff",
              }}
            >
              View Cart
            </Button>
            <Button
              variant="outlined"
              onClick={() => navigate("/checkout")}
              sx={{
                px: 3,
                py: 1.2,
                textTransform: "none",
                fontFamily: "JUST Sans ExBold",
              }}
            >
              Proceed to Checkout
            </Button>
          </Stack>
        </Container>
      </Box>

      <Container sx={{ py: { xs: 4, md: 8 } }}>
        <Grid container spacing={3} sx={{ mb: 5 }}>
          {featured.map((pkg) => (
            <Grid size={{ xs: 12, md: 4 }} key={`featured-${pkg.id}`}>
              <Card
                sx={{
                  borderRadius: 3,
                  border: `1px solid ${theme.palette.divider}`,
                  background: theme.palette.background.paper,
                  boxShadow:
                    mode === "dark"
                      ? "0 12px 26px rgba(0,0,0,0.35)"
                      : "0 12px 26px rgba(10, 31, 22, 0.12)",
                }}
              >
                <Box sx={{ p: 2 }}>
                  <Chip
                    label={pkg.requiresCustomPrice ? "Custom Quote" : "Fixed Price"}
                    sx={{
                      background: toneByName(pkg.name),
                      color: "#111",
                      fontFamily: "JUST Sans ExBold",
                    }}
                  />
                </Box>
                <CardMedia
                  component="img"
                  image={pkg.images[0] || "/images/solar.jpg"}
                  alt={pkg.name}
                  sx={{ height: 210, objectFit: "cover" }}
                />
                <CardContent>
                  <Typography variant="h5" sx={{ fontFamily: "JUST Sans ExBold" }}>
                    {pkg.name}
                  </Typography>
                  <Typography sx={{ mt: 1, color: theme.palette.text.secondary, fontFamily: "JUST Sans Regular" }}>
                    {pkg.description || "Comprehensive solar package tailored for reliable energy output."}
                  </Typography>
                  <Typography
                    sx={{
                      mt: 2,
                      fontSize: "1.15rem",
                      color: theme.palette.primary.main,
                      fontFamily: "JUST Sans ExBold",
                    }}
                  >
                    {pkg.requiresCustomPrice || pkg.price === null
                      ? "Price on request"
                      : formatCurrency(Number(pkg.price))}
                  </Typography>
                </CardContent>
                <CardActions sx={{ p: 2, pt: 0 }}>
                  {pkg.requiresCustomPrice || pkg.price === null ? (
                    <Button
                      fullWidth
                      variant="contained"
                      onClick={() => handleCustomRequest(pkg)}
                      sx={{
                        textTransform: "none",
                        fontFamily: "JUST Sans ExBold",
                        bgcolor: "#25D366",
                        color: "#fff",
                        "&:hover": { bgcolor: "#1dbb57" },
                      }}
                    >
                      Request for Custom Price
                    </Button>
                  ) : (
                    <Button
                      fullWidth
                      variant="contained"
                      onClick={() => handleAddPackageToCart(pkg)}
                      sx={{
                        textTransform: "none",
                        fontFamily: "JUST Sans ExBold",
                        bgcolor: theme.palette.secondary.main,
                        color: mode === "dark" ? "#111" : "#000",
                      }}
                    >
                      Add Package to Cart
                    </Button>
                  )}
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>

        {nonFeatured.length > 0 && (
          <>
            <Typography
              variant="h4"
              sx={{
                fontFamily: "JUST Sans ExBold",
                color: theme.palette.primary.main,
                mb: 3,
              }}
            >
              All Packages
            </Typography>

            <Grid container spacing={3}>
              {nonFeatured.map((pkg) => (
                <Grid size={{ xs: 12, sm: 6, lg: 4 }} key={pkg.id}>
                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      borderRadius: 3,
                      border: `1px solid ${theme.palette.divider}`,
                      background: theme.palette.background.paper,
                    }}
                  >
                    <CardMedia
                      component="img"
                      image={pkg.images[0] || "/images/solar.jpg"}
                      alt={pkg.name}
                      sx={{ height: 190, objectFit: "cover" }}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography variant="h6" sx={{ fontFamily: "JUST Sans ExBold" }}>
                        {pkg.name}
                      </Typography>
                      <Typography sx={{ mt: 1, color: theme.palette.text.secondary, fontFamily: "JUST Sans Regular" }}>
                        {pkg.description || "No package description provided yet."}
                      </Typography>
                      <Typography sx={{ mt: 2, color: theme.palette.primary.main, fontFamily: "JUST Sans ExBold" }}>
                        {pkg.requiresCustomPrice || pkg.price === null
                          ? "Custom pricing"
                          : formatCurrency(Number(pkg.price))}
                      </Typography>
                    </CardContent>
                    <CardActions sx={{ p: 2, pt: 0 }}>
                      {pkg.requiresCustomPrice || pkg.price === null ? (
                        <Button
                          fullWidth
                          variant="outlined"
                          onClick={() => handleCustomRequest(pkg)}
                          sx={{ textTransform: "none", fontFamily: "JUST Sans ExBold" }}
                        >
                          Request for Custom Price
                        </Button>
                      ) : (
                        <Button
                          fullWidth
                          variant="contained"
                          onClick={() => handleAddPackageToCart(pkg)}
                          sx={{ textTransform: "none", fontFamily: "JUST Sans ExBold" }}
                        >
                          Add to Cart
                        </Button>
                      )}
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </>
        )}

        {packages.length === 0 && (
          <Typography sx={{ color: theme.palette.text.secondary, fontFamily: "JUST Sans Regular" }}>
            No packages available yet.
          </Typography>
        )}
      </Container>

      <Footer />
    </Box>
  );
};

export default Packages;
