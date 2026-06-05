"use server";

import { revalidatePath } from "next/cache";
import { requireUser } from "@/lib/guards";
import { createOrder } from "@/services/order.service";

export async function checkoutAction(payload: unknown) {
  const session = await requireUser();
  const order = await createOrder(session.user.id, payload);
  revalidatePath("/account/orders");
  return { ok: true, order };
}
