import api from './apiClient';

export type PaymentConfig = {
  paystackPublicKey: string;
  flutterwavePublicKey: string;
};

export const getPaymentConfig = async () => {
  const { data } = await api.get<{ ok: boolean; data: PaymentConfig }>('/payments/config');
  return data.data;
};
