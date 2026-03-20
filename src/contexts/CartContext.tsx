import { createContext, useContext, useEffect, useState } from 'react';
import { toast } from 'material-react-toastify';
import { useAuth } from './AuthContext';
import {
  addToCart,
  clearCart,
  getCart,
  removeCartItem,
  updateCartItem,
} from '../services/cartService';
import type { CartItemType, ServerCartItem } from '../services/cartService';

export type CartItem = {
  cartItemId?: number;
  itemType: CartItemType;
  productId?: string;
  packageId?: string;
  name?: string;
  price: number;
  quantity: number;
  stock?: number | null;
};

type CartContextValue = {
  items: CartItem[];
  add: (item: CartItem) => void;
  remove: (itemKey: string) => void;
  clear: () => void;
  increaseQuantity: (itemKey: string) => void;
  decreaseQuantity: (itemKey: string) => void;
};

const CartContext = createContext<CartContextValue>({
  items: [],
  add: () => {},
  remove: () => {},
  clear: () => {},
  increaseQuantity: () => {},
  decreaseQuantity: () => {},
});

const CART_STORAGE_KEY = 'cartItems';

const normalizeQuantity = (itemType: CartItemType, quantity: number) =>
  itemType === 'package' ? 1 : Math.max(1, Number(quantity || 1));

export const getCartItemKey = (item: Pick<CartItem, 'itemType' | 'productId' | 'packageId'>) =>
  item.itemType === 'package'
    ? `package:${String(item.packageId || '')}`
    : `product:${String(item.productId || '')}`;

const mapServerItem = (item: ServerCartItem): CartItem => ({
  cartItemId: item.id,
  itemType: item.itemType,
  productId: item.productId ? String(item.productId) : undefined,
  packageId: item.packageId ? String(item.packageId) : undefined,
  name: item.name,
  price: Number(item.unitPrice),
  quantity: normalizeQuantity(item.itemType, item.quantity),
  stock: item.stock ?? null,
});

const mapServerItems = (serverItems: ServerCartItem[]): CartItem[] =>
  serverItems.map(mapServerItem);

const readLocalCartItems = (): CartItem[] => {
  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    return stored ? (JSON.parse(stored) as CartItem[]) : [];
  } catch {
    return [];
  }
};

