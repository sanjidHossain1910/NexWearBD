import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Newsletter() {
  return (
    <section className="container py-12">
      <div className="grid gap-5 rounded-lg border bg-primary p-8 text-primary-foreground md:grid-cols-[1fr_420px] md:items-center">
        <div>
          <Mail className="h-7 w-7" />
          <h2 className="mt-3 text-2xl font-bold tracking-normal">Get first access to new drops</h2>
          <p className="mt-2 text-sm text-primary-foreground/80">New arrivals, offers, and style edits from Nexwear.</p>
        </div>
        <form className="flex gap-2">
          <Input type="email" placeholder="Email address" className="bg-white text-foreground" />
          <Button variant="secondary">Subscribe</Button>
        </form>
      </div>
    </section>
  );
}
