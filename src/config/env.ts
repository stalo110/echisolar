const DEFAULT_API_BASE_URL = 'http://localhost:5000/api';

const rawApiUrl = import.meta.env.VITE_API_URL || DEFAULT_API_BASE_URL;

export const API_BASE_URL = rawApiUrl.replace(/\/$/, '');
export const BACKEND_PUBLIC_URL = API_BASE_URL.replace(/\/api\/?$/, '');

export const PAYSTACK_PUBLIC_KEY = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY || '';
export const FLUTTERWAVE_PUBLIC_KEY = import.meta.env.VITE_FLUTTERWAVE_PUBLIC_KEY || '';
