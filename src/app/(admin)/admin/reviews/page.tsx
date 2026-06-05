import { requireAdmin } from "@/lib/guards";

export default async function AdminReviewsPage() {
  await requireAdmin();
  return <section className="container py-10"><h1 className="text-3xl font-bold tracking-normal">Manage Reviews</h1><p className="mt-3 text-muted-foreground">Approve, hide, and audit customer reviews from this workspace.</p></section>;
}
