import { connectToDatabase } from "@/lib/db";
import { Product } from "@/models/Product";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  await connectToDatabase();

  const { searchParams } = request.nextUrl;
  const q = searchParams.get("q") || "";

  const products = await Product.find({
    name: {
      $regex: q,
      $options: "i",
    },
  })
    .limit(10)
    .lean();

  return Response.json({ products });
}