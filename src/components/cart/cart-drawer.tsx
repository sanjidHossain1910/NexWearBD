"use client";

import Link from "next/link";
import Image from "next/image";
import { ReactNode, useEffect, useState } from "react";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger, DialogClose} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/lib/utils";
import { useCartStore } from "@/store/cart-store";
import type { CartItem, Product } from "@/types";
import { useAppSelector } from "@/store/redux-hooks";
import { getProductColors, getProductSizes } from "@/lib/product-options";



export function CartDrawer({ trigger }: { trigger: ReactNode }) {
  const { items, hydrateFromDatabase, addItem, decrementItem, removeItem, total } = useCartStore();
  const [pickerOpen, setPickerOpen] = useState(false);
  const [pickerItem, setPickerItem] = useState<CartItem | null>(null);
  const [productOptions, setProductOptions] = useState<{ sizes: { size: string; stock: number }[]; colors: string[] } | null>(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const { isAuthenticated } = useAppSelector((state) => state.user);

  useEffect(() => {
    void hydrateFromDatabase();
  }, [hydrateFromDatabase]);

  async function openVariantPicker(item: CartItem) {
    setPickerItem(item);
    setSelectedSize("");
    setSelectedColor("");
    setProductOptions({ sizes: [{ size: item.size, stock: item.quantity }], colors: [item.color] });
    setPickerOpen(true);

    try {
      const response = await fetch(`/api/products/${item.slug}`);
      if (!response.ok) return;
      const product = (await response.json()) as Product;
      setProductOptions({ sizes: getProductSizes(product), colors: getProductColors(product).map((color) => color.name) });
    } catch {
      // The current item's selected variant remains available as fallback.
    }
  }

  function addSelectedVariant() {
    if (!pickerItem || !selectedSize || !selectedColor) return;
    addItem({ ...pickerItem, size: selectedSize, color: selectedColor, quantity: 1 });
    setPickerOpen(false);
  }



  return (
    <>
      <Dialog>
        <DialogTrigger asChild>{trigger}</DialogTrigger>
        {isAuthenticated ? (<DialogContent className="left-auto right-0 top-0 h-full w-[80vw] max-w-[80vw] translate-x-0 translate-y-0 rounded-none sm:w-full sm:max-w-md">
          <DialogTitle>Your Cart</DialogTitle>
          <div className="mt-4 grid gap-4">
            {items.length === 0 && <p className="text-sm text-muted-foreground">Your cart is empty.</p>}
            {items.map((item) => {
              const key = `${item.productId}:${item.size}:${item.color}`;
              return (
                <div key={key} className="flex gap-3">
                  <div className="relative h-20 w-16 overflow-hidden rounded-md bg-muted">
                    <Image src={item.image} alt={item.name} fill sizes="64px" className="object-cover" />
                  </div>
                  <div className="flex-1 text-sm">
                    <p className="font-medium">{item.name}</p>
                    <p className="text-muted-foreground">{item.size} / {item.color}</p>
                    <p>{formatCurrency(item.price * item.quantity)}</p>
                    <div className="mt-2 flex h-8 w-fit items-center overflow-hidden rounded-md border">
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => decrementItem(key)} aria-label="Decrease quantity">
                        <Minus className="h-3.5 w-3.5" />
                      </Button>
                      <span className="min-w-8 text-center text-sm font-semibold">{item.quantity}</span>
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openVariantPicker(item)} aria-label="Choose size and color">
                        <Plus className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => removeItem(key)} aria-label="Remove item"><Trash2 className="h-4 w-4" /></Button>
                </div>
              );
            })}
          </div>
          <Separator className="my-4" />
          <div className="flex items-center justify-between font-semibold">
            <span>Total</span>
            <span>{formatCurrency(total())}</span>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <Button variant="outline" asChild><Link href="/cart">Cart</Link></Button>
            <Button asChild><Link href="/checkout">Checkout</Link></Button>
          </div>
        </DialogContent>)
        : (<DialogContent className="left-auto right-0 top-0 h-full w-[80vw] max-w-[80vw] translate-x-0 translate-y-0 rounded-none sm:w-full sm:max-w-md">
          <DialogTitle>Your Cart</DialogTitle>
          <div className="flex flex-col h-full w-full justify-center items-center">
            <h1>Please login to access your cart.</h1>
            <DialogClose asChild>
              <Button asChild><Link href="/login">Login</Link></Button>
            </DialogClose>
          </div>
        </DialogContent>)}
      </Dialog>

      <Dialog open={pickerOpen} onOpenChange={setPickerOpen}>
        <DialogContent>
          <DialogTitle>Choose size and color</DialogTitle>
          <DialogDescription>Select a variant before increasing the cart quantity.</DialogDescription>
          <div className="mt-5 grid gap-5">
            <div>
              <p className="mb-2 text-sm font-medium">Size</p>
              <div className="flex flex-wrap gap-2">
                {(productOptions?.sizes ?? []).map((item) => (
                  <Button key={item.size} type="button" variant={selectedSize === item.size ? "default" : "outline"} onClick={() => setSelectedSize(item.size)}>
                    {item.size}
                  </Button>
                ))}
              </div>
            </div>
            <div>
              <p className="mb-2 text-sm font-medium">Color</p>
              <div className="flex flex-wrap gap-2">
                {(productOptions?.colors ?? []).map((color) => (
                  <Button key={color} type="button" variant={selectedColor === color ? "default" : "outline"} onClick={() => setSelectedColor(color)}>
                    {color}
                  </Button>
                ))}
              </div>
            </div>
            <Button type="button" disabled={!selectedSize || !selectedColor} onClick={addSelectedVariant}>
              Add Selected Variant
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
