import { requireAdmin } from "@/lib/guards";
import { categories } from "@/constants";

export default async function AdminCategoriesPage() {
  await requireAdmin();
  return <section className="container py-10"><h1 className="mb-6 text-3xl font-bold tracking-normal">Manage Categories</h1><div className="grid gap-3 md:grid-cols-3">{categories.map((category) => <div key={category} className="rounded-lg border p-4 font-medium">{category}</div>)}</div></section>;
}
