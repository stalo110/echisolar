import { Button, Box } from '@mui/material';

interface PaystackPaymentButtonProps {
  amount: number; // in kobo
  email: string;
  onSuccess: (reference: any) => void;
  onClose: () => void;
}

const PaystackPaymentButton = ({ amount, email, onSuccess, onClose }: PaystackPaymentButtonProps) => {
  const handlePay = () => {
    const paystack = new (window as any).PaystackPop();
    paystack.newTransaction({
      key: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY,
      email: email,
      amount: amount,
      currency: "NGN",
      onSuccess: (response: any) => {
        onSuccess(response);
      },
      onCancel: () => {
        onClose();
      },
    });
  };

  return (
    <Box sx={{ mt: 3 }}>
      <Button
        fullWidth
        variant="contained"
        color="secondary"
        onClick={handlePay}
      >
        Pay with Paystack
      </Button>
    </Box>
  );
};

export default PaystackPaymentButton;
