"use client";

import { useEffect } from "react";
import { ProductCard } from "@/components/products/product-card";
import { useAppDispatch, useAppSelector } from "@/store/redux-hooks";
import { setProducts } from "@/store/slices/product-slice";
import type { Product } from "@/types";

export function ProductGrid({ products }: { products: Array<Product & { _id: string }> }) {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setProducts({ items: products }));
  }, [dispatch, products]);

  if (!products.length) return <p className="rounded-lg border p-8 text-center text-muted-foreground">No products found.</p>;
  return (
    <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
      {products.map((product) => <ProductCard key={product._id} product={product} />)}
    </div>
  );
}
