"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/guards";
import { connectToDatabase } from "@/lib/db";
import { Product } from "@/models/Product";
import RecentView from "@/models/RecentView";
import { productSchema } from "@/validators/product";

export async function upsertProductAction(payload: unknown) {
  await requireAdmin();
  const data = productSchema.parse(payload);
  await connectToDatabase();
  const product = await Product.findOneAndUpdate({ slug: data.slug }, data, { upsert: true, new: true });
  revalidatePath("/shop");
  revalidatePath("/admin/products");
  revalidatePath("/");
  revalidatePath(`/product/${data.slug}`);
  return JSON.parse(JSON.stringify(product));
}

