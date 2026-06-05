"use server";

import { Product } from "@/models/Product";
import { connectToDatabase } from "@/lib/db";

export async function getRecentlyViewedProductsByIds(
  ids: string[]
) {
  await connectToDatabase();
  const products = await Product.find({
    _id: { $in: ids },
  });

  const orderedProducts = ids
    .map((id) =>
      products.find(
        (product) =>
          product._id.toString() === id
      )
    )
    .filter(Boolean);

  return JSON.parse(
    JSON.stringify(orderedProducts)
  );
}