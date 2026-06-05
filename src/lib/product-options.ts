import type { Product, SizeInventory } from "@/types";

export function getProductImages(product: Product) {
  const variantImages = (product.variants ?? []).flatMap((variant) => (variant.images ?? []).map((image) => image.url));
  return variantImages.length > 0 ? variantImages : product.images ?? [];
}

export function getProductPrimaryImage(product: Product) {
  return getProductImages(product)[0] ?? "/logowhite.png";
}

export function getProductColors(product: Product) {
  const variantColors = (product.variants ?? []).map((variant) => ({
    name: variant.colorName,
    code: variant.colorCode
  }));

  if (variantColors.length > 0) return variantColors;

  return (product.colors ?? []).map((color) => ({
    name: color,
    code: color.startsWith("#") ? color : "#18181b"
  }));
}

export function getProductSizes(product: Product, colorName?: string): SizeInventory[] {
  const variants = colorName ? (product.variants ?? []).filter((variant) => variant.colorName === colorName) : product.variants ?? [];
  const sizes = new Map<string, SizeInventory>();

  variants.forEach((variant) => {
    variant.sizes.forEach((item) => {
      const existing = sizes.get(item.size);
      sizes.set(item.size, {
        size: item.size,
        stock: (existing?.stock ?? 0) + item.stock
      });
    });
  });

  const variantSizes = Array.from(sizes.values());
  return variantSizes.length > 0 ? variantSizes : product.sizes ?? [];
}

export function getProductTotalStock(product: Product) {
  const variantStock = (product.variants ?? []).reduce((total, variant) => total + variant.sizes.reduce((sum, item) => sum + item.stock, 0), 0);
  return variantStock || product.stock || (product.sizes ?? []).reduce((total, item) => total + item.stock, 0);
}
