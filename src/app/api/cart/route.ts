import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { z } from "zod";
import { authOptions } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import { Cart } from "@/models/Cart";

const cartItemSchema = z.object({
  productId: z.string(),
  name: z.string(),
  slug: z.string(),
  image: z.string(),
  price: z.number().nonnegative(),
  size: z.string(),
  color: z.string(),
  quantity: z.number().int().positive()
});

const cartSchema = z.object({
  items: z.array(cartItemSchema)
});

type SavedCart = {
  items: z.infer<typeof cartItemSchema>[];
};

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ items: [] }, { status: 401 });
  await connectToDatabase();
  const cart = await Cart.findOne({ user: session.user.id }).lean<SavedCart | null>();
  return NextResponse.json({ items: cart?.items ?? [] });
}

export async function PUT(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ message: "Login required" }, { status: 401 });
  const parsed = cartSchema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ errors: parsed.error.flatten() }, { status: 400 });
  await connectToDatabase();
  const cart = await Cart.findOneAndUpdate<SavedCart>(
    { user: session.user.id },
    { user: session.user.id, items: parsed.data.items },
    { upsert: true, new: true }
  );
  return NextResponse.json({ items: cart.items });
}
