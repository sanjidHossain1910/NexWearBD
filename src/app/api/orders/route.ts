import { NextResponse } from "next/server";
import { requireUser } from "@/lib/guards";
import { createOrder, getUserOrders } from "@/services/order.service";

export async function GET() {
  const session = await requireUser();
  return NextResponse.json(await getUserOrders(session.user.id));
}

export async function POST(request: Request) {
  const session = await requireUser();
  const order = await createOrder(session.user.id, await request.json());
  return NextResponse.json(order, { status: 201 });
}
