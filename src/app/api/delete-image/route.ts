import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/guards";
import { deleteImage } from "@/services/delete.image.service";

export async function POST(request: Request) {
  await requireAdmin();
  const { publicId } = await request.json();
  if (!publicId) return NextResponse.json({ message: "image not found" }, { status: 400 });
  return NextResponse.json(await deleteImage(publicId));
}
