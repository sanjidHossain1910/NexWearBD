import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ResetPasswordPage() {
  return <section className="container grid max-w-md gap-6 py-16"><h1 className="text-3xl font-bold tracking-normal">Reset Password</h1><form className="grid gap-4"><div><Label>New Password</Label><Input type="password" /></div><Button>Update Password</Button></form></section>;
}
