import api from './apiClient';

export type Project = {
  id: number;
  title: string;
  description?: string | null;
  images: string[];
  link?: string | null;
  isFeatured?: boolean;
  isActive?: boolean;
  createdAt?: string;
};

export type ProjectPayload = {
  title: string;
  description?: string;
  images?: Array<string | File>;
  link?: string;
  isFeatured?: boolean;
  isActive?: boolean;
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

const normalizeProject = (payload: any): Project => ({
  id: Number(payload.id),
  title: String(payload.title || ''),
  description: payload.description ?? null,
  images: parseImages(payload.images),
  link: payload.link ?? null,
  isFeatured: Boolean(payload.isFeatured),
  isActive: typeof payload.isActive === 'undefined' ? true : Boolean(payload.isActive),
  createdAt: payload.createdAt,
});

export const fetchProjects = async () => {
  const { data } = await api.get<Project[]>('/projects');
  return data.map(normalizeProject);
};

export const fetchAdminProjects = async () => {
  const { data } = await api.get<Project[]>('/projects/admin/all');
  return data.map(normalizeProject);
};

export const fetchProjectById = async (id: number) => {
  const { data } = await api.get<Project | null>(`/projects/${id}`);
  return data ? normalizeProject(data) : null;
};

const appendFormValue = (formData: FormData, key: string, value: unknown) => {
  if (typeof value === 'undefined' || value === null) return;
  formData.append(key, String(value));
};

const buildProjectFormData = (payload: ProjectPayload) => {
  const formData = new FormData();

  appendFormValue(formData, 'title', payload.title);
  appendFormValue(formData, 'description', payload.description ?? '');
  appendFormValue(formData, 'link', payload.link ?? '');
  appendFormValue(formData, 'isFeatured', payload.isFeatured);
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

export const createProject = async (payload: ProjectPayload) => {
  const { data } = await api.post('/projects', buildProjectFormData(payload));
  return data;
};

export const updateProject = async (id: number, payload: ProjectPayload) => {
  const { data } = await api.put(`/projects/${id}`, buildProjectFormData(payload));
  return data;
};

export const deleteProject = async (id: number) => {
  const { data } = await api.delete(`/projects/${id}`);
  return data;
};
