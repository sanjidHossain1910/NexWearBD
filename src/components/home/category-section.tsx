import Link from "next/link";
import { Shirt, Sparkles } from "lucide-react";
import { categories } from "@/constants";
import { SectionHeading } from "@/components/common/section-heading";

export function CategorySection() {
  return (
    <section className="container py-12">
      <SectionHeading title="Shop by Category" subtitle="Core menswear categories, curated for fit and comfort." />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category, index) => (
          <Link key={category} href={`/category/${category.toLowerCase().replaceAll(" ", "-")}`} className="flex items-center justify-between rounded-lg border p-5 transition-colors hover:bg-muted">
            <div>
              <h3 className="font-semibold">{category}</h3>
              <p className="mt-1 text-sm text-muted-foreground">Explore latest drops</p>
            </div>
            {index % 2 ? <Sparkles className="h-5 w-5 text-accent" /> : <Shirt className="h-5 w-5 text-primary" />}
          </Link>
        ))}
      </div>
    </section>
  );
}
