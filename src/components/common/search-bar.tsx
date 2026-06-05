import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Product } from "@/types";

export function SearchBar({ products }: { products?: Product[] }) {


  return (
    <div className="flex gap-3 items-center">
      <p>Result {products?.length ?? 0}</p>
      <Button>Filter</Button>
    </div>
  );
}
