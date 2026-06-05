"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { checkoutAction } from "@/actions/order.actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { paymentMethods } from "@/constants";
import { checkoutSchema } from "@/validators/order";
import { useCartStore } from "@/store/cart-store";

type CheckoutValues = z.infer<typeof checkoutSchema>;

export function CheckoutForm() {
  const router = useRouter();
  const { items, clear } = useCartStore();
  const form = useForm<CheckoutValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: { items, paymentMethod: "Cash On Delivery", shippingAddress: { fullName: "", phone: "", district: "", area: "", fullAddress: "" } }
  });
  async function onSubmit(values: CheckoutValues) {
    const result = await checkoutAction({ ...values, items });
    if (result.ok) {
      clear();
      router.push(`/account/orders`);
    }
  }
  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <div><Label>Full Name</Label><Input {...form.register("shippingAddress.fullName")} /></div>
        <div><Label>Phone</Label><Input {...form.register("shippingAddress.phone")} /></div>
        <div><Label>District</Label><Input {...form.register("shippingAddress.district")} /></div>
        <div><Label>Area</Label><Input {...form.register("shippingAddress.area")} /></div>
      </div>
      <div><Label>Full Address</Label><Input {...form.register("shippingAddress.fullAddress")} /></div>
      <div>
        <Label>Payment Method</Label>
        <div className="mt-2 flex flex-wrap gap-2">
          {paymentMethods.map((method) => <Button key={method} type="button" variant={form.watch("paymentMethod") === method ? "default" : "outline"} onClick={() => form.setValue("paymentMethod", method)}>{method}</Button>)}
        </div>
      </div>
      <Button disabled={!items.length} type="submit">Place Order</Button>
    </form>
  );
}
