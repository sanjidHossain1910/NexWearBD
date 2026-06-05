import { connectToDatabase } from "@/lib/db";
import { Order } from "@/models/Order";
import { checkoutSchema } from "@/validators/order";
import type { CartItem } from "@/types";

export async function createOrder(userId: string, payload: unknown) {
  const data = checkoutSchema.parse(payload);
  await connectToDatabase();
  const subtotal = data.items.reduce((sum: number, item: CartItem) => sum + item.price * item.quantity, 0);
  const shippingFee = subtotal > 2500 ? 0 : 120;
  const total = subtotal + shippingFee;
  const order = await Order.create({
    user: userId,
    items: data.items.map((item) => ({ ...item, product: item.productId })),
    shippingAddress: data.shippingAddress,
    paymentMethod: data.paymentMethod,
    subtotal,
    shippingFee,
    total,
    couponCode: data.couponCode,
    trackingCode: `NXW-${Date.now().toString(36).toUpperCase()}`
  });
  return JSON.parse(JSON.stringify(order));
}

export async function getUserOrders(userId: string) {
  await connectToDatabase();
  const orders = await Order.find({ user: userId }).sort({ createdAt: -1 }).lean();
  return JSON.parse(JSON.stringify(orders));
}

export async function getOrderByTrackingCode(code: string) {
  await connectToDatabase();
  const order = await Order.findOne({ trackingCode: code }).lean();
  return order ? JSON.parse(JSON.stringify(order)) : null;
}
