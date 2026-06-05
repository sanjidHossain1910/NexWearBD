import { formatCurrency } from "@/lib/utils";

type Order = {
  _id: string;
  trackingCode: string;
  status: string;
  paymentMethod?: string;
  total: number;
  createdAt: string;
  items?: Array<{ name?: string; quantity?: number }>;
};

const statusStyles: Record<string, string> = {
  Pending: "border-amber-200 bg-amber-50 text-amber-700",
  Confirmed: "border-sky-200 bg-sky-50 text-sky-700",
  Packed: "border-indigo-200 bg-indigo-50 text-indigo-700",
  Shipped: "border-blue-200 bg-blue-50 text-blue-700",
  Delivered: "border-emerald-200 bg-emerald-50 text-emerald-700",
  Cancelled: "border-red-200 bg-red-50 text-red-700",
  Returned: "border-zinc-200 bg-zinc-50 text-zinc-700"
};

function StatusBadge({ status }: { status: string }) {
  return <span className={`inline-flex rounded-md border px-2 py-1 text-xs font-semibold ${statusStyles[status] ?? statusStyles.Pending}`}>{status}</span>;
}

export function OrderTable({ orders }: { orders: Order[] }) {
  if (!orders.length) return <p className="rounded-lg border p-8 text-center text-muted-foreground">You have not placed any orders yet.</p>;

  return (
    <div className="grid gap-4">
      {orders.map((order) => (
        <article key={order._id} className="rounded-lg border p-4">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="font-semibold">{order.trackingCode}</p>
              <p className="text-sm text-muted-foreground">{new Date(order.createdAt).toLocaleDateString()} · {order.paymentMethod ?? "Payment pending"}</p>
            </div>
            <StatusBadge status={order.status} />
          </div>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t pt-4">
            <p className="text-sm text-muted-foreground">{order.items?.length ?? 0} item types</p>
            <p className="font-bold">{formatCurrency(order.total)}</p>
          </div>
        </article>
      ))}
    </div>
  );
}
