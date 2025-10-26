import { Box, Container, Typography, Radio, RadioGroup, FormControlLabel, Paper, Button, Select, MenuItem } from "@mui/material";
import TopNav from "../navigation/TopNav";
import Footer from "../navigation/Footer";
import { useState } from "react";
import { useCart } from "../contexts/CartContext";
import { useNavigate } from "react-router-dom";

function scheduleInstallments(total: number, months: number){
  const per = Math.round((total / months));
  const schedule = [] as {monthOffset:number, amount:number}[];
  for(let i=0;i<months;i++) schedule.push({ monthOffset: i+1, amount: per });
  return schedule;
}

const Checkout = () => {
  const [provider, setProvider] = useState('auto');
  const [installment, setInstallment] = useState('full');
  const { items } = useCart();
  const navigate = useNavigate();
  const total = items.reduce((s,i)=> s + i.price * i.quantity, 0);
  const months = installment === '2' ? 2 : installment === '4' ? 4 : installment === '6' ? 6 : 1;
  const schedule = scheduleInstallments(total, months);

  return (
    <Box>
      <TopNav />
      <Container sx={{ py: 6 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3 }}>Checkout</Typography>

        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6">Payment Provider</Typography>
          <RadioGroup value={provider} onChange={(e) => setProvider(e.target.value)}>
            <FormControlLabel value="auto" control={<Radio />} label="Auto (route by location)" />
            <FormControlLabel value="paystack" control={<Radio />} label="Paystack (NG)" />
            <FormControlLabel value="stripe" control={<Radio />} label="Stripe (International)" />
          </RadioGroup>
        </Paper>

        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6">Installment Options</Typography>
          <Select value={installment} onChange={(e)=> setInstallment(e.target.value)} sx={{ mt:2 }}>
            <MenuItem value="full">Pay in full</MenuItem>
            <MenuItem value="2">2 installments (2 months)</MenuItem>
            <MenuItem value="4">4 installments (4 months)</MenuItem>
            <MenuItem value="6">6 installments (6 months)</MenuItem>
          </Select>

          {installment !== 'full' && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle1">Schedule</Typography>
              {schedule.map(s => (
                <Typography key={s.monthOffset} color="text.secondary">Month {s.monthOffset}: NGN {s.amount.toLocaleString()}</Typography>
              ))}
            </Box>
          )}
        </Paper>

        <Box sx={{ mt: 2 }}>
          <Button variant="contained" color="success" onClick={() => {
            // simulate payment/subscription creation
            if(installment === 'full'){
              navigate('/payment/status?result=paid');
            } else {
              // create a fake subscription and redirect to subscription page / orders
              navigate('/payment/status?result=subscription_created');
            }
          }}>Confirm & Pay</Button>
        </Box>
      </Container>
      <Footer />
    </Box>
  )
}

export default Checkout;
