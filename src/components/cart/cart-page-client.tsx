"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import { useCartStore } from "@/store/cart-store";

export function CartPageClient() {
  const { items, total } = useCartStore();
  return (
    <section className="container py-10">
      <h1 className="text-3xl font-bold tracking-normal">Cart</h1>
      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="grid gap-4">{items.map((item) => <div key={`${item.productId}:${item.size}:${item.color}`} className="flex justify-between rounded-lg border p-4"><div><p className="font-semibold">{item.name}</p><p className="text-sm text-muted-foreground">{item.size} / {item.color} x {item.quantity}</p></div><p>{formatCurrency(item.price * item.quantity)}</p></div>)}</div>
        <aside className="h-fit rounded-lg border p-5"><div className="flex justify-between font-semibold"><span>Total</span><span>{formatCurrency(total())}</span></div><Button className="mt-4 w-full" asChild><Link href="/checkout">Checkout</Link></Button></aside>
      </div>
    </section>
  );
}
