import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ForgotPasswordPage() {
  return <section className="container grid max-w-md gap-6 py-16"><h1 className="text-3xl font-bold tracking-normal">Forgot Password</h1><form className="grid gap-4"><div><Label>Email</Label><Input type="email" /></div><Button>Send Reset Link</Button></form></section>;
}
