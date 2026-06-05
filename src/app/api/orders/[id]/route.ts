import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { requireAdmin } from "@/lib/guards";
import { Order } from "@/models/Order";

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  await requireAdmin();
  const { id } = await params;
  await connectToDatabase();
  const order = await Order.findByIdAndUpdate(id, await request.json(), { new: true });
  return NextResponse.json(order);
}
