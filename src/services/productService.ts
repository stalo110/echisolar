export type Product = {
  id: string;
  name: string;
  description?: string;
  price: number;
  salePrice?: number;
  stock: number;
  category?: string;
  images?: string[];
  isActive?: boolean;
  isLatestArrival?: boolean;
  rating?: number;
  reviews?: number;
  availability?: boolean;
}

const sampleProducts: Product[] = [
  { id: 'p1', name: 'Solar Panel 300W', description: 'High efficiency monocrystalline solar panel.', price: 120000, stock: 10, images: ['/images/solar.jpg'], isActive: true, isLatestArrival: true, category: 'Panels' },
  { id: 'p2', name: 'Inverter 5kW', description: 'Pure sine wave inverter for stable power.', price: 450000, stock: 5, images: ['/images/solar2.jpg'], isActive: true, isLatestArrival: false, category: 'Inverters' },
  { id: 'p3', name: 'Battery 200Ah', description: 'Deep cycle battery for long runtime.', price: 220000, stock: 8, images: ['/images/solar3.jpg'], isActive: true, isLatestArrival: true, category: 'Batteries' },
  { id: 'p4', name: 'Solar Mount Kit', description: 'Durable mounting kit for panels.', price: 25000, stock: 25, images: ['/images/solar4.jpg'], isActive: true, isLatestArrival: false, category: 'Accessories' },
  { id: 'p5', name: 'Charge Controller 60A', description: 'MPPT charge controller for efficient charging.', price: 60000, stock: 12, images: ['/images/solar5.jpg'], isActive: true, isLatestArrival: true, category: 'Controllers' },
];

export const fetchProducts = async (_filter?: Partial<Product>) => {
  // naive filter - replace with real API call
  return sampleProducts.filter(p => p.isActive);
}

export const fetchProductById = async (id: string) => sampleProducts.find(p => p.id === id) || null;

export const fetchRelated = async (category?: string, excludeId?: string) => {
  if(!category) return sampleProducts.filter(p => p.id !== excludeId);
  return sampleProducts.filter(p => p.category === category && p.id !== excludeId);
}

export default { fetchProducts, fetchProductById };
