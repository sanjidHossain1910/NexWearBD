import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getOrderByTrackingCode } from "@/services/order.service";

export const dynamic = "force-dynamic";

export default async function TrackOrderPage({ searchParams }: { searchParams: Promise<{ code?: string }> }) {
  const { code } = await searchParams;
  const order = code ? await getOrderByTrackingCode(code) : null;
  return <section className="container max-w-xl py-10"><h1 className="text-3xl font-bold tracking-normal">Track Order</h1><form className="mt-6 flex gap-2"><Input name="code" placeholder="NXW tracking code" defaultValue={code} /><Button>Track</Button></form>{order && <div className="mt-6 rounded-lg border p-5"><p className="font-semibold">{order.trackingCode}</p><p className="text-sm text-muted-foreground">Status: {order.status}</p></div>}</section>;
}
