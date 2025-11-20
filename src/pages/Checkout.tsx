// import { Box, Container, Typography, Radio, RadioGroup, FormControlLabel, Paper, Button, Select, MenuItem } from "@mui/material";
// import TopNav from "../navigation/TopNav";
// import Footer from "../navigation/Footer";
// import { useState } from "react";
// import { useCart } from "../contexts/CartContext";
// import { useNavigate } from "react-router-dom";
// import StripePaymentForm from "../components/Payment/StripePaymentForm";
// import PaystackPaymentButton from "../components/Payment/PaystackPaymentButton";
// import { Elements } from '@stripe/react-stripe-js';
// import { loadStripe } from '@stripe/stripe-js';
// import { useAuth } from "../contexts/AuthContext";

// // Make sure to call loadStripe outside of a component’s render to avoid
// // recreating the Stripe object on every render.
// const stripePromise = loadStripe('pk_test_YOUR_STRIPE_PUBLISHABLE_KEY'); // Replace with your actual Stripe publishable key

// function scheduleInstallments(total: number, months: number){
//   const per = Math.round((total / months));
//   const schedule = [] as {monthOffset:number, amount:number}[];
//   for(let i=0;i<months;i++) schedule.push({ monthOffset: i+1, amount: per });
//   return schedule;
// }

// const Checkout = () => {
//   const [provider, setProvider] = useState('auto');
//   const [installment, setInstallment] = useState('full');
//   const { items, clear } = useCart();
//   const { user } = useAuth();
//   const navigate = useNavigate();
//   const total = items.reduce((s,i)=> s + i.price * i.quantity, 0);
//   const months = installment === '2' ? 2 : installment === '4' ? 4 : installment === '6' ? 6 : 1;
//   const schedule = scheduleInstallments(total, months);

//   const handlePaystackSuccess = (reference: any) => {
//     console.log(reference);
//     clear();
//     navigate('/payment/status?result=paid');
//   };

//   const handlePaystackClose = () => {
//     console.log('Payment closed');
//   };

//   const handleConfirmAndPay = () => {
//     if (provider === 'auto') {
//       // Logic to determine provider based on user location (e.g., IP lookup)
//       // For now, default to Paystack for Nigerian users and Stripe for others
//       // This is a placeholder and needs actual implementation
//       if (user?.email.endsWith('@nigeria.com')) { // Example logic
//         // Trigger Paystack
//       } else {
//         // Trigger Stripe
//       }
//     } else if (provider === 'paystack') {
//       // Paystack will be handled by the PaystackPaymentButton component
//     } else if (provider === 'stripe') {
//       // Stripe will be handled by the StripePaymentForm component
//     }

//     if(installment === 'full'){
//       // This part will be handled by the payment components
//     } else {
//       // create a fake subscription and redirect to subscription page / orders
//       navigate('/payment/status?result=subscription_created');
//     }
//   };

//   return (
//     <Box>
//       <TopNav />
//       <Container sx={{ py: 6 }}>
//         <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3 }}>Checkout</Typography>

//         <Paper sx={{ p: 3, mb: 3 }}>
//           <Typography variant="h6">Payment Provider</Typography>
//           <RadioGroup value={provider} onChange={(e) => setProvider(e.target.value)}>
//             <FormControlLabel value="auto" control={<Radio />} label="Auto (route by location)" />
//             <FormControlLabel value="paystack" control={<Radio />} label="Paystack (NG)" />
//             <FormControlLabel value="stripe" control={<Radio />} label="Stripe (International)" />
//           </RadioGroup>
//         </Paper>

//         <Paper sx={{ p: 3, mb: 3 }}>
//           <Typography variant="h6">Installment Options</Typography>
//           <Select value={installment} onChange={(e)=> setInstallment(e.target.value)} sx={{ mt:2 }}>
//             <MenuItem value="full">Pay in full</MenuItem>
//             <MenuItem value="2">2 installments (2 months)</MenuItem>
//             <MenuItem value="4">4 installments (4 months)</MenuItem>
//             <MenuItem value="6">6 installments (6 months)</MenuItem>
//           </Select>

//           {installment !== 'full' && (
//             <Box sx={{ mt: 2 }}>
//               <Typography variant="subtitle1">Schedule</Typography>
//               {schedule.map(s => (
//                 <Typography key={s.monthOffset} color="text.secondary">Month {s.monthOffset}: NGN {s.amount.toLocaleString()}</Typography>
//               ))}
//             </Box>
//           )}
//         </Paper>

