"use client";

import { useEffect, useRef, useState } from "react";
import { useAppSelector } from "@/store/redux-hooks";
import { ProductGrid } from "./product-grid";
import { ProductCard } from "./product-card";
import { ArrowBigLeft, ArrowBigRight } from "lucide-react";
import { getRecentlyViewedProductsByIds } from "@/actions/recentviwes.product"


export default function RecentlyViewed() {
  const { isAuthenticated, currentUser, loading } = useAppSelector(
    (state) => state.user
  );

  const [products, setProducts] = useState<string[]>([]);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);


  useEffect(() => {
    const load = async () => {
      if (loading) return;
      if (isAuthenticated && currentUser?.id) {
        const res = await fetch(
          `/api/recentview?userId=${currentUser.id}`,

          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data: string[] = await res.json();
        setProducts(data);
      } else {
        const local: string[] = JSON.parse(
          localStorage.getItem("recentViewProducts") || "[]"
        );
        const products = await getRecentlyViewedProductsByIds(local);
        setProducts(products);
      }
    };

    load();
  }, [isAuthenticated, currentUser]);

  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;

    const amount = 300;

    scrollRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };


  return (
    <>
      {products.length > 0 &&
        <div>
          <section className="mt-12 relative">
            <h2 className="mb-6 ml-5 text-2xl font-bold tracking-normal">
              Recently Viewed
            </h2>

            {/* Left Button */}
            <button
              type="button"
              onClick={() => scroll("left")}
              // disabled={!canScrollLeft}
              className={`absolute left-1 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md p-2 rounded-full transition-opacity`}
            >
              <ArrowBigLeft />
            </button>

            {/* Right Button */}
            <button
              type="button"
              onClick={() => scroll("right")}
              // disabled={!canScrollRight}
              className={`absolute right-1 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md p-2 rounded-full transition-opacity `}
            >
              <ArrowBigRight />
            </button>

            {/* Scroll Container */}
            <div
              ref={scrollRef}
              className="flex scrollbar-hide gap-4 overflow-x-auto scroll-smooth px-5"
            >
              {products.map((product: any) => (
                <div
                  key={product._id}
                  className="min-w-[220px] h-full flex-shrink-0"
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </section>
        </div>}
    </>
  );
}