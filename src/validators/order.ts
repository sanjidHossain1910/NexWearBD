import { z } from "zod";
import { paymentMethods } from "@/constants";

export const shippingAddressSchema = z.object({
  fullName: z.string().min(2),
  phone: z.string().min(8),
  district: z.string().min(2),
  area: z.string().min(2),
  fullAddress: z.string().min(8)
});

export const checkoutSchema = z.object({
  shippingAddress: shippingAddressSchema,
  paymentMethod: z.enum(paymentMethods),
  couponCode: z.string().optional(),
  items: z.array(
    z.object({
      productId: z.string(),
      name: z.string(),
      slug: z.string(),
      image: z.string(),
      price: z.number(),
      size: z.string(),
      color: z.string(),
      quantity: z.number().int().positive()
    })
  )
});
