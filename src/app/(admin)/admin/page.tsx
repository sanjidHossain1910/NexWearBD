import Link from "next/link";
import { DashboardCards } from "@/components/admin/dashboard-cards";
import { Button } from "@/components/ui/button";
import { requireAdmin } from "@/lib/guards";
import { getDashboardStats } from "@/services/admin.service";

export default async function AdminDashboardPage() {
  await requireAdmin();
  const stats = await getDashboardStats();
  return (
    <section className="container py-10">
      <div className="mb-8 flex w-full items-center">
        <h1 className="text-3xl font-bold tracking-normal">Admin Dashboard</h1>
      </div>
      <DashboardCards stats={stats} />
    </section>
  );
}
