import { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Box, Button, Typography, CircularProgress } from '@mui/material';

const StripePaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
        setError("Card element not found.");
        setLoading(false);
        return;
    }

    const { error: createPaymentMethodError, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (createPaymentMethodError) {
      setError(createPaymentMethodError.message);
      setLoading(false);
      return;
    }

    // In a real application, you would send paymentMethod.id to your backend
    // and handle the payment intent creation and confirmation there.
    console.log('PaymentMethod ID:', paymentMethod.id);

    // For demonstration purposes, simulate a successful payment
    setTimeout(() => {
      setSuccess('Payment successful!');
      setLoading(false);
    }, 2000);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <Typography variant="h6" gutterBottom>Pay with Card (Stripe)</Typography>
      <Box sx={{ border: '1px solid #ccc', p: 2, borderRadius: 1 }}>
        <CardElement />
      </Box>
      {error && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}
      {success && <Typography color="primary" sx={{ mt: 2 }}>{success}</Typography>}
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        disabled={!stripe || loading}
      >
        {loading ? <CircularProgress size={24} /> : 'Pay Now'}
      </Button>
      <Typography variant="body2" color="text.secondary">
        Note: For this component to work, you need to install `@stripe/react-stripe-js` and `@stripe/stripe-js`.
        Also, ensure your Stripe API keys are correctly configured in your application and backend.
      </Typography>
    </Box>
  );
};

export default StripePaymentForm;
