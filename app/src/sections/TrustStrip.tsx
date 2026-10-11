import { cn } from "@/lib/utils";

const statements = [
  { title: "Surplus food gets a second chance" },
  { title: "Students and locals access affordable meals" },
  { title: "The mess reduces avoidable waste" },
];

export function TrustStrip({ className }: { className?: string }) {
  return (
    <section className={cn("py-10 md:py-14 border-y border-border", className)}>
      <div className="container">
        <div className="grid gap-8 md:grid-cols-3 md:gap-6">
          {statements.map((s, i) => (
            <div
              key={s.title}
              className={cn(
                "flex flex-col items-start gap-2 md:px-4",
                i > 0 && "md:border-l md:border-border"
              )}
            >
              <div className="h-2 w-2 rounded-full bg-lime" />
              <p className="text-label text-charcoal font-medium leading-snug">
                {s.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
