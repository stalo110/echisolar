import axios from 'axios';
import { API_BASE_URL } from '../config/env';

const AUTH_STORAGE_KEY = 'echi_auth';
const LEGACY_TOKEN_KEY = 'echi_token';

const getToken = () => {
  const legacyToken = localStorage.getItem(LEGACY_TOKEN_KEY);
  if (legacyToken) return legacyToken;

  try {
    const rawAuthState = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!rawAuthState) return null;
    const parsed = JSON.parse(rawAuthState) as { token?: string } | null;
    return parsed?.token || null;
  } catch {
    return null;
  }
};

const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = getToken();
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
