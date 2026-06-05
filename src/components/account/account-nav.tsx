import Link from "next/link";
import { Heart, Package, User } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AccountNav() {
  return (
    <nav className="mb-8 flex flex-wrap gap-2">
      <Button variant="outline" asChild><Link href="/account/profile"><User className="h-4 w-4" /> Profile</Link></Button>
      <Button variant="outline" asChild><Link href="/account/orders"><Package className="h-4 w-4" /> My Orders</Link></Button>
      <Button variant="outline" asChild><Link href="/account/wishlist"><Heart className="h-4 w-4" /> Wishlist</Link></Button>
    </nav>
  );
}
