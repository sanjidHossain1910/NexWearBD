import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { requireAdmin } from "@/lib/guards";
import { Coupon } from "@/models/Coupon";

export async function GET() {
  await requireAdmin();
  await connectToDatabase();
  return NextResponse.json(await Coupon.find().sort({ createdAt: -1 }).lean());
}
