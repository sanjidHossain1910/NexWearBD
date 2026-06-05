"use server";

import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { connectToDatabase } from "@/lib/db";
import { User } from "@/models/User";
import { registerSchema } from "@/validators/auth";

export async function registerAction(_: unknown, formData: FormData) {
  const parsed = registerSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { ok: false, message: parsed.error.errors[0]?.message ?? "Invalid registration details" };
  await connectToDatabase();
  const exists = await User.exists({ email: parsed.data.email });
  if (exists) return { ok: false, message: "Email is already registered" };
  const password = await bcrypt.hash(parsed.data.password, 12);
  await User.create({ ...parsed.data, password });
  redirect("/login");
}
