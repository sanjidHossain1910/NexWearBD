import { cloudinary } from "@/config/cloudinary";

export async function deleteImage(publicId: string) {
  await cloudinary.uploader.destroy(publicId);
  return { message: "Image deleted successfully" };}

