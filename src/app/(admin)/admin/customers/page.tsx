import { DataTable } from "@/components/admin/data-table";
import { requireAdmin } from "@/lib/guards";
import { getAdminRows } from "@/services/admin.service";

export default async function AdminCustomersPage() {
  await requireAdmin();
  const customers = await getAdminRows("customers");
  return <section className="container py-10"><h1 className="mb-6 text-3xl font-bold tracking-normal">Manage Customers</h1><DataTable columns={["name", "email", "role"]} rows={customers} /></section>;
}
