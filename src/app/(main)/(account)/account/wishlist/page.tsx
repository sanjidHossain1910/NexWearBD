import { AccountNav } from "@/components/account/account-nav";
import { ProductGrid } from "@/components/products/product-grid";
import { requireUser } from "@/lib/guards";
import { getUserWishlist } from "@/services/user.service";

export default async function WishlistPage() {
  const session = await requireUser();
  const products = await getUserWishlist(session.user.id);
  return (
    <section className="container py-10">
      <AccountNav />
      <h1 className="mb-2 text-3xl font-bold tracking-normal">Wishlist</h1>
      <p className="mb-8 text-sm text-muted-foreground">Products you saved for later.</p>
      <ProductGrid products={products} />
    </section>
  );
}
