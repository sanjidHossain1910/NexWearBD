"use client";

import { create } from "zustand";
import type { CartItem } from "@/types";

type CartState = {
  items: CartItem[];
  hydrateFromDatabase: () => Promise<void>;
  addItem: (item: CartItem) => void;
  decrementItem: (key: string) => void;
  decrementProduct: (productId: string) => void;
  getProductQuantity: (productId: string) => number;
  removeItem: (key: string) => void;
  clear: () => void;
  total: () => number;
};

const itemKey = (item: Pick<CartItem, "productId" | "size" | "color">) => `${item.productId}:${item.size}:${item.color}`;

async function persistCart(items: CartItem[]) {
  try {
    await fetch("/api/cart", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items })
    });
  } catch {
    // Guest users and offline sessions keep the local cart only.
  }
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  hydrateFromDatabase: async () => {
    try {
      const response = await fetch("/api/cart", { cache: "no-store" });
      if (!response.ok) return;
      const data = (await response.json()) as { items?: CartItem[] };
      set({ items: data.items ?? [] });
    } catch {
      // Keep local cart if the database cart is unavailable.
    }
  },
  addItem: (item) => {
    set((state) => {
      const key = itemKey(item);
      const existing = state.items.find((cartItem) => itemKey(cartItem) === key);
      if (existing) {
        return { items: state.items.map((cartItem) => (itemKey(cartItem) === key ? { ...cartItem, quantity: cartItem.quantity + item.quantity } : cartItem)) };
      }
      return { items: [...state.items, item] };
    });
    void persistCart(get().items);
  },
  decrementItem: (key) => {
    set((state) => {
      const target = state.items.find((item) => itemKey(item) === key);
      if (!target) return state;
      if (target.quantity <= 1) {
        return { items: state.items.filter((item) => itemKey(item) !== key) };
      }
      return {
        items: state.items.map((item) => (itemKey(item) === key ? { ...item, quantity: item.quantity - 1 } : item))
      };
    });
    void persistCart(get().items);
  },
  decrementProduct: (productId) => {
    set((state) => {
      const target = state.items.find((item) => item.productId === productId);
      if (!target) return state;
      const key = itemKey(target);
      if (target.quantity <= 1) {
        return { items: state.items.filter((item) => itemKey(item) !== key) };
      }
      return {
        items: state.items.map((item) => (itemKey(item) === key ? { ...item, quantity: item.quantity - 1 } : item))
      };
    });
    void persistCart(get().items);
  },
  getProductQuantity: (productId) => get().items.filter((item) => item.productId === productId).reduce((sum, item) => sum + item.quantity, 0),
  removeItem: (key) => {
    set((state) => ({ items: state.items.filter((item) => itemKey(item) !== key) }));
    void persistCart(get().items);
  },
  clear: () => {
    set({ items: [] });
    void persistCart([]);
  },
  total: () => get().items.reduce((sum, item) => sum + item.price * item.quantity, 0)
}));
