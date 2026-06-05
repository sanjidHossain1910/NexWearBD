"use client";

import { signIn } from "next-auth/react";
import { useEffect } from "react";

export default function GooglePopupStartPage() {
  useEffect(() => {
    void signIn("google", { callbackUrl: "/auth/google-popup-complete" });
  }, []);

  return (
    <main className="grid min-h-screen place-items-center p-6 text-center">
      <div>
        <h1 className="text-xl font-semibold">Opening Google</h1>
        <p className="mt-2 text-sm text-muted-foreground">Continue in the Google account window.</p>
      </div>
    </main>
  );
}
