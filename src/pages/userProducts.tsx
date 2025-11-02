// import { Box, Container, Typography, Grid, Paper, Button } from "@mui/material";
// import TopNav from "../navigation/TopNav";
// import Footer from "../navigation/Footer";

// const Products = () => {
//   const products = [
//     { name: "Luxury Hair Serum", price: "$60", status: "Delivered", image: "/images/product1.jpg" },
//     { name: "Moisture Lock Conditioner", price: "$45", status: "Shipped", image: "/images/product2.jpg" },
//   ];

//   return (
//     <Box sx={{ bgcolor: "#0B0C10", color: "#fff", minHeight: "100vh" }}>
//       <TopNav />
//       <Container sx={{ py: 6 }}>
//         <Typography variant="h4" sx={{ fontWeight: "700", color: "#C79B3B", mb: 4 }}>
//           My Products
//         </Typography>

//         <Grid container spacing={3}>
//           {products.map((product, index) => (
//             <Grid item xs={12} sm={6} md={4} key={index}>
//               <Paper
//                 sx={{
//                   p: 3,
//                   bgcolor: "#1F2833",
//                   borderRadius: 3,
//                   textAlign: "center",
//                   transition: "0.3s",
//                   "&:hover": {
//                     transform: "translateY(-5px)",
//                     boxShadow: "0 0 20px rgba(199,155,59,0.2)",
//                   },
//                 }}
//               >
//                 <Box
//                   component="img"
//                   src={product.image}
//                   alt={product.name}
//                   sx={{
//                     width: "100%",
//                     height: 160,
//                     objectFit: "cover",
//                     borderRadius: 2,
//                     mb: 2,
//                   }}
//                 />
//                 <Typography variant="h6">{product.name}</Typography>
//                 <Typography sx={{ color: "#C79B3B", mb: 1 }}>{product.price}</Typography>
//                 <Typography variant="body2" sx={{ color: "#ccc", mb: 2 }}>
//                   Status: {product.status}
//                 </Typography>
//                 <Button
//                   variant="contained"
//                   sx={{
//                     bgcolor: "#C79B3B",
//                     color: "#000",
//                     fontWeight: "600",
//                     "&:hover": { bgcolor: "#e1b860" },
//                   }}
//                 >
//                   View Details
//                 </Button>
//               </Paper>
//             </Grid>
//           ))}
//         </Grid>
//       </Container>
//       <Footer />
//     </Box>
//   );
// };

// export default Products;


import { Box, Container, Typography, Grid, Paper, Button } from "@mui/material";
import TopNav from "../navigation/TopNav";
import Footer from "../navigation/Footer";
import DashboardSidebar from "../components/DashboardSidebar";

const Products = () => {
  const products = [
    { name: "Luxury Hair Serum", price: "$60", status: "Delivered", image: "/images/product1.jpg" },
    { name: "Moisture Lock Conditioner", price: "$45", status: "Shipped", image: "/images/product2.jpg" },
  ];

  return (
    <Box sx={{ bgcolor: "#0B0C10", color: "#fff", minHeight: "100vh" }}>
      <TopNav />
      <Container sx={{ py: 6 }}>
        <Grid container spacing={3}>
          {/* Sidebar */}
          <Grid size={{xs:12, md:3}}>
            <DashboardSidebar />
          </Grid>

          {/* Product Cards */}
          <Grid size={{xs:12, md:9}}>
            <Typography variant="h4" sx={{ fontWeight: "700", color: "#C79B3B", mb: 4 }}>
              My Products
            </Typography>

            <Grid container spacing={3}>
              {products.map((product, index) => (
                <Grid size={{xs:12, sm:6, md:4}} key={index}>
                  <Paper
                    sx={{
                      p: 3,
                      bgcolor: "#1F2833",
                      borderRadius: 3,
                      textAlign: "center",
                      transition: "0.3s",
                      "&:hover": {
                        transform: "translateY(-5px)",
                        boxShadow: "0 0 20px rgba(199,155,59,0.2)",
                      },
                    }}
                  >
                    <Box
                      component="img"
                      src={product.image}
                      alt={product.name}
                      sx={{
                        width: "100%",
                        height: 160,
                        objectFit: "cover",
                        borderRadius: 2,
                        mb: 2,
                      }}
                    />
                    <Typography variant="h6">{product.name}</Typography>
                    <Typography sx={{ color: "#C79B3B", mb: 1 }}>{product.price}</Typography>
                    <Typography variant="body2" sx={{ color: "#ccc", mb: 2 }}>
                      Status: {product.status}
                    </Typography>
                    <Button
                      variant="contained"
                      sx={{
                        bgcolor: "#C79B3B",
                        color: "#000",
                        fontWeight: "600",
                        "&:hover": { bgcolor: "#e1b860" },
                      }}
                    >
                      View Details
                    </Button>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </Box>
  );
};

export default Products;
