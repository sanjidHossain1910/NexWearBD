import { SectionHeading } from "@/components/common/section-heading";

const reviews = [
  ["Arif H.", "The oversized tees fit exactly how I wanted. Heavy enough to feel premium, still comfortable."],
  ["Tanvir R.", "Ordered a Panjabi for Eid. Clean stitching, fast delivery, and the color matched the photos."],
  ["Mahmud S.", "Finally a local menswear store where basics do not feel basic."]
];

export function CustomerReviews() {
  return (
    <section className="container py-12">
      <SectionHeading title="Customer Reviews" subtitle="What Nexwear customers are saying." />
      <div className="grid gap-4 md:grid-cols-3">
        {reviews.map(([name, text]) => <blockquote key={name} className="rounded-lg border p-5"><p className="text-sm text-muted-foreground">"{text}"</p><footer className="mt-4 font-semibold">{name}</footer></blockquote>)}
      </div>
    </section>
  );
}
