import Link from "next/link";
import { GoogleAuthButton } from "@/components/account/google-auth-button";
import { LoginForm } from "@/components/account/login-form";

export default function LoginPage() {
  return (
    <section className="container grid max-w-md gap-6 py-16">
      <div>
        <h1 className="text-3xl font-bold tracking-normal">Login</h1>
        <p className="mt-2 text-sm text-muted-foreground">Access orders, wishlist, and checkout.</p>
      </div>
      <GoogleAuthButton label="Sign in with Google" />
      <div className="flex items-center gap-3 text-xs text-muted-foreground">
        <div className="h-px flex-1 bg-border" />
        <span>or</span>
        <div className="h-px flex-1 bg-border" />
      </div>
      <LoginForm />
      <div className="grid gap-2 text-sm">
        <Link href="/register" className="text-primary">I don't have an account</Link>
        <Link href="/forgot-password" className="text-primary">Forgot password?</Link>
      </div>
    </section>
  );
}
