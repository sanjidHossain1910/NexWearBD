import type { Metadata } from "next";
import { ProductGrid } from "@/components/products/product-grid";
import { getProducts } from "@/services/product.service";

export const dynamic = "force-dynamic";

function titleFromSlug(slug: string) {
  return slug.split("-").map((part) => part[0].toUpperCase() + part.slice(1)).join(" ");
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return { title: titleFromSlug(slug) };
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = titleFromSlug(slug);
  const { items } = await getProducts({ category });
  return (
    <section className="container py-10">
      <h1 className="text-3xl font-bold tracking-normal">{category}</h1>
      <p className="mt-2 text-muted-foreground">Browse the latest {category.toLowerCase()} from Nexwear.</p>
      <div className="mt-8"><ProductGrid products={items} /></div>
    </section>
  );
}
