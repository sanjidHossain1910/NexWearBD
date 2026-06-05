"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cart-store";
import { formatCurrency } from "@/lib/utils";
import type { Product } from "@/types";
import { getProductColors, getProductPrimaryImage, getProductSizes } from "@/lib/product-options";

export function ProductPurchase({ product }: { product: Product & { _id: string } }) {
  const colors = getProductColors(product);
  const [color, setColor] = useState(colors[0]?.name ?? "");
  const sizes = getProductSizes(product, color);
  const [size, setSize] = useState(sizes[0]?.size ?? "");
  const addItem = useCartStore((state) => state.addItem);
  const price = product.discountPrice ?? product.price;
  const image = getProductPrimaryImage(product);

  return (
    <div className="grid gap-5">
      <div>
        <p className="text-2xl font-bold">{formatCurrency(price)}</p>
        {product.discountPrice && <p className="text-sm text-muted-foreground line-through">{formatCurrency(product.price)}</p>}
      </div>
      <div>
        <p className="mb-2 text-sm font-medium">Size</p>
        <div className="flex flex-wrap gap-2">{sizes.map((item) => <Button key={item.size} variant={size === item.size ? "default" : "outline"} disabled={item.stock === 0} onClick={() => setSize(item.size)}>{item.size}</Button>)}</div>
      </div>
      <div>
        <p className="mb-2 text-sm font-medium">Color</p>
        <div className="flex flex-wrap gap-2">{colors.map((item) => <Button key={item.name} variant={color === item.name ? "default" : "outline"} onClick={() => {
          setColor(item.name);
          setSize(getProductSizes(product, item.name)[0]?.size ?? "");
        }}><span className="h-3 w-3 rounded-full border" style={{ backgroundColor: item.code }} aria-hidden="true" />{item.name}</Button>)}</div>
      </div>
      <Button size="lg" disabled={!size || !color} onClick={() => addItem({ productId: product._id, name: product.name, slug: product.slug, image, price, size, color, quantity: 1 })}>Add to Cart</Button>
    </div>
  );
}
