import api from './apiClient';

export type OrderItemReview = {
  id: number;
  rating: number;
  comment: string;
  createdAt?: string | null;
  updatedAt?: string | null;
};

export type ReviewableOrderItem = {
  orderItemId: number;
  orderId: number;
  itemType: 'product' | 'package';
  productId?: number | null;
  packageId?: number | null;
  name: string;
  quantity: number;
  unitPrice: number;
  images: string[];
  review: OrderItemReview | null;
};

export type PublicReview = {
  id: number;
  reviewerName: string;
  itemType: 'product' | 'package';
  itemName: string;
  rating: number;
  comment: string;
  createdAt?: string | null;
  updatedAt?: string | null;
};

const parseImages = (value: unknown): string[] => {
  if (Array.isArray(value)) {
    return value.filter((image): image is string => typeof image === 'string');
  }

  if (typeof value !== 'string') return [];

  try {
    const parsed = JSON.parse(value) as unknown;
    return Array.isArray(parsed)
      ? parsed.filter((image): image is string => typeof image === 'string')
      : [];
  } catch {
    return value.trim() ? [value.trim()] : [];
  }
};

const normalizeReview = (payload: any): OrderItemReview => ({
  id: Number(payload.id),
  rating: Number(payload.rating || 0),
  comment: String(payload.comment || ''),
  createdAt: payload.createdAt || null,
  updatedAt: payload.updatedAt || null,
});

const normalizeReviewableItem = (payload: any): ReviewableOrderItem => ({
  orderItemId: Number(payload.orderItemId),
  orderId: Number(payload.orderId),
  itemType: String(payload.itemType || 'product') === 'package' ? 'package' : 'product',
  productId: payload.productId === null || typeof payload.productId === 'undefined' ? null : Number(payload.productId),
  packageId: payload.packageId === null || typeof payload.packageId === 'undefined' ? null : Number(payload.packageId),
  name: String(payload.name || ''),
  quantity: Number(payload.quantity || 0),
  unitPrice: Number(payload.unitPrice || 0),
  images: parseImages(payload.images),
  review: payload.review ? normalizeReview(payload.review) : null,
});

const normalizePublicReview = (payload: any): PublicReview => ({
  id: Number(payload.id),
  reviewerName: String(payload.reviewerName || 'Verified Customer'),
  itemType: String(payload.itemType || 'product') === 'package' ? 'package' : 'product',
  itemName: String(payload.itemName || ''),
  rating: Number(payload.rating || 0),
  comment: String(payload.comment || ''),
  createdAt: payload.createdAt || null,
  updatedAt: payload.updatedAt || null,
});

export const fetchOrderReviewItems = async (orderId: number) => {
  const { data } = await api.get<{ orderId: number; items: ReviewableOrderItem[] }>(`/reviews/order/${orderId}`);
  return {
    orderId: Number(data.orderId || orderId),
    items: Array.isArray(data.items) ? data.items.map(normalizeReviewableItem) : [],
  };
};

export const submitOrderItemReview = async (payload: {
  orderId: number;
  orderItemId: number;
  rating: number;
  comment: string;
}) => {
  const { data } = await api.post<{ message: string; review: OrderItemReview | null }>('/reviews', payload);
  return {
    message: String(data.message || ''),
    review: data.review ? normalizeReview(data.review) : null,
  };
};

export const fetchPublicReviews = async (limit = 3) => {
  const { data } = await api.get<PublicReview[]>('/reviews/public', {
    params: { limit },
  });
  return Array.isArray(data) ? data.map(normalizePublicReview) : [];
};
