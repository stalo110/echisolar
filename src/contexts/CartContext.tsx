import { createContext, useContext, useState } from 'react';

export type CartItem = { productId: string; name?: string; price: number; quantity: number };

const CartContext = createContext({
  items: [] as CartItem[],
  add: (_item: CartItem) => {},
  remove: (_productId: string) => {},
  clear: () => {},
});

export const CartProvider = ({ children }: { children: any }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const add = (item: CartItem) => setItems((s) => {
    const found = s.find(i=> i.productId === item.productId);
    if(found){
      return s.map(i => i.productId === item.productId ? {...i, quantity: i.quantity + item.quantity} : i);
    }
    return [...s, item];
  });
  const remove = (productId: string) => setItems((s) => s.filter(i => i.productId !== productId));
  const clear = () => setItems([]);
  return <CartContext.Provider value={{ items, add, remove, clear }}>{children}</CartContext.Provider>;
}

export const useCart = () => useContext(CartContext);

export default CartContext;
