import Link from "next/link";
import { categories } from "@/constants";

export function Footer() {
  return (
    <footer className="border-t bg-muted/40">
      <div className="container grid gap-8 py-10 md:grid-cols-4">
        <div>
          <h2 className="text-lg font-bold">Nexwear</h2>
          <p className="mt-3 text-sm text-muted-foreground">Premium everyday menswear designed for Bangladesh.</p>
        </div>
        <div>
          <h3 className="font-semibold">Shop</h3>
          <div className="mt-3 grid gap-2 text-sm text-muted-foreground">
            {categories.slice(0, 4).map((category) => <Link key={category} href={`/category/${category.toLowerCase().replaceAll(" ", "-")}`}>{category}</Link>)}
          </div>
        </div>
        <div>
          <h3 className="font-semibold">Support</h3>
          <div className="mt-3 grid gap-2 text-sm text-muted-foreground">
            <Link href="/account/track-order">Track Order</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/about">About</Link>
          </div>
        </div>
        <div>
          <h3 className="font-semibold">Payments</h3>
          <p className="mt-3 text-sm text-muted-foreground">Cash On Delivery, bKash, and Nagad supported.</p>
        </div>
      </div>
    </footer>
  );
}
