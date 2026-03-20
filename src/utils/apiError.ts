import axios from 'axios';

type ApiErrorPayload = {
  message?: unknown;
  error?: unknown;
};

const normalizeMessage = (value: unknown) => {
  const text = typeof value === 'string' ? value.trim() : '';
  return text || null;
};

export const getApiErrorMessage = (error: unknown, fallback: string) => {
  if (axios.isAxiosError(error)) {
    const payload = error.response?.data as ApiErrorPayload | undefined;
    const backendMessage = normalizeMessage(payload?.message) || normalizeMessage(payload?.error);
    if (backendMessage) return backendMessage;
    const axiosMessage = normalizeMessage(error.message);
    if (axiosMessage) return axiosMessage;
  }

  if (error instanceof Error) {
    const message = normalizeMessage(error.message);
    if (message) return message;
  }

  return fallback;
};
