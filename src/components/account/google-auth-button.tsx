"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
export function GoogleAuthButton({ label = "Continue with Google" }: { label?: string }) {
  const [loading, setLoading] = useState(false);

  function continueWithGoogle() {
    setLoading(true);
    void signIn("google", { callbackUrl: "/" });
  }

  return (
    <Button type="button" variant="outline" className="w-full" onClick={continueWithGoogle} disabled={loading}>
      <FcGoogle />
      {loading ? "Opening Google..." : label}
    </Button>
  );
}
