import api from './apiClient';

export type ReferralEntry = {
  id: number;
  status: 'pending' | 'credited';
  bonusAmount: number;
  createdAt: string;
  creditedAt: string | null;
  refereeName: string;
};

export type MyReferralData = {
  referralCode: string;
  referralBonus: number;
  bonusPercent: number;
  referralLink: string;
  referrals: ReferralEntry[];
};

export const getMyReferral = async (): Promise<MyReferralData> => {
  const { data } = await api.get<MyReferralData>('/referrals/me');
  return data;
};

export const applyReferralBonus = async (amount: number) => {
  const { data } = await api.post<{ applied: number; remaining: number }>('/referrals/apply-bonus', { amount });
  return data;
};

export const getAdminReferralSettings = async () => {
  const { data } = await api.get<{ bonusPercent: number }>('/referrals/admin/settings');
  return data;
};

export const updateAdminReferralSettings = async (bonusPercent: number) => {
  const { data } = await api.put<{ message: string; bonusPercent: number }>('/referrals/admin/settings', { bonusPercent });
  return data;
};

export type AdminReferralRow = {
  id: number;
  status: string;
  bonusAmount: number;
  createdAt: string;
  creditedAt: string | null;
  referrerName: string;
  referrerEmail: string;
  refereeName: string;
  refereeEmail: string;
};

export const getAdminReferrals = async (page = 1, limit = 20) => {
  const { data } = await api.get<{ data: AdminReferralRow[]; pagination: any }>('/referrals/admin/all', {
    params: { page, limit },
  });
  return data;
};
