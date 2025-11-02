import { Box, CssBaseline } from "@mui/material";
import "./App.css"
import { Navigation } from "./navigation";
import ScrollToTop from "./components/Home/ScrollToTop";
import { AuthProvider } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/CartContext";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: { main: '#2E7D4D' },
    secondary: { main: '#FFAB46' }
  },
  typography: {
    fontFamily: `var(--font-sans)`,
  }
});
import { ToastContainer } from 'material-react-toastify';
import 'material-react-toastify/dist/ReactToastify.css';
import { ConsentBanner } from "./ConsentBanner";


function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <CartProvider>
          <Box>
            <ScrollToTop />
            <Navigation />
            <ToastContainer />
            <ConsentBanner />
          </Box>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