const normalizeIncomingItem = (item: CartItem): CartItem | null => {
  const itemType: CartItemType = item.itemType === 'package' ? 'package' : 'product';
  const productId = itemType === 'product' ? String(item.productId || '').trim() : undefined;
  const packageId = itemType === 'package' ? String(item.packageId || '').trim() : undefined;
  if (itemType === 'product' && !productId) return null;
  if (itemType === 'package' && !packageId) return null;

  return {
    ...item,
    itemType,
    productId,
    packageId,
    quantity: normalizeQuantity(itemType, item.quantity),
  };
};

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const [items, setItems] = useState<CartItem[]>(() => readLocalCartItems());

  const persistLocal = (
    nextItemsOrUpdater: CartItem[] | ((prev: CartItem[]) => CartItem[])
  ) => {
    setItems((prev) => {
      const next =
        typeof nextItemsOrUpdater === 'function'
          ? (nextItemsOrUpdater as (prev: CartItem[]) => CartItem[])(prev)
          : nextItemsOrUpdater;
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  };

  useEffect(() => {
    if (!user) return;
    let cancelled = false;

    const syncCartAfterLogin = async () => {
      try {
        const localItems = readLocalCartItems();
        const guestItems = localItems.filter((item) => !item.cartItemId && item.quantity > 0);
        const merged = new Map<string, CartItem>();

        for (const rawItem of guestItems) {
          const normalized = normalizeIncomingItem(rawItem);
          if (!normalized) continue;
          const key = getCartItemKey(normalized);
          const existing = merged.get(key);
          if (!existing) {
            merged.set(key, normalized);
            continue;
          }
          const mergedQty =
            normalized.itemType === 'package'
              ? 1
              : normalizeQuantity(normalized.itemType, existing.quantity + normalized.quantity);
          merged.set(key, { ...existing, quantity: mergedQty });
        }

        for (const item of merged.values()) {
          try {
            await addToCart({
              itemType: item.itemType,
              quantity: item.quantity,
              productId: item.productId,
              packageId: item.packageId,
            });
          } catch {
            // Continue syncing remaining items, then refresh cart from server.
          }
        }

        const resp = await getCart();
        if (!cancelled) {
          persistLocal(mapServerItems(resp.data.items));
        }
      } catch {
        if (!cancelled) {
          toast.error('Unable to sync cart with server');
        }
      }
    };

    void syncCartAfterLogin();
    return () => {
      cancelled = true;
    };
  }, [user?.id]);

  const updateLocalByKey = (itemKey: string, updater: (item: CartItem) => CartItem) => {
    persistLocal((prev) => prev.map((item) => (getCartItemKey(item) === itemKey ? updater(item) : item)));
  };

  const add = (incoming: CartItem) => {
    const item = normalizeIncomingItem(incoming);
    if (!item) {
      toast.error('Invalid cart item');
      return;
    }

    if (!user) {
      persistLocal((prev) => {
        const key = getCartItemKey(item);
        const existing = prev.find((it) => getCartItemKey(it) === key);
        if (!existing) return [...prev, item];

        const nextQty =
          item.itemType === 'package'
            ? 1
            : normalizeQuantity(item.itemType, existing.quantity + item.quantity);
        return prev.map((it) => (getCartItemKey(it) === key ? { ...it, quantity: nextQty } : it));
      });
      toast.success('Added to cart');
      return;
    }

    addToCart({
      itemType: item.itemType,
      quantity: item.quantity,
      productId: item.productId,
      packageId: item.packageId,
    })
      .then((resp) => {
        persistLocal(mapServerItems(resp.data.items));
        toast.success('Added to cart');
      })
      .catch((err: any) => {
        toast.error(err?.response?.data?.error || 'Unable to add item to cart');
      });
  };

  const increaseQuantity = (itemKey: string) => {
    const current = items.find((item) => getCartItemKey(item) === itemKey);
    if (!current) return;

    if (current.itemType === 'package') {
      toast.info('Package quantity is fixed to 1');
      return;
    }

    const nextQty = current.quantity + 1;
    if (!user || !current.cartItemId) {
      updateLocalByKey(itemKey, (it) => ({ ...it, quantity: nextQty }));
      toast.success('Cart updated');
      return;
    }

    updateCartItem(current.cartItemId, nextQty)
      .then((resp) => {
        persistLocal(mapServerItems(resp.data.items));
        toast.success('Cart updated');
      })
      .catch(() => {
        toast.error('Unable to update quantity');
      });
  };

  const decreaseQuantity = (itemKey: string) => {
    const current = items.find((item) => getCartItemKey(item) === itemKey);
    if (!current) return;

    if (current.itemType === 'package') {
      toast.info('Package quantity is fixed to 1');
      return;
    }

    const nextQty = Math.max(1, current.quantity - 1);
    if (!user || !current.cartItemId) {
      updateLocalByKey(itemKey, (it) => ({ ...it, quantity: nextQty }));
      toast.success('Cart updated');
      return;
    }

    updateCartItem(current.cartItemId, nextQty)
      .then((resp) => {
        persistLocal(mapServerItems(resp.data.items));
        toast.success('Cart updated');
      })
      .catch(() => {
        toast.error('Unable to update quantity');
      });
  };

  const remove = (itemKey: string) => {
    const current = items.find((item) => getCartItemKey(item) === itemKey);
    if (!current) return;

    if (!user || !current.cartItemId) {
      persistLocal((prev) => prev.filter((item) => getCartItemKey(item) !== itemKey));
      toast.success('Item removed');
      return;
    }

    removeCartItem(current.cartItemId)
      .then((resp) => {
        persistLocal(mapServerItems(resp.data.items));
        toast.success('Item removed');
      })
      .catch(() => {
        toast.error('Unable to remove item');
      });
  };

  const clear = () => {
    if (!user) {
      persistLocal([]);
      toast.success('Cart cleared');
      return;
    }

    clearCart()
      .then((resp) => {
        persistLocal(mapServerItems(resp.data.items));
        toast.success('Cart cleared');
      })
      .catch(() => {
        toast.error('Unable to clear cart');
      });
  };

  return (
    <CartContext.Provider value={{ items, add, remove, clear, increaseQuantity, decreaseQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

export default CartContext;
