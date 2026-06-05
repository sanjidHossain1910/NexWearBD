import { Schema, models, model } from "mongoose";

const addressSchema = new Schema(
  {
    fullName: String,
    phone: String,
    district: String,
    area: String,
    fullAddress: String
  },
  { _id: false }
);

const userSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, select: false },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    phone: String,
    image: String,
    searchHistory: [
      {
        type: String,
        trim: true,
      },
    ],
    wishlist: [{ type: Schema.Types.ObjectId, ref: "Product" }],
    addresses: [addressSchema],
    resetToken: String,
    resetTokenExpires: Date
  },
  { timestamps: true }
);

export const User = models.User || model("User", userSchema);
