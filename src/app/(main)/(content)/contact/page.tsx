import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function ContactPage() {
  return <section className="container max-w-2xl py-12"><h1 className="text-4xl font-bold tracking-normal">Contact</h1><form className="mt-8 grid gap-4"><div><Label>Name</Label><Input /></div><div><Label>Email</Label><Input type="email" /></div><div><Label>Message</Label><Textarea /></div><Button>Send Message</Button></form></section>;
}
