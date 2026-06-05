import { connectToDatabase } from "@/lib/db";
import { Product } from "@/models/Product";
import { User } from "@/models/User";

export async function getUserProfile(userId: string) {
  await connectToDatabase();
  const user = await User.findById(userId).select("name email role phone image addresses createdAt").lean();
  return user ? JSON.parse(JSON.stringify(user)) : null;
}

export async function getUserWishlist(userId: string) {
  await connectToDatabase();
  const user = await User.findById(userId).select("wishlist").lean<{ wishlist?: string[] } | null>();
  const ids = user?.wishlist ?? [];
  const products = await Product.find({ _id: { $in: ids } }).lean();
  return JSON.parse(JSON.stringify(products));
}

export async function toggleUserWishlist(userId: string, productId: string) {
  await connectToDatabase();
  const user = await User.findById(userId).select("wishlist");
  if (!user) return { ids: [] };
  const ids = user.wishlist.map((id: { toString: () => string }) => id.toString());
  const exists = ids.includes(productId);
  user.wishlist = exists ? user.wishlist.filter((id: { toString: () => string }) => id.toString() !== productId) : [...user.wishlist, productId];
  await user.save();
  return { ids: user.wishlist.map((id: { toString: () => string }) => id.toString()) };
}
export async function getUserSearchHistory(userId: string) {
  await connectToDatabase();
  const history = await User.findById(userId)
  .select("searchHistory")
  .lean();
  return history ? JSON.parse(JSON.stringify(history)) : [];
}
