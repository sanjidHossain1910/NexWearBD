"use client";

import { create } from "zustand";

type WishlistState = {
  ids: string[];
  hydrate: () => Promise<void>;
  toggle: (id: string) => void;
};

export const useWishlistStore = create<WishlistState>((set) => ({
  ids: [],
  hydrate: async () => {
    try {
      const response = await fetch("/api/wishlist", { cache: "no-store" });
      if (!response.ok) return;
      const data = (await response.json()) as { products?: Array<{ _id: string }> };
      set({ ids: data.products?.map((product) => product._id) ?? [] });
    } catch {
      // Keep the local wishlist if the user is a guest or the request fails.
    }
  },
  toggle: (id) => {
    set((state) => ({ ids: state.ids.includes(id) ? state.ids.filter((item) => item !== id) : [...state.ids, id] }));
    void fetch("/api/wishlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId: id })
    }).catch(() => undefined);
  }
}));
