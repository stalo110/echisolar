import api from './apiClient';

export type UserProfile = {
  id: number;
  name: string;
  email: string;
  phone?: string | null;
  role: 'admin' | 'user';
  address?: string | null;
  country?: string | null;
  createdAt?: string;
};

export const getProfile = async () => {
  const { data } = await api.get<UserProfile>('/users/me');
  return data;
};

export const updateProfile = async (payload: {
  name: string;
  phone?: string | null;
  address?: string | null;
  country?: string | null;
}) => {
  const { data } = await api.put('/users/me', payload);
  return data;
};
