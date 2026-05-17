'use client';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Types
interface User { _id: string; name: string; email: string; role: string; }
interface CartItem { productId: string; name: string; price: number; image: string; qty: number; }

// Auth Store
interface AuthStore {
  user: User | null;
  token: string | null;
  setAuth: (user: User, token: string) => void;
  logout: () => void;
  isAdmin: () => boolean;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      setAuth: (user, token) => {
        if (typeof window !== 'undefined') localStorage.setItem('rp_token', token);
        set({ user, token });
      },
      logout: () => {
        if (typeof window !== 'undefined') localStorage.removeItem('rp_token');
        set({ user: null, token: null });
      },
      isAdmin: () => get().user?.role === 'admin',
    }),
    { name: 'rp-auth', partialize: (state) => ({ user: state.user, token: state.token }) }
  )
);

// Cart Store
interface CartStore {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (productId: string) => void;
  updateQty: (productId: string, qty: number) => void;
  clearCart: () => void;
  total: () => number;
  count: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => {
        const existing = get().items.find(i => i.productId === item.productId);
        if (existing) {
          set({ items: get().items.map(i => i.productId === item.productId ? { ...i, qty: i.qty + item.qty } : i) });
        } else {
          set({ items: [...get().items, item] });
        }
      },
      removeItem: (productId) => set({ items: get().items.filter(i => i.productId !== productId) }),
      updateQty: (productId, qty) => {
        if (qty <= 0) { get().removeItem(productId); return; }
        set({ items: get().items.map(i => i.productId === productId ? { ...i, qty } : i) });
      },
      clearCart: () => set({ items: [] }),
      total: () => get().items.reduce((sum, i) => sum + i.price * i.qty, 0),
      count: () => get().items.reduce((sum, i) => sum + i.qty, 0),
    }),
    { name: 'rp-cart' }
  )
);

// Wishlist Store
interface WishlistStore {
  items: string[];
  toggle: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],
      toggle: (productId) => {
        const isIn = get().items.includes(productId);
        set({ items: isIn ? get().items.filter(id => id !== productId) : [...get().items, productId] });
      },
      isInWishlist: (productId) => get().items.includes(productId),
    }),
    { name: 'rp-wishlist' }
  )
);
