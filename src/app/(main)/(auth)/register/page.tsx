import Link from "next/link";
import { GoogleAuthButton } from "@/components/account/google-auth-button";
import { RegisterForm } from "@/components/account/register-form";

export default function RegisterPage() {
  return (
    <section className="container grid max-w-md gap-6 py-16">
      <div>
        <h1 className="text-3xl font-bold tracking-normal">Create Account</h1>
        <p className="mt-2 text-sm text-muted-foreground">Join Nexwear for faster checkout.</p>
      </div>
      <GoogleAuthButton label="Sign up with Google" />
      <div className="flex items-center gap-3 text-xs text-muted-foreground">
        <div className="h-px flex-1 bg-border" />
        <span>or</span>
        <div className="h-px flex-1 bg-border" />
      </div>
      <RegisterForm />
      <Link href="/login" className="text-sm text-primary">Already have an account?</Link>
    </section>
  );
}
