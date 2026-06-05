import type { Metadata } from "next";
import { ProductFilters } from "@/components/products/product-filters";
import { ProductGrid } from "@/components/products/product-grid";
import { getProducts } from "@/services/product.service";

export const metadata: Metadata = { title: "Shop" };
export const dynamic = "force-dynamic";

export default async function ShopPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const params = await searchParams;
  const { items, total, page, pages } = await getProducts(params);
  return (
    <div className="container grid gap-8 py-10 lg:grid-cols-[260px_1fr]">
      <ProductFilters />
      <section>
        <div className="mb-6 flex items-end justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-normal">Shop Nexwear</h1>
            <p className="mt-1 text-sm text-muted-foreground">{total} products found</p>
          </div>
          <p className="text-sm text-muted-foreground">Page {page} of {Math.max(pages, 1)}</p>
        </div>
        <ProductGrid products={items} />
      </section>
    </div>
  );
}
