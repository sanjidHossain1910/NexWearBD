import { Schema, models, model } from "mongoose";

const bannerSchema = new Schema(
  {
    title: { type: String, required: true },
    subtitle: String,
    image: { type: String, required: true },
    href: String,
    placement: { type: String, enum: ["hero", "category", "promo"], default: "hero" },
    isActive: { type: Boolean, default: true },
    sortOrder: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export const Banner = models.Banner || model("Banner", bannerSchema);
