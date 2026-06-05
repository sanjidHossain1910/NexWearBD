import Link from "next/link";
import { ProductGrid } from "@/components/products/product-grid";
import { SectionHeading } from "@/components/common/section-heading";
import { Button } from "@/components/ui/button";
import type { Product } from "@/types";

export function ProductSection({ title, subtitle, products }: { title: string; subtitle: string; products: Array<Product & { _id: string }> }) {
  return (
    <section className="container py-12">
      <div className="flex items-end justify-between gap-4">
        <SectionHeading title={title} subtitle={subtitle} />
        <Button variant="outline" asChild className="mb-6 hidden sm:inline-flex"><Link href="/shop">View all</Link></Button>
      </div>
      <ProductGrid products={products} />
    </section>
  );
}
