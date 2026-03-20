import api from './apiClient';

export type AdminDashboardStats = {
  totalSales: number;
  grossSales: number;
  orders: number;
  paidOrders: number;
  users: number;
  products: number;
  projects: number;
  packages?: number;
};

export type PaginationMeta = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

export type AdminOrderRow = {
  id: number;
  userId: number;
  totalAmount: number;
  paymentStatus: string;
  status: string;
  placedAt: string;
  customerName?: string | null;
  customerEmail?: string | null;
};

export type AdminUserRow = {
  id: number;
  name: string;
  email: string;
  role: string;
  country?: string | null;
  createdAt?: string;
};

export type RevenuePoint = {
  month: string;
  revenue: number;
  orders: number;
};

export type RevenueAnalytics = {
  totalRevenue: number;
  grossRevenue: number;
  totalOrders: number;
  paidOrders: number;
  growthFromLastMonth: number | null;
  monthly: RevenuePoint[];
  recentPaidOrders: Array<{
    id: number;
    totalAmount: number;
    placedAt: string;
    customerName?: string | null;
    customerEmail?: string | null;
  }>;
};

export type AdminMessageStatus = "read" | "unread";

export type AdminMessageRow = {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: AdminMessageStatus;
  adminReply?: string | null;
  replyDate?: string | null;
  replied: boolean;
  createdAt: string;
  updatedAt?: string;
};

export const fetchAdminDashboardStats = async () => {
  const { data } = await api.get<AdminDashboardStats>('/admin/dashboard');
  return data;
};

export const fetchAdminOrders = async (page = 1, limit = 10, search?: string) => {
  const { data } = await api.get<{ data: AdminOrderRow[]; pagination: PaginationMeta }>('/admin/orders', {
    params: { page, limit, ...(search ? { search } : {}) },
  });
  return data;
};

export const deleteAdminOrder = async (id: number) => {
  const { data } = await api.delete<{ message: string }>(`/admin/orders/${id}`);
  return data;
};

export const fetchAdminUsers = async (page = 1, limit = 10, role = 'user') => {
  const { data } = await api.get<{ data: AdminUserRow[]; pagination: PaginationMeta }>('/admin/users', {
    params: { page, limit, role },
  });
  return data;
};

export const fetchRevenueAnalytics = async (months = 6) => {
  const { data } = await api.get<RevenueAnalytics>('/admin/revenue', {
    params: { months },
  });
  return data;
};

export const fetchAdminMessages = async (
  page = 1,
  limit = 20,
  status?: AdminMessageStatus,
  search?: string
) => {
  const { data } = await api.get<{ ok: boolean; data: AdminMessageRow[]; pagination: PaginationMeta }>('/admin/messages', {
    params: { page, limit, ...(status ? { status } : {}), ...(search ? { search } : {}) },
  });
  return data;
};

export const fetchAdminMessageById = async (id: number) => {
  const { data } = await api.get<{ ok: boolean; data: AdminMessageRow }>(`/admin/messages/${id}`);
  return data;
};

export const replyToAdminMessage = async (id: number, reply: string) => {
  const { data } = await api.put<{ ok: boolean; data: AdminMessageRow }>(`/admin/messages/${id}/reply`, { reply });
  return data;
};

export const updateAdminMessageStatus = async (id: number, status: AdminMessageStatus) => {
  const { data } = await api.put<{ ok: boolean; data: AdminMessageRow }>(`/admin/messages/${id}/status`, { status });
  return data;
};
