import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { requireUser } from "@/lib/guards";
import { Review } from "@/models/Review";
import { reviewSchema } from "@/validators/review";

export async function POST(request: Request) {
  const session = await requireUser();
  const parsed = reviewSchema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ errors: parsed.error.flatten() }, { status: 400 });
  await connectToDatabase();
  const review = await Review.create({ ...parsed.data, product: parsed.data.productId, user: session.user.id });
  return NextResponse.json(review, { status: 201 });
}
