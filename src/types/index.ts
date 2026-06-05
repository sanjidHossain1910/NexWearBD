import { orderStatuses, paymentMethods } from "@/constants";

export type Role = "user" | "admin";
export type OrderStatus = (typeof orderStatuses)[number];
export type PaymentMethod = (typeof paymentMethods)[number];

export type SizeInventory = {
  size: string;
  stock: number;
};

export type ProductImage = {
  url: string;
  publicId: string;
};

export type ProductVariant = {
  colorName: string;
  colorCode: string;
  images: ProductImage[];
  sizes: SizeInventory[];
};

export type Product = {
  _id?: string;
  name: string;
  slug: string;
  description: string;
  category: string;
  subcategory?: string;
  brand: string;
  price: number;
  discountPrice?: number;
  variants?: ProductVariant[];
  images?: string[];
  stock?: number;
  sizes?: SizeInventory[];
  colors?: string[];
  rating?: number;
  reviewsCount?: number;
  featured: boolean;
  bestSeller: boolean;
  tags: string[];
};

export type CartItem = {
  productId: string;
  name: string;
  slug: string;
  image: string;
  price: number;
  size: string;
  color: string;
  quantity: number;
};

export type RecentViewItem = {
  productId: string;
  slug: string;
  viewedAt: string;
};

export type RecentView = {
  userId: string;
  items: RecentViewItem[];
};

export interface RecentViewDoc {
  user: string;
  products: string[]; 
}
