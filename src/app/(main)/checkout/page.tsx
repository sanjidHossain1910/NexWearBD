import { CheckoutForm } from "@/components/checkout/checkout-form";
import { requireUser } from "@/lib/guards";

export default async function CheckoutPage() {
  await requireUser();
  return <section className="container max-w-3xl py-10"><h1 className="text-3xl font-bold tracking-normal">Checkout</h1><div className="mt-8"><CheckoutForm /></div></section>;
}
