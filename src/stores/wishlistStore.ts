import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { WishlistItem } from '../types';

interface WishlistStore {
  items: WishlistItem[];
  addItem: (item: WishlistItem) => void;
  removeItem: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
  toggleWishlist: (item: WishlistItem) => void;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) => {
        if (!get().isWishlisted(item.productId)) {
          set((state) => ({ items: [...state.items, item] }));
        }
      },

      removeItem: (productId) => {
        set((state) => ({ items: state.items.filter((i) => i.productId !== productId) }));
      },

      isWishlisted: (productId) => get().items.some((i) => i.productId === productId),

      toggleWishlist: (item) => {
        if (get().isWishlisted(item.productId)) {
          get().removeItem(item.productId);
        } else {
          get().addItem(item);
        }
      },
    }),
    { name: 'shesafe-wishlist' }
  )
);
