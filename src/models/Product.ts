import { Schema, models, model } from "mongoose";

const sizeSchema = new Schema(
  {
    size: {
      type: String,
      required: true,
    },

    stock: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  { _id: false }
);

const imageSchema = new Schema(
  {
    url: {
      type: String,
      required: true,
    },

    publicId: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);

const variantSchema = new Schema(
  {
    colorName: {
      type: String,
      required: true,
    },

    colorCode: {
      type: String,
      required: true,
    },

    images: [imageSchema],

    sizes: [sizeSchema],
  },
  { _id: false }
);

const productSchema = new Schema({
  name: String,
  slug: String,
  description: String,

  category: String,
  subcategory: String,
  brand:{ String},

  variants: [variantSchema],

  price: Number,
  discountPrice: Number,

  rating: Number,
  reviewsCount: Number,

  featured: Boolean,
  bestSeller: Boolean,

  tags: [String]


}, { timestamps: true })

productSchema.index({ name: "text", description: "text", tags: "text" });

export const Product = models.Product || model("Product", productSchema);
