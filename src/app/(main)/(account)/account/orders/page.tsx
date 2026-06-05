import { OrderTable } from "@/components/account/order-table";
import { AccountNav } from "@/components/account/account-nav";
import { requireUser } from "@/lib/guards";
import { getUserOrders } from "@/services/order.service";

export default async function MyOrdersPage() {
  const session = await requireUser();
  const orders = await getUserOrders(session.user.id);
  return (
    <section className="container py-10">
      <AccountNav />
      <h1 className="mb-2 text-3xl font-bold tracking-normal">My Orders</h1>
      <p className="mb-8 text-sm text-muted-foreground">Track all orders with Pending, Confirmed, Packed, Shipped, Delivered, Cancelled, and Returned statuses.</p>
      <OrderTable orders={orders} />
    </section>
  );
}
