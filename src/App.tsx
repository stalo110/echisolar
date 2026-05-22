import { Box } from "@mui/material";
import "./App.css";
import { Navigation } from "./navigation";
import ScrollToTop from "./components/Home/ScrollToTop";
import { AuthProvider } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/CartContext";
import { ToastContainer } from "material-react-toastify";
import "material-react-toastify/dist/ReactToastify.css";
import { ConsentBanner } from "./ConsentBanner";
import WhatsAppFloatingButton from "./components/WhatsAppFloatingButton";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Box>
          <ScrollToTop />
          <Navigation />
          <ToastContainer />
          <WhatsAppFloatingButton />
          <ConsentBanner />
        </Box>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
