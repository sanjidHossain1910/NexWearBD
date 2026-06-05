import { SearchBar } from "@/components/common/search-bar";
import { ProductGrid } from "@/components/products/product-grid";
import { getProducts } from "@/services/product.service";
import { getProductsByName } from "@/services/product.service";
import React from 'react'

export default async function SearchResults({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {

  const params = await searchParams;
  const { p } = params;
  const products = await getProductsByName(p);
  return (
    <section className="container py-10">
      <h1 className="text-3xl font-bold tracking-normal">Search</h1>
      <div className="mt-5 max-w-xl"><SearchBar products={products}/></div>
      <div className="mt-8"><ProductGrid products={products} /></div>
    </section>
  )
}

