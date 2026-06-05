import { BadgeCheck, RefreshCcw, ShieldCheck, Truck } from "lucide-react";
import { SectionHeading } from "@/components/common/section-heading";

const items = [
  { title: "Premium Fabric", description: "Soft, breathable fabrics selected for year-round Bangladesh weather.", icon: BadgeCheck },
  { title: "Fast Delivery", description: "Nationwide shipping with clear order tracking.", icon: Truck },
  { title: "Easy Exchange", description: "Simple size exchange workflow for a better fit.", icon: RefreshCcw },
  { title: "Secure Checkout", description: "COD, bKash, and Nagad payment options.", icon: ShieldCheck }
];

export function WhyChooseUs() {
  return (
    <section className="bg-muted/50 py-12">
      <div className="container">
        <SectionHeading title="Why Choose Us" subtitle="Built for repeat purchases, not one-time hype." />
        <div className="grid gap-4 md:grid-cols-4">
          {items.map((item) => <div key={item.title} className="rounded-lg border bg-background p-5"><item.icon className="h-6 w-6 text-primary" /><h3 className="mt-4 font-semibold">{item.title}</h3><p className="mt-2 text-sm text-muted-foreground">{item.description}</p></div>)}
        </div>
      </div>
    </section>
  );
}