//         {provider === 'stripe' && stripePromise && (
//           <Elements stripe={stripePromise}>
//             <StripePaymentForm />
//           </Elements>
//         )}

//         {provider === 'paystack' && user?.email && (
//           <PaystackPaymentButton
//             amount={total * 100} // Paystack amount is in kobo
//             email={user.email}
//             onSuccess={handlePaystackSuccess}
//             onClose={handlePaystackClose}
//           />
//         )}

//         {(provider === 'auto' || (provider === 'stripe' && !stripePromise) || (provider === 'paystack' && !user?.email)) && (
//           <Box sx={{ mt: 2 }}>
//             <Button variant="contained" color="success" onClick={handleConfirmAndPay}>
//               Confirm & Pay
//             </Button>
//           </Box>
//         )}
//       </Container>
//       <Footer />
//     </Box>
//   )
// }

// export default Checkout;

import {
  Box,
  Container,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  Paper,
  Button,
  Select,
  MenuItem,
  Divider,
} from "@mui/material";
import TopNav from "../navigation/TopNav";
import Footer from "../navigation/Footer";
import { useState } from "react";
import { useCart } from "../contexts/CartContext";
import { useNavigate } from "react-router-dom";
import StripePaymentForm from "../components/Payment/StripePaymentForm";
import PaystackPaymentButton from "../components/Payment/PaystackPaymentButton";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useAuth } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemeContext";

// 🪙 Stripe setup
const stripePromise = loadStripe("pk_test_YOUR_STRIPE_PUBLISHABLE_KEY");

// 🧮 Helper
function scheduleInstallments(total: number, months: number) {
  const per = Math.round(total / months);
  const schedule = [] as { monthOffset: number; amount: number }[];
  for (let i = 0; i < months; i++) schedule.push({ monthOffset: i + 1, amount: per });
  return schedule;
}

