"use client";

import { useEffect, useState } from "react";

const key = "nexwear:recently-viewed";

export function useRecentlyViewed(slug?: string) {
  const [items, setItems] = useState<string[]>([]);

  useEffect(() => {
    const current = JSON.parse(localStorage.getItem(key) ?? "[]") as string[];
    const next = slug ? [slug, ...current.filter((item) => item !== slug)].slice(0, 8) : current;
    localStorage.setItem(key, JSON.stringify(next));
    setItems(next);
  }, [slug]);

  return items;
}
