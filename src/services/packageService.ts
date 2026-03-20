import api from './apiClient';

export type SolarPackage = {
  id: number;
  name: string;
  description?: string;
  price: number | null;
  requiresCustomPrice: boolean;
  images: string[];
  whatsappLink?: string | null;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
};

export type AdminPackagePayload = {
  name: string;
  description?: string;
  price?: number | null;
  requiresCustomPrice?: boolean;
  images?: Array<string | File>;
  whatsappLink?: string;
  isActive?: boolean;
};

export type PackageEnrollmentStatus = 'opted_in' | 'pending_payment' | 'paid';

export type PackageEnrollment = {
  id: number;
  packageId: number;
  orderId: number | null;
  name: string;
  description?: string;
  images: string[];
  packagePrice: number | null;
  selectedPrice: number | null;
  requiresCustomPrice: boolean;
  status: PackageEnrollmentStatus;
  source: string;
  notes?: string | null;
  paymentStatus?: string | null;
  orderStatus?: string | null;
  placedAt?: string | null;
  totalAmount?: number | null;
  whatsappLink?: string | null;
  createdAt?: string;
  updatedAt?: string;
};

const parseImages = (value: unknown): string[] => {
  if (Array.isArray(value)) {
    return value.filter((image): image is string => typeof image === 'string');
  }

  if (typeof value !== 'string') return [];

  try {
    const parsed = JSON.parse(value) as unknown;
    if (Array.isArray(parsed)) {
      return parsed.filter((image): image is string => typeof image === 'string');
    }
    return [];
  } catch {
    return value ? [value] : [];
  }
};

const normalizePackage = (payload: any): SolarPackage => ({
  id: Number(payload.id),
  name: String(payload.name || ''),
  description: payload.description || '',
  price:
    payload.price === null || typeof payload.price === 'undefined'
      ? null
      : Number(payload.price),
  requiresCustomPrice: Boolean(payload.requiresCustomPrice),
  images: parseImages(payload.images),
  whatsappLink: payload.whatsappLink || null,
  isActive: typeof payload.isActive === 'undefined' ? true : Boolean(payload.isActive),
  createdAt: payload.createdAt,
  updatedAt: payload.updatedAt,
});

const normalizeEnrollment = (payload: any): PackageEnrollment => ({
  id: Number(payload.id),
  packageId: Number(payload.packageId),
  orderId: payload.orderId === null || typeof payload.orderId === 'undefined' ? null : Number(payload.orderId),
  name: String(payload.name || ''),
  description: payload.description || '',
  images: parseImages(payload.images),
  packagePrice:
    payload.packagePrice === null || typeof payload.packagePrice === 'undefined'
      ? null
      : Number(payload.packagePrice),
  selectedPrice:
    payload.selectedPrice === null || typeof payload.selectedPrice === 'undefined'
      ? null
      : Number(payload.selectedPrice),
  requiresCustomPrice: Boolean(payload.requiresCustomPrice),
  status: String(payload.status || 'opted_in') as PackageEnrollmentStatus,
  source: String(payload.source || 'custom_request'),
  notes: payload.notes || null,
  paymentStatus: payload.paymentStatus || null,
  orderStatus: payload.orderStatus || null,
  placedAt: payload.placedAt || null,
  totalAmount:
    payload.totalAmount === null || typeof payload.totalAmount === 'undefined'
      ? null
      : Number(payload.totalAmount),
  whatsappLink: payload.whatsappLink || null,
  createdAt: payload.createdAt,
  updatedAt: payload.updatedAt,
});

const appendFormValue = (formData: FormData, key: string, value: unknown) => {
  if (typeof value === 'undefined' || value === null) return;
  formData.append(key, String(value));
};

const buildPackageFormData = (payload: AdminPackagePayload) => {
  const formData = new FormData();

  appendFormValue(formData, 'name', payload.name);
  appendFormValue(formData, 'description', payload.description ?? '');
  appendFormValue(formData, 'price', payload.price);
  appendFormValue(formData, 'requiresCustomPrice', payload.requiresCustomPrice);
  appendFormValue(formData, 'whatsappLink', payload.whatsappLink ?? '');
  appendFormValue(formData, 'isActive', payload.isActive);

  const files: File[] = [];
  const imageUrls: string[] = [];

  for (const image of payload.images || []) {
    if (typeof File !== 'undefined' && image instanceof File) {
      files.push(image);
      continue;
    }

    if (typeof image === 'string' && image.trim()) {
      imageUrls.push(image.trim());
    }
  }

  for (const file of files) {
    formData.append('images', file);
  }

  if (!files.length && imageUrls.length) {
    formData.append('images', JSON.stringify(imageUrls));
  }

  return formData;
};

export const fetchPackages = async () => {
  const { data } = await api.get<SolarPackage[]>('/packages');
  return data.map(normalizePackage);
};

export const fetchAdminPackages = async () => {
  const { data } = await api.get<SolarPackage[]>('/packages/admin/all');
  return data.map(normalizePackage);
};

export const fetchPackageById = async (id: number) => {
  const { data } = await api.get<SolarPackage>(`/packages/${id}`);
  return normalizePackage(data);
};

export const createAdminPackage = async (payload: AdminPackagePayload) => {
  const { data } = await api.post('/packages', buildPackageFormData(payload));
  return data;
};

export const updateAdminPackage = async (id: number, payload: AdminPackagePayload) => {
  const { data } = await api.put(`/packages/${id}`, buildPackageFormData(payload));
  return data;
};

export const deleteAdminPackage = async (id: number) => {
  const { data } = await api.delete(`/packages/${id}`);
  return data;
};

export const optInForCustomPackage = async (id: number, notes?: string) => {
  const { data } = await api.post(`/packages/${id}/opt-in`, {
    notes: notes || undefined,
  });
  return data as { message: string; whatsappLink?: string | null };
};

export const fetchMyPackageEnrollments = async () => {
  const { data } = await api.get<PackageEnrollment[]>('/packages/me/enrollments');
  return data.map(normalizeEnrollment);
};
