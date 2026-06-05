"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { requireAdmin } from "@/lib/guards";
import { connectToDatabase } from "@/lib/db";
import { slugify } from "@/lib/utils";
import { Category } from "@/models/Category";

const categorySchema = z.object({
  name: z.string().min(2),
  description: z.string().optional(),
  image: z.string().url().optional().or(z.literal(""))
});

export async function createCategoryAction(payload: unknown) {
  await requireAdmin();
  const data = categorySchema.parse(payload);
  const slug = slugify(data.name);
  await connectToDatabase();
  const category = await Category.findOneAndUpdate(
    { slug },
    { name: data.name, slug, description: data.description, image: data.image || undefined, isActive: true },
    { upsert: true, new: true }
  );
  revalidatePath("/admin/products");
  revalidatePath("/admin/categories");
  revalidatePath("/shop");
  return JSON.parse(JSON.stringify(category));
}
