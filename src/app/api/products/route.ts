import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { requireAdmin } from "@/lib/guards";
import { Product } from "@/models/Product";
import { getProducts } from "@/services/product.service";
import { productSchema } from "@/validators/product";

export async function GET(request: Request) {
  const params = Object.fromEntries(new URL(request.url).searchParams);
  return NextResponse.json(await getProducts(params));
}

export async function POST(request: Request) {
  await requireAdmin();
  const parsed = productSchema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ errors: parsed.error.flatten() }, { status: 400 });
  await connectToDatabase();
  const product = await Product.create(parsed.data);
  return NextResponse.json(product, { status: 201 });
}
