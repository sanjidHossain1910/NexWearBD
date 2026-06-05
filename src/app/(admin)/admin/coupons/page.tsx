import { requireAdmin } from "@/lib/guards";

export default async function AdminCouponsPage() {
  await requireAdmin();
  return <section className="container py-10"><h1 className="text-3xl font-bold tracking-normal">Manage Coupons</h1><p className="mt-3 text-muted-foreground">Create percentage or fixed amount promotions with limits and expiry dates.</p></section>;
}
