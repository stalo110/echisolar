import { createContext, useContext, useState, useEffect } from 'react';

export type CartItem = { productId: string; name?: string; price: number; quantity: number };

const CartContext = createContext({
  items: [] as CartItem[],
  add: (_item: CartItem) => {},
  remove: (_productId: string) => {},
  clear: () => {},
  increaseQuantity: (_productId: string) => {},
  decreaseQuantity: (_productId: string) => {},
});

export const CartProvider = ({ children }: { children: any }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const storedItems = localStorage.getItem('cartItems');
    if (storedItems) {
      setItems(JSON.parse(storedItems));
    }
  }, []);

  const add = (item: CartItem) => {
    setItems((s) => {
      const found = s.find((i) => i.productId === item.productId);
      let newItems;
      if (found) {
        newItems = s.map((i) =>
          i.productId === item.productId ? { ...i, quantity: i.quantity + item.quantity } : i
        );
      } else {
        newItems = [...s, item];
      }
      localStorage.setItem('cartItems', JSON.stringify(newItems));
      return newItems;
    });
  };

  const remove = (productId: string) => {
    setItems((s) => {
      const newItems = s.filter((i) => i.productId !== productId);
      localStorage.setItem('cartItems', JSON.stringify(newItems));
      return newItems;
    });
  };

  const clear = () => {
    setItems([]);
    localStorage.removeItem('cartItems');
  };

  const increaseQuantity = (productId: string) => {
    setItems((s) => {
      const newItems = s.map((i) =>
        i.productId === productId ? { ...i, quantity: i.quantity + 1 } : i
      );
      localStorage.setItem('cartItems', JSON.stringify(newItems));
      return newItems;
    });
  };

  const decreaseQuantity = (productId: string) => {
    setItems((s) => {
      const newItems = s.map((i) =>
        i.productId === productId ? { ...i, quantity: Math.max(1, i.quantity - 1) } : i
      );
      localStorage.setItem('cartItems', JSON.stringify(newItems));
      return newItems;
    });
  };

  return <CartContext.Provider value={{ items, add, remove, clear, increaseQuantity, decreaseQuantity }}>{children}</CartContext.Provider>;
}

export const useCart = () => useContext(CartContext);

export default CartContext;
