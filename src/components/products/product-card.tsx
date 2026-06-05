"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, Minus, Plus, ShoppingBag, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { formatCurrency } from "@/lib/utils";
import { useCartStore } from "@/store/cart-store";
import { useWishlistStore } from "@/store/wishlist-store";
import type { Product } from "@/types";
import { useAppSelector } from "@/store/redux-hooks";
import { getProductColors, getProductPrimaryImage, getProductSizes, getProductTotalStock } from "@/lib/product-options";


export function ProductCard({ product }: { product: Product & { _id: string } }) {
  const { addItem, decrementProduct, getProductQuantity } = useCartStore();
  const [open, setOpen] = useState(false);
  const [notAuthOpen, setNotAuthOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const wishlistIds = useWishlistStore((state) => state.ids);
  const hydrateWishlist = useWishlistStore((state) => state.hydrate);
  const toggleWishlist = useWishlistStore((state) => state.toggle);
  const price = product.discountPrice ?? product.price;
  const hasDiscount = typeof product.discountPrice === "number" && product.discountPrice < product.price;
  const discountPercent = hasDiscount ? Math.round(((product.price - price) / product.price) * 100) : 0;
  const cartQuantity = getProductQuantity(product._id);
  const image = getProductPrimaryImage(product);
  const colors = getProductColors(product);
  const sizes = getProductSizes(product, selectedColor);
  const totalStock = getProductTotalStock(product);
  const canAddToCart = Boolean(selectedSize && selectedColor && totalStock > 0);
  const { isAuthenticated } = useAppSelector((state) => state.user);

  useEffect(() => {
    void hydrateWishlist();
  }, [hydrateWishlist]);



  const handleAddToCart = () => {
    if (isAuthenticated) {
      setOpen(true)
    } else {
      setNotAuthOpen(true)
    }
  }
  const handleAddWishlist = () => {
    if (isAuthenticated) {
      toggleWishlist(product._id)
    } else {
      setNotAuthOpen(true)
    }
  }




  function addSelectedItem() {
    if (!canAddToCart) return;
    addItem({
      productId: product._id,
      name: product.name,
      slug: product.slug,
      image,
      price,
      size: selectedSize,
      color: selectedColor,
      quantity: 1
    });
    setOpen(false);
  }

  return (
    <>
      <article className="group flex h-full w-full flex-col overflow-hidden rounded-lg border bg-card">
        <Link href={`/product/${product.slug}`} className="relative block aspect-[4/5] bg-muted">
          <Image src={image} alt={product.name} fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover transition-transform group-hover:scale-105" />
          {hasDiscount && <Badge className="absolute left-3 top-3 bg-accent text-accent-foreground">{discountPercent}% OFF</Badge>}
        </Link>
        <div className="flex flex-1 flex-col gap-3 p-3 sm:p-4">
          <div>
            <Link href={`/product/${product.slug}`} className="line-clamp-2 text-sm font-semibold hover:text-primary sm:text-base">{product.name}</Link>
            <div className="mt-1 flex items-center gap-1 text-[11px] text-muted-foreground sm:text-xs">
              <Star className="h-3.5 w-3.5 fill-current text-amber-500" /> {product.rating ?? 0} ({product.reviewsCount ?? 0})
            </div>
            <p className="mt-1 text-xs text-muted-foreground">{product.category} • {totalStock > 0 ? `${totalStock} in stock` : "Out of stock"}</p>
          </div>
          <div className="mt-auto grid gap-2">
            <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
              <p className="text-sm font-bold text-primary sm:text-base">{formatCurrency(price)}</p>
              {hasDiscount && <p className="text-xs text-muted-foreground line-through sm:text-sm">{formatCurrency(product.price)}</p>}
            </div>
            <div className="flex gap-1">
              <Button variant="ghost" size="icon" className="h-9 w-9 shrink-0 sm:h-10 sm:w-10" onClick={() => handleAddWishlist()} aria-label="Wishlist">
                <Heart className={wishlistIds.includes(product._id) ? "h-4 w-4 fill-current text-accent" : "h-4 w-4"} />
              </Button>
              {cartQuantity > 0 ? (
                <div className="flex h-9 min-w-0 flex-1 items-center overflow-hidden rounded-md border sm:h-10">
                  <Button variant="ghost" size="icon" className="h-9 w-8 shrink-0 sm:h-10 sm:w-10" onClick={() => decrementProduct(product._id)} aria-label="Decrease quantity"><Minus className="h-4 w-4" /></Button>
                  <span className="min-w-6 flex-1 text-center text-sm font-semibold">{cartQuantity}</span>
                  <Button variant="ghost" size="icon" className="h-9 w-8 shrink-0 sm:h-10 sm:w-10" onClick={() => setOpen(true)} aria-label="Add another"><Plus className="h-4 w-4" /></Button>
                </div>
              ) : (
                <Button size="icon" className="h-9 flex-1 px-1 sm:h-10 sm:px-2" onClick={() => handleAddToCart()} aria-label="Choose size and color" disabled={totalStock === 0}>Add to cart<ShoppingBag className="h-4 w-4" /></Button>
              )}
            </div>
          </div>
        </div>
      </article>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogTitle>Choose size and color</DialogTitle>
          <DialogDescription>Select your preferred option before adding this product to cart.</DialogDescription>
          <div className="mt-5 grid gap-5">
            <div>
              <p className="mb-2 text-sm font-medium">Size</p>
              <div className="flex flex-wrap gap-2">
                {sizes.map((item) => (
                  <Button key={item.size} type="button" variant={selectedSize === item.size ? "default" : "outline"} disabled={item.stock === 0} onClick={() => setSelectedSize(item.size)}>
                    {item.size}
                  </Button>
                ))}
              </div>
            </div>
            <div>
              <p className="mb-2 text-sm font-medium">Color</p>
              <div className="flex flex-wrap gap-2">
                {colors.map((color) => (
                  <Button key={color.name} type="button" variant={selectedColor === color.name ? "default" : "outline"} onClick={() => {
                    setSelectedColor(color.name);
                    setSelectedSize("");
                  }}>
                    <span className="h-3 w-3 rounded-full border" style={{ backgroundColor: color.code }} aria-hidden="true" />
                    {color.name}
                  </Button>
                ))}
              </div>
            </div>
            <Button type="button" disabled={!canAddToCart} onClick={addSelectedItem}>
              Add to Cart
            </Button>
          </div>
        </DialogContent>
      </Dialog>


      <Dialog open={notAuthOpen} onOpenChange={setNotAuthOpen}>
        <DialogContent>
          <DialogTitle>Login required</DialogTitle>
          <DialogDescription>Please login to add this product to cart.</DialogDescription>
          <div className="mt-5 grid gap-3">
            <Button asChild onClick={() => setNotAuthOpen(false)}>Cancel</Button>
            <Button asChild><Link href="/login">Login</Link></Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
