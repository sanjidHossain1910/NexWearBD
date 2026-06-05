import Link from "next/link";
import { categories, colors, sizes } from "@/constants";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function ProductFilters({ basePath = "/shop" }: { basePath?: string }) {
  return (
    <aside className="rounded-lg border p-4">
      <h2 className="font-semibold">Filters</h2>
      <form action={basePath} className="mt-4 grid gap-4">
        <Input name="q" placeholder="Search products" />
        <div>
          <p className="mb-2 text-sm font-medium">Category</p>
          <div className="grid gap-1 text-sm text-muted-foreground">
            {categories.map((category) => <Link key={category} href={`/shop?category=${encodeURIComponent(category)}`}>{category}</Link>)}
          </div>
        </div>
        <div>
          <p className="mb-2 text-sm font-medium">Size</p>
          <div className="flex flex-wrap gap-2">{sizes.map((size) => <Button key={size} name="size" value={size} variant="outline" size="sm">{size}</Button>)}</div>
        </div>
        <div>
          <p className="mb-2 text-sm font-medium">Color</p>
          <div className="flex flex-wrap gap-2">{colors.map((color) => <Button key={color} name="color" value={color} variant="outline" size="sm">{color}</Button>)}</div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <Input name="min" placeholder="Min" type="number" />
          <Input name="max" placeholder="Max" type="number" />
        </div>
        <Button type="submit">Apply</Button>
      </form>
    </aside>
  );
}
