import { DataTable } from "@/components/admin/data-table";
import { ProductAdminForm } from "@/components/admin/product-admin-form";
import { requireAdmin } from "@/lib/guards";
import { getAdminRows } from "@/services/admin.service";
import { getCategories } from "@/services/category.service";

export default async function AdminProductsPage() {
  await requireAdmin();
  const [products, categories] = await Promise.all([getAdminRows("products"), getCategories()]);
  return (
    <section className="container dark:bg-gray-950 dark:text-white w-full gap-8 py-10">
      <div>
        <h1 className="text-3xl font-bold tracking-normal">Manage Products</h1>
        <p className="mt-2 text-sm text-muted-foreground">Add new Nexwear products</p>
      </div>
      <ProductAdminForm categories={categories.map((category: { name: string; slug: string }) => ({ name: category.name, slug: category.slug }))} />
    </section>
  );
}
