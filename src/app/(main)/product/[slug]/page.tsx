import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ProductGallery } from "@/components/products/product-gallery";
import { ProductPurchase } from "@/components/products/product-purchase";
import { ReviewSection } from "@/components/products/review-section";
import { ProductGrid } from "@/components/products/product-grid";
import { Badge } from "@/components/ui/badge";
import { getProductBySlug, getRelatedProducts } from "@/services/product.service";
import TrackRecentView from "@/components/TrackRecentView";
import RecentlyViewed from "@/components/products/RecentlyViewd";
import { getProductImages } from "@/lib/product-options";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  return { title: product?.name ?? "Product", description: product?.description };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();
  const related = await getRelatedProducts(product.category, product.slug);
  const images = getProductImages(product);
  return (
    <div className="container py-10">
      <div className="grid gap-10 lg:grid-cols-2">
        <ProductGallery images={images} name={product.name} />
        <section>
          <Badge>{product.category}</Badge>
          <h1 className="mt-4 text-4xl font-bold tracking-normal">{product.name}</h1>
          <p className="mt-4 text-muted-foreground">{product.description}</p>
          <div className="mt-8"><ProductPurchase product={product} /></div>
        </section>
      </div>
      <div className="mt-12"><ReviewSection rating={product.rating ?? 0} reviewsCount={product.reviewsCount ?? 0} /></div>
      <section className="mt-12">
        <h2 className="mb-6 text-2xl font-bold tracking-normal">Related Products</h2>
        <ProductGrid products={related} />
      </section>
      <RecentlyViewed />
      <TrackRecentView productId={product._id} />
    </div>
  );
}
