import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { User } from "@/models/User";
import { registerSchema } from "@/validators/auth";

export async function POST(request: Request) {
  const parsed = registerSchema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ message: "Invalid payload" }, { status: 400 });
  await connectToDatabase();
  if (await User.exists({ email: parsed.data.email })) return NextResponse.json({ message: "Email already exists" }, { status: 409 });
  await User.create({ ...parsed.data, password: await bcrypt.hash(parsed.data.password, 12) });
  return NextResponse.json({ ok: true }, { status: 201 });
}
