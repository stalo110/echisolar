import api from './apiClient';

export type UserProfile = {
  id: number;
  name: string;
  email: string;
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
  address?: string | null;
  country?: string | null;
}) => {
  const { data } = await api.put('/users/me', payload);
  return data;
};
