import { categories } from "@/constants";
import { connectToDatabase } from "@/lib/db";
import { Category } from "@/models/Category";

export async function getCategories() {
  await connectToDatabase();
  const dbCategories = await Category.find({ isActive: true }).sort({ name: 1 }).lean();
  if (dbCategories.length) return JSON.parse(JSON.stringify(dbCategories));
  return categories.map((name) => ({ name, slug: name.toLowerCase().replaceAll(" ", "-"), description: `${name} by Nexwear` }));
}
