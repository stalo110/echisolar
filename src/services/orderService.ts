import api from './apiClient';

export type CheckoutPayload = {
  shippingAddressId?: number | null;
  providerPreference?: 'paystack' | 'flutterwave';
  planOption?: string;
  currency?: string;
};

export type CheckoutResponse = {
  orderId: number;
  provider: 'flutterwave' | 'paystack';
  authorization_url: string;
  tx_ref?: string;
  reference?: string;
  amount?: number;
  currency?: string;
};

export const initiateCheckout = async (payload: CheckoutPayload) => {
  const { data } = await api.post<CheckoutResponse>('/orders/checkout', payload);
  return data;
};

export type OrderSummary = {
  id: number;
  userId: number;
  totalAmount: number;
  paymentStatus: string;
  status: string;
  shippingAddressId?: number | null;
  placedAt?: string;
};

export const getUserOrders = async () => {
  const { data } = await api.get<OrderSummary[]>('/orders');
  return data;
};

export type OrderDetail = {
  order: {
    id: number;
    paymentStatus?: string;
    status?: string;
    totalAmount?: number;
    placedAt?: string;
  };
  items: Array<{
    id?: number;
    itemType?: "product" | "package";
    productId?: number;
    packageId?: number;
    name: string;
    quantity: number;
    unitPrice: number;
    images?: string | string[];
  }>;
  payments: Array<{
    status: string;
    provider: string;
  }>;
  installments: Array<{
    installmentNumber: number;
    status: string;
    amount: number;
    dueDate: string;
  }>;
};

export const getOrderById = async (orderId: number) => {
  const { data } = await api.get<OrderDetail>(`/orders/${orderId}`);
  return data;
};

export const getOrderByReference = async (reference: string) => {
  const { data } = await api.get<OrderDetail>('/orders/lookup', { params: { reference } });
  return data;
};
