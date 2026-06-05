"use client";

import { useEffect, useRef } from "react";
import { useAppSelector } from "@/store/redux-hooks";
interface Props {
  productId: string;
}


interface Props {
  productId: string;
}

export default function TrackRecentView({ productId }: Props) {
  const { isAuthenticated, currentUser } = useAppSelector(
    (state) => state.user
  );
  const tracked = useRef(false);

  useEffect(() => {
    const trackView = async () => {
      if (tracked.current) return;

      tracked.current = true;
      const key = "recentViewProducts";
      if (isAuthenticated && currentUser) {
        await fetch("/api/recentview", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: currentUser.id,
            productId,
          }),
        });
      } else {
        const recent: string[] = JSON.parse(
          localStorage.getItem(key) || "[]"
        );

        const updated = [
          productId,
          ...recent.filter((id) => id !== productId),
        ].slice(0, 10);

        localStorage.setItem(key, JSON.stringify(updated));
      }
    };
    trackView();
  }, [productId, isAuthenticated, currentUser]);

  return null;
}