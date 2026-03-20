import api from "./apiClient";

export type ContactPayload = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export const submitContactMessage = async (payload: ContactPayload) => {
  const { data } = await api.post<{ ok: boolean; data: { id: number } }>("/contact", payload);
  return data;
};
