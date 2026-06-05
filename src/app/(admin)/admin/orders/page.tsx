import { DataTable } from "@/components/admin/data-table";
import { requireAdmin } from "@/lib/guards";
import { getAdminRows } from "@/services/admin.service";

export default async function AdminOrdersPage() {
  await requireAdmin();
  const orders = await getAdminRows("orders");
  return <section className="container py-10"><h1 className="mb-6 text-3xl font-bold tracking-normal">Manage Orders</h1><DataTable columns={["trackingCode", "status", "paymentMethod", "total"]} rows={orders} /></section>;
}
