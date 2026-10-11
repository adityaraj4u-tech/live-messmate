import { cn } from "@/lib/utils";

const points = [
  {
    title: "Hygienic handling",
    body: "Food is prepared and held according to the mess’s existing kitchen standards.",
  },
  {
    title: "Transparent pickup times",
    body: "Every listing shows a clear pickup window so food is collected while fresh.",
  },
  {
    title: "Clear food details",
    body: "Dish name, allergens, and notes are visible before you reserve.",
  },
  {
    title: "Mess accountability",
    body: "One authorized mess owner per college is responsible for listings.",
  },
];

export function FoodSafety({ className }: { className?: string }) {
  return (
    <section id="food-safety" className={cn("py-16 md:py-24", className)}>
      <div className="container">
        <div className="max-w-2xl mb-10">
          <h2 className="text-heading text-forest font-semibold">
            Food safety & trust
          </h2>
          <p className="mt-2 text-body-sm text-muted">
            Clear information, no overpromising. We focus on transparency and
            practical care.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 gap-6 md:gap-8">
          {points.map((p) => (
            <div key={p.title}>
              <h3 className="text-label font-semibold text-charcoal">
                {p.title}
              </h3>
              <p className="mt-1.5 text-body-sm text-muted leading-relaxed">
                {p.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
