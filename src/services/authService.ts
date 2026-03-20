import api from './apiClient';

export type AuthResponse = {
  token: string;
  user: {
    id: number;
    name: string;
    email: string;
    role: 'admin' | 'user';
    country?: string | null;
  };
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type RegisterPayload = LoginPayload & {
  name: string;
  country?: string;
};

export type ForgotPasswordPayload = {
  email: string;
};

export type ResetPasswordPayload = {
  token: string;
  password: string;
  confirmPassword?: string;
};

export type AuthMessageResponse = {
  message: string;
};

export const login = async (payload: LoginPayload) => {
  const { data } = await api.post<AuthResponse>('/auth/login', payload);
  return data;
};

export const register = async (payload: RegisterPayload) => {
  const { data } = await api.post<AuthResponse>('/auth/register', payload);
  return data;
};

export const forgotPassword = async (payload: ForgotPasswordPayload) => {
  const { data } = await api.post<AuthMessageResponse>('/auth/forgot-password', payload);
  return data;
};

export const resetPassword = async (payload: ResetPasswordPayload) => {
  const { data } = await api.post<AuthMessageResponse>('/auth/reset-password', payload);
  return data;
};
