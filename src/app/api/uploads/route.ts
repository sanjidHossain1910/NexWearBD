import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/guards";
import { uploadImage } from "@/services/upload.service";

export async function POST(request: Request) {
  await requireAdmin();
  const { dataUri, folder } = await request.json();
  if (!dataUri) return NextResponse.json({ message: "dataUri is required" }, { status: 400 });
  return NextResponse.json(await uploadImage(dataUri, folder));
}
