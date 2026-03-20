export const COMPANY_NAME = "EchiSolar";
export const COMPANY_EMAIL = "info@echisolar.com";
export const COMPANY_PHONE = "+2347044720196";
export const COMPANY_WHATSAPP_NUMBER = "2347044720196";
export const COMPANY_ADDRESS =
  "Shop 40-42 CC Plaza, Johnson Street, Alaba International Market, Lagos";

export const COMPANY_WHATSAPP_URL = `https://wa.me/${COMPANY_WHATSAPP_NUMBER}`;

export const buildWhatsAppMessageUrl = (message: string) =>
  `${COMPANY_WHATSAPP_URL}?text=${encodeURIComponent(message)}`;
