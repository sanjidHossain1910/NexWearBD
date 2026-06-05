"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginSchema } from "@/validators/auth";
import { useAppDispatch, useAppSelector } from "@/store/redux-hooks";
import { setUser } from "@/store/slices/user-slice";

export function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  const form = useForm<z.infer<typeof loginSchema>>({ resolver: zodResolver(loginSchema), defaultValues: { email: "", password: "" } });
  async function onSubmit(values: z.infer<typeof loginSchema>) {
    setError("");
    setLoading(true);
    const result = await signIn("credentials", { ...values, redirect: false });
    if (result?.error)
      {setError("Invalid email or password"); setLoading(false); return;}
    else {
      router.push("/");
      router.refresh();
    };
    setLoading(false);
  }



  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
      <div><Label>Email</Label><Input type="email" {...form.register("email")} /></div>
      <div><Label>Password</Label><Input type="password" {...form.register("password")} /></div>
      {error && <p className="text-sm text-destructive">{error}</p>}
      <Button type="submit" disabled={loading}>Login</Button>
    </form>
  );
}
