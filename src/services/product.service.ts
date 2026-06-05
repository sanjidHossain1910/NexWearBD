import { connectToDatabase } from "@/lib/db";
import { Product } from "@/models/Product";
import { productQuerySchema } from "@/validators/product";

export async function getProducts(searchParams: Record<string, string | string[] | undefined> = {}) {
  await connectToDatabase();
  const params = Object.fromEntries(Object.entries(searchParams).map(([key, value]) => [key, Array.isArray(value) ? value[0] : value]));
  const query = productQuerySchema.parse(params);
  const filter: Record<string, unknown> = {};
  if (query.q) filter.$text = { $search: query.q };
  if (query.category) filter.category = query.category;
  if (query.size) filter["sizes.size"] = query.size;
  if (query.color) filter.colors = query.color;
  if (query.min || query.max) filter.price = { ...(query.min ? { $gte: query.min } : {}), ...(query.max ? { $lte: query.max } : {}) };

  const sort: Record<string, 1 | -1> = query.sort === "price-asc" ? { price: 1 } : query.sort === "price-desc" ? { price: -1 } : query.sort === "rating" ? { rating: -1 } : { createdAt: -1 };
  const limit = 12;
  const skip = (query.page - 1) * limit;
  const [items, total] = await Promise.all([
    Product.find(filter).sort(sort).skip(skip).limit(limit).lean(),
    Product.countDocuments(filter)
  ]);
  return { items: JSON.parse(JSON.stringify(items)), total, page: query.page, pages: Math.ceil(total / limit) };
}

export async function getProductBySlug(slug: string) {
  await connectToDatabase();
  const product = await Product.findOne({ slug }).lean();
  return product ? JSON.parse(JSON.stringify(product)) : null;
}

export async function getHomeProducts() {
  await connectToDatabase();
  const [featured, arrivals, bestSellers] = await Promise.all([
    Product.find({ featured: true }).limit(8).lean(),
    Product.find({}).sort({ createdAt: -1 }).limit(8).lean(),
    Product.find({ bestSeller: true }).limit(8).lean()
  ]);
  return JSON.parse(JSON.stringify({ featured, arrivals, bestSellers }));
}

export async function getRelatedProducts(category: string, slug: string) {
  await connectToDatabase();
  const products = await Product.find({ category, slug: { $ne: slug } }).limit(4).lean();
  return JSON.parse(JSON.stringify(products));
}


export async function getProductsByName(name: string | string[] | undefined): Promise<any[]> {
  await connectToDatabase();
  const products = await Product.find({ name: { $regex: name, $options: "i" } }).limit(10).lean();
  return JSON.parse(JSON.stringify(products));
}