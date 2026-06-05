import { Schema, models, model } from "mongoose";

const reviewSchema = new Schema(
  {
    product: { type: Schema.Types.ObjectId, ref: "Product", required: true, index: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    title: String,
    comment: { type: String, required: true },
    isApproved: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export const Review = models.Review || model("Review", reviewSchema);
