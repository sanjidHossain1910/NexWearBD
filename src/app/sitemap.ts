import type { MetadataRoute } from "next";
import { categories } from "@/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
  return [
    "", "/shop", "/cart", "/checkout", "/login", "/register", "/about", "/contact",
    ...categories.map((category) => `/category/${category.toLowerCase().replaceAll(" ", "-")}`)
  ].map((path) => ({ url: `${baseUrl}${path}`, lastModified: new Date() }));
}
