import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { z } from "zod";
import { authOptions } from "@/lib/auth";
import { getUserWishlist, toggleUserWishlist } from "@/services/user.service";

const wishlistSchema = z.object({ productId: z.string() });

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ products: [] }, { status: 401 });
  return NextResponse.json({ products: await getUserWishlist(session.user.id) });
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ message: "Login required" }, { status: 401 });
  const parsed = wishlistSchema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ errors: parsed.error.flatten() }, { status: 400 });
  return NextResponse.json(await toggleUserWishlist(session.user.id, parsed.data.productId));
}
