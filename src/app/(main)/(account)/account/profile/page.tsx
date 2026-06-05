import Link from "next/link";
import { AccountNav } from "@/components/account/account-nav";
import { Button } from "@/components/ui/button";
import { requireUser } from "@/lib/guards";
import { getUserOrders } from "@/services/order.service";
import { getUserProfile, getUserWishlist } from "@/services/user.service";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
export default async function ProfilePage() {
  const session = await requireUser();
  const [profile, orders, wishlist] = await Promise.all([
    getUserProfile(session.user.id),
    getUserOrders(session.user.id),
    getUserWishlist(session.user.id)
  ]);
  const pendingOrders = orders.filter((order: { status: string }) => ["Pending", "Confirmed", "Packed", "Shipped"].includes(order.status)).length;
  return (
    <section className="container py-10">
      <AccountNav />
      <h1 className="text-3xl font-bold tracking-normal">Profile</h1>
      <div className="mt-6 grid gap-5 lg:grid-cols-[1fr_320px]">
        <div className="rounded-lg border p-5">
          <div className="flex items-center gap-4">
            <Avatar>
              <AvatarImage
                src={profile?.image}
                alt={profile?.name ?? session.user.name}
              />
              <AvatarFallback>{profile?.name?.charAt(0) ?? session.user.name?.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm text-muted-foreground">Name</p>
              <p className="font-semibold">{profile?.name ?? session.user.name}</p>
            </div>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">Email</p>
          <p>{profile?.email ?? session.user.email}</p>
        </div>
        <div className="grid gap-3">
          <div className="rounded-lg border p-5"><p className="text-sm text-muted-foreground">All Orders</p><p className="text-2xl font-bold">{orders.length}</p></div>
          <div className="rounded-lg border p-5"><p className="text-sm text-muted-foreground">Active Orders</p><p className="text-2xl font-bold">{pendingOrders}</p></div>
          <div className="rounded-lg border p-5"><p className="text-sm text-muted-foreground">Wishlist</p><p className="text-2xl font-bold">{wishlist.length}</p></div>
        </div>
      </div>
      <div className="mt-6 flex flex-wrap gap-3">
        <Button asChild><Link href="/account/orders">View My Orders</Link></Button>
        <Button variant="outline" asChild><Link href="/account/wishlist">View Wishlist</Link></Button>
      </div>
    </section>
  );
}