const Checkout = () => {
  const [provider, setProvider] = useState("auto");
  const [installment, setInstallment] = useState("full");
  const { items, clear } = useCart();
  const { user } = useAuth();
  const { theme, mode } = useTheme();
  const navigate = useNavigate();

  const total = items.reduce((s, i) => s + i.price * i.quantity, 0);
  const months =
    installment === "2" ? 2 : installment === "4" ? 4 : installment === "6" ? 6 : 1;
  const schedule = scheduleInstallments(total, months);

  const handlePaystackSuccess = (reference: any) => {
    console.log(reference);
    clear();
    navigate("/payment/status?result=paid");
  };

  const handlePaystackClose = () => console.log("Payment closed");

  const handleConfirmAndPay = () => {
    if (installment === "full") {
      // Will be handled by payment components
    } else {
      navigate("/payment/status?result=subscription_created");
    }
  };

  return (
    <Box
      sx={{
        bgcolor: theme.palette.background.default,
        color: theme.palette.text.primary,
        minHeight: "100vh",
        background: mode === 'dark' 
          ? "linear-gradient(145deg, #0B0C10 0%, #1F2833 100%)"
          : "linear-gradient(145deg, #f8f9fa 0%, #ffffff 100%)",
      }}
    >
      <TopNav />

      <Container sx={{ py: 6 }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: "700",
            mb: 4,
            color: theme.palette.primary.main,
            textShadow: `0 0 12px ${theme.palette.primary.main}30`,
            fontFamily: "JUST Sans ExBold",
          }}
        >
          Checkout
        </Typography>

        {/* 💳 Payment Provider */}
        <Paper
          sx={{
            p: 3,
            mb: 3,
            borderRadius: 3,
            bgcolor: theme.palette.background.paper,
            border: `1px solid ${theme.palette.divider}`,
            boxShadow: mode === 'dark' ? "0 0 20px rgba(0,0,0,0.4)" : "0 0 20px rgba(0,0,0,0.1)",
          }}
        >
          <Typography variant="h6" sx={{ color: theme.palette.primary.main, mb: 2, fontFamily: "JUST Sans ExBold" }}>
            Payment Provider
          </Typography>
          <RadioGroup
            value={provider}
            onChange={(e) => setProvider(e.target.value)}
            sx={{ color: theme.palette.text.primary }}
          >
            <FormControlLabel
              value="auto"
              control={<Radio sx={{ color: theme.palette.primary.main }} />}
              label={<span style={{ fontFamily: "JUST Sans Regular" }}>Auto (route by location)</span>}
            />
            <FormControlLabel
              value="paystack"
              control={<Radio sx={{ color: theme.palette.primary.main }} />}
              label={<span style={{ fontFamily: "JUST Sans Regular" }}>Paystack (NG)</span>}
            />
            <FormControlLabel
              value="stripe"
              control={<Radio sx={{ color: theme.palette.primary.main }} />}
              label={<span style={{ fontFamily: "JUST Sans Regular" }}>Stripe (International)</span>}
            />
          </RadioGroup>
        </Paper>

        {/* 🧾 Installment Options */}
        <Paper
          sx={{
            p: 3,
            mb: 3,
            borderRadius: 3,
            bgcolor: "#1F2833",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow: "0 0 20px rgba(0,0,0,0.4)",
          }}
        >
          <Typography variant="h6" sx={{ color: "#FFAB46", mb: 2, fontFamily: "JUST Sans ExBold" }}>
            Installment Options
          </Typography>

          <Select
            value={installment}
            onChange={(e) => setInstallment(e.target.value)}
            sx={{
              mt: 1,
              bgcolor: "#0B0C10",
              color: "#fff",
              borderRadius: 2,
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "rgba(255,255,255,0.2)",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "#FFAB46",
              },
            }}
          >
            <MenuItem value="full">Pay in full</MenuItem>
            <MenuItem value="2">2 installments (2 months)</MenuItem>
            <MenuItem value="4">4 installments (4 months)</MenuItem>
            <MenuItem value="6">6 installments (6 months)</MenuItem>
          </Select>

          {installment !== "full" && (
            <Box sx={{ mt: 3 }}>
              <Divider sx={{ mb: 2, borderColor: "rgba(255,255,255,0.1)" }} />
              <Typography variant="subtitle1" sx={{ color: "#C79B3B", mb: 1, fontFamily: "JUST Sans ExBold" }}>
                Payment Schedule
              </Typography>
              {schedule.map((s) => (
                <Typography
                  key={s.monthOffset}
                  sx={{ color: "rgba(255,255,255,0.7)", mb: 0.5, fontFamily: "JUST Sans Regular" }}
                >
                  Month {s.monthOffset}: NGN {s.amount.toLocaleString()}
                </Typography>
              ))}
            </Box>
          )}
        </Paper>

        {/* 💰 Payment Components */}
        {provider === "stripe" && stripePromise && (
          <Elements stripe={stripePromise}>
            <StripePaymentForm />
          </Elements>
        )}

        {provider === "paystack" && user?.email && (
          <PaystackPaymentButton
            amount={total * 100}
            email={user.email}
            onSuccess={handlePaystackSuccess}
            onClose={handlePaystackClose}
          />
        )}

        {(provider === "auto" ||
          (provider === "stripe" && !stripePromise) ||
          (provider === "paystack" && !user?.email)) && (
          <Box sx={{ mt: 3 }}>
            <Button
              variant="contained"
              onClick={handleConfirmAndPay}
              sx={{
                bgcolor: "#FFAB46",
                color: "#000",
                fontWeight: "600",
                fontFamily: "JUST Sans ExBold",
                borderRadius: 2,
                px: 4,
                py: 1.2,
                boxShadow: "0 0 15px rgba(255,171,70,0.3)",
                "&:hover": {
                  bgcolor: "#e9b362",
                  boxShadow: "0 0 25px rgba(255,171,70,0.5)",
                },
              }}
            >
              Confirm & Pay
            </Button>
          </Box>
        )}

        {/* 🧮 Total Summary */}
        <Box
          sx={{
            mt: 5,
            textAlign: "right",
            p: 2,
            borderRadius: 2,
            bgcolor: "rgba(255,255,255,0.05)",
          }}
        >
          <Typography variant="subtitle1" sx={{ color: "#ccc", fontFamily: "JUST Sans Regular" }}>
            Total:{" "}
            <span style={{ color: "#FFAB46", fontWeight: 700, fontFamily: "JUST Sans ExBold" }}>
              NGN {total.toLocaleString()}
            </span>
          </Typography>
        </Box>
      </Container>

      <Footer />
    </Box>
  );
};

export default Checkout;

