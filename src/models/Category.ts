import { Schema, models, model } from "mongoose";

const categorySchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true },
    image: String,
    description: String,
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export const Category = models.Category || model("Category", categorySchema);
