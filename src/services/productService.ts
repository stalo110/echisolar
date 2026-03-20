import api from './apiClient';

export type Product = {
  id: string;
  name: string;
  description?: string;
  price: number;
  salePrice?: number;
  stock: number;
  category?: string;
  categoryId?: number;
  images?: string[];
  isActive?: boolean;
  isLatestArrival?: boolean;
  rating?: number;
  reviews?: number;
  availability?: boolean;
};

export type AdminProductPayload = {
  name: string;
  description?: string;
  price: number;
  stock: number;
  categoryId?: number | null;
  images?: Array<string | File>;
  isLatestArrival?: boolean;
  isActive?: boolean;
};

const parseImages = (images: unknown) => {
  if (Array.isArray(images)) {
    return images.filter((image): image is string => typeof image === 'string');
  }

  if (typeof images !== 'string') return [];

  try {
    const parsed = JSON.parse(images) as unknown;
    return Array.isArray(parsed)
      ? parsed.filter((image): image is string => typeof image === 'string')
      : [];
  } catch {
    return images ? [images] : [];
  }
};

const resolveCategory = (categoryId?: number, category?: string) => {
  if (category) return category;

  if (categoryId === 1) return 'Panels';
  if (categoryId === 2) return 'Inverters';
  if (categoryId === 3) return 'Batteries';
  if (categoryId === 4) return 'Solar Cameras';
  if (categoryId === 5) return 'Accessories';
  if (categoryId === 6) return 'Solar Streetlights';
  return 'General';
};

const normalize = (payload: any): Product => {
  const {
    id,
    name,
    description,
    price,
    salePrice,
    stock,
    category,
    categoryId,
    isActive,
    isLatestArrival,
    images,
  } = payload;

  const latestFlag =
    typeof isLatestArrival !== 'undefined'
      ? isLatestArrival
      : payload.isLatestArrival === 1 || payload.isLatestArrival === true;

  return {
    id: String(id),
    name,
    description,
    price: Number(salePrice ?? price ?? 0),
    salePrice: salePrice ? Number(salePrice) : undefined,
    stock: Number(stock ?? 0),
    category: resolveCategory(categoryId, category),
    categoryId,
    images: parseImages(images),
    isActive: typeof isActive === 'undefined' ? true : Boolean(isActive),
    isLatestArrival: Boolean(latestFlag),
  };
};

export const fetchProducts = async (filter?: Partial<Product>) => {
  const params: Record<string, string> = {};
  if (filter?.isLatestArrival) params.isLatestArrival = 'true';

  const { data } = await api.get<Product[]>('/products', { params });
  return data.map(normalize);
};

export const fetchAdminProducts = async () => {
  const { data } = await api.get<Product[]>('/products/admin/all');
  return data.map(normalize);
};

export const fetchProductById = async (id: string) => {
  const { data } = await api.get<Product>(`/products/${id}`);
  if (!data) return null;
  return normalize(data);
};

export const fetchRelated = async (category?: string, excludeId?: string) => {
  const products = await fetchProducts();
  return products.filter((product) => product.id !== excludeId && (!category || product.category === category));
};

const appendFormValue = (formData: FormData, key: string, value: unknown) => {
  if (typeof value === 'undefined' || value === null) return;
  formData.append(key, String(value));
};

const buildAdminProductFormData = (payload: AdminProductPayload) => {
  const formData = new FormData();

  appendFormValue(formData, 'name', payload.name);
  appendFormValue(formData, 'description', payload.description ?? '');
  appendFormValue(formData, 'price', payload.price);
  appendFormValue(formData, 'stock', payload.stock);
  appendFormValue(formData, 'categoryId', payload.categoryId);
  appendFormValue(formData, 'isLatestArrival', payload.isLatestArrival);
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

export const createAdminProduct = async (payload: AdminProductPayload) => {
  const { data } = await api.post('/products', buildAdminProductFormData(payload));
  return data;
};

export const updateAdminProduct = async (id: string, payload: AdminProductPayload) => {
  const { data } = await api.put(`/products/${id}`, buildAdminProductFormData(payload));
  return data;
};

export const deleteAdminProduct = async (id: string) => {
  const { data } = await api.delete(`/products/${id}`);
  return data;
};

export default {
  fetchProducts,
  fetchAdminProducts,
  fetchProductById,
  fetchRelated,
  createAdminProduct,
  updateAdminProduct,
  deleteAdminProduct,
};
