import api from "./apiClient";

export type NewsletterSubscriptionPayload = {
  email: string;
};

export type NewsletterSubscriptionResponse = {
  message: string;
};

export const subscribeToNewsletter = async (payload: NewsletterSubscriptionPayload) => {
  const { data } = await api.post<NewsletterSubscriptionResponse>("/newsletter/subscribe", payload);
  return data;
};
