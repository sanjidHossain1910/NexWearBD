import { connectToDatabase } from "@/lib/db";
import { Product } from "@/models/Product";
import { Order } from "@/models/Order";
import { User } from "@/models/User";

export async function getDashboardStats() {
  await connectToDatabase();
  const [totalProducts, totalOrders, totalCustomers, revenue] = await Promise.all([
    Product.countDocuments(),
    Order.countDocuments(),
    User.countDocuments({ role: "user" }),
    Order.aggregate([{ $match: { status: { $ne: "Cancelled" } } }, { $group: { _id: null, total: { $sum: "$total" } } }])
  ]);
  return { totalProducts, totalOrders, totalCustomers, totalRevenue: revenue[0]?.total ?? 0 };
}

export async function getAdminRows(collection: "products" | "orders" | "customers") {
  await connectToDatabase();
  if (collection === "products") return JSON.parse(JSON.stringify(await Product.find().sort({ createdAt: -1 }).limit(25).lean()));
  if (collection === "orders") return JSON.parse(JSON.stringify(await Order.find().sort({ createdAt: -1 }).limit(25).lean()));
  return JSON.parse(JSON.stringify(await User.find().sort({ createdAt: -1 }).limit(25).lean()));
}
