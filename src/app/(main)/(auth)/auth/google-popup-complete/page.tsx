"use client";

import { useEffect } from "react";

export default function GooglePopupCompletePage() {
  useEffect(() => {
    window.opener?.postMessage("nexwear:google-auth-complete", window.location.origin);
    window.close();
  }, []);

  return (
    <main className="grid min-h-screen place-items-center p-6 text-center">
      <div>
        <h1 className="text-xl font-semibold">Google sign-in complete</h1>
        <p className="mt-2 text-sm text-muted-foreground">You can close this window.</p>
      </div>
    </main>
  );
}
