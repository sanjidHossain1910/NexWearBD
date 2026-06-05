import { Schema, models, model } from "mongoose";
import { orderStatuses, paymentMethods } from "@/constants";

const orderItemSchema = new Schema(
  {
    product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    name: String,
    slug: String,
    image: String,
    price: Number,
    size: String,
    color: String,
    quantity: Number
  },
  { _id: false }
);

const shippingAddressSchema = new Schema(
  {
    fullName: { type: String, required: true },
    phone: { type: String, required: true },
    district: { type: String, required: true },
    area: { type: String, required: true },
    fullAddress: { type: String, required: true }
  },
  { _id: false }
);

const orderSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    items: [orderItemSchema],
    shippingAddress: shippingAddressSchema,
    paymentMethod: { type: String, enum: paymentMethods, required: true },
    paymentStatus: { type: String, enum: ["Unpaid", "Paid", "Refunded"], default: "Unpaid" },
    status: { type: String, enum: orderStatuses, default: "Pending" },
    subtotal: Number,
    shippingFee: Number,
    discount: { type: Number, default: 0 },
    total: Number,
    couponCode: String,
    trackingCode: { type: String, index: true }
  },
  { timestamps: true }
);

export const Order = models.Order || model("Order", orderSchema);
