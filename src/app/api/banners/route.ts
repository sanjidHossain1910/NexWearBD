import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { Banner } from "@/models/Banner";

export async function GET() {
  await connectToDatabase();
  return NextResponse.json(await Banner.find({ isActive: true }).sort({ sortOrder: 1 }).lean());
}
