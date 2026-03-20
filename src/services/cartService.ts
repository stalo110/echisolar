import api from './apiClient';

export type CartItemType = 'product' | 'package';

export type ServerCartItem = {
  id: number;
  itemType: CartItemType;
  productId: number | null;
  packageId: number | null;
  name: string;
  quantity: number;
  unitPrice: number;
  stock?: number | null;
  images?: string[];
};

export type CartResponse = {
  items: ServerCartItem[];
};

export const getCart = () => api.get<CartResponse>('/cart');

export const addToCart = (payload: {
  itemType: CartItemType;
  productId?: string | number;
  packageId?: string | number;
  quantity: number;
}) => api.post<CartResponse>('/cart', payload);

export const updateCartItem = (itemId: number, quantity: number) =>
  api.put<CartResponse>(`/cart/${itemId}`, { quantity });

export const removeCartItem = (itemId: number) =>
  api.delete<CartResponse>(`/cart/${itemId}`);

export const clearCart = () => api.delete<CartResponse>('/cart');
