import mongoose, { Schema, model, models } from "mongoose";

const RecentViewSchema = new Schema({
  user: { type: String, required: true },
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
});
const RecentView =
  models.RecentView || model("RecentView", RecentViewSchema);

export default RecentView;