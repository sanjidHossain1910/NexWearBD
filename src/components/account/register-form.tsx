"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { registerAction } from "@/actions/auth.actions";

export function RegisterForm() {
  const [state, action, pending] = useActionState(registerAction, null);
  return (
    <form action={action} className="grid gap-4">
      <div><Label>Name</Label><Input name="name" /></div>
      <div><Label>Email</Label><Input name="email" type="email" /></div>
      <div><Label>Password</Label><Input name="password" type="password" /></div>
      {state?.message && <p className="text-sm text-destructive">{state.message}</p>}
      <Button disabled={pending}>Create Account</Button>
    </form>
  );
}
