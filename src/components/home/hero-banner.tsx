import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroBanner() {
  return (
    <section className="relative overflow-hidden bg-stone-950 text-white">
      <Image src="https://images.unsplash.com/photo-1516257984-b1b4d707412e?q=80&w=1800&auto=format&fit=crop" alt="Nexwear menswear collection" fill priority className="object-cover opacity-55" />
      <div className="container relative grid min-h-[620px] content-center py-20">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary">New season essentials</p>
          <h1 className="mt-4 text-5xl font-bold tracking-normal md:text-7xl">Nexwear</h1>
          <p className="mt-5 max-w-xl text-lg text-white/85">Modern men's fashion built for everyday comfort, clean silhouettes, and confident Bangladeshi street style.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button size="lg" asChild><Link href="/shop">Shop Collection <ArrowRight className="h-4 w-4" /></Link></Button>
            <Button size="lg" variant="secondary" asChild><Link href="/category/panjabi">Explore Panjabi</Link></Button>
          </div>
        </div>
      </div>
    </section>
  );
}
