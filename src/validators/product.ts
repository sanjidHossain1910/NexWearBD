import { z } from "zod";

// ----------------- SIZE -----------------
const sizeSchema = z.object({
  size: z.string().min(1),
  stock: z.coerce.number().int().nonnegative(),
});

// ----------------- IMAGE -----------------
const imageSchema = z.object({
  url: z.string().url(),
  publicId: z.string().min(1),
});

// ----------------- VARIANT -----------------
const variantSchema = z.object({
  colorName: z.string().min(1),
  colorCode: z.string().min(1), // you can later refine to hex regex
  images: z.array(imageSchema).min(1),
  sizes: z.array(sizeSchema).min(1),
});

// ----------------- PRODUCT -----------------
export const productSchema = z.object({
  name: z.string().min(2),
  slug: z.string().min(2),
  description: z.string().min(10),

  category: z.string().min(1),
  subcategory: z.string().optional(),

  brand: z.string().default("Nexwear"),

  variants: z.array(variantSchema).min(1),

  price: z.coerce.number().nonnegative(),
  discountPrice: z.coerce.number().nonnegative().optional(),

  rating: z.coerce.number().min(0).max(5).optional(),
  reviewsCount: z.coerce.number().int().nonnegative().optional(),

  featured: z.boolean().default(false),
  bestSeller: z.boolean().default(false),

  tags: z.array(z.string()).default([]),
});

// ----------------- PRODUCT QUERY -----------------
export const productQuerySchema = z.object({
  q: z.string().trim().optional(),
  category: z.string().trim().optional(),
  size: z.string().trim().optional(),
  color: z.string().trim().optional(),
  min: z.coerce.number().nonnegative().optional(),
  max: z.coerce.number().nonnegative().optional(),
  sort: z.enum(["newest", "price-asc", "price-desc", "rating"]).default("newest"),
  page: z.coerce.number().int().positive().default(1),
});
