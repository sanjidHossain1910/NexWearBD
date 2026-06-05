import { Star } from "lucide-react";

export function ReviewSection({ rating, reviewsCount }: { rating: number; reviewsCount: number }) {
  return (
    <section className="rounded-lg border p-6">
      <h2 className="text-xl font-semibold">Customer Reviews</h2>
      <div className="mt-3 flex items-center gap-2">
        <Star className="h-5 w-5 fill-current text-amber-500" />
        <span className="font-medium">{rating}/5</span>
        <span className="text-sm text-muted-foreground">from {reviewsCount} reviews</span>
      </div>
      <p className="mt-4 text-sm text-muted-foreground">Verified purchase reviews appear here after customers submit feedback.</p>
    </section>
  );
}
