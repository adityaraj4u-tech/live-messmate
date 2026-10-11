import { cn } from "@/lib/utils";

const steps = [
  { n: "01", title: "Share", body: "The mess lists surplus food with price, portions, and pickup time." },
  { n: "02", title: "Reserve", body: "Customers reserve a portion without creating an account." },
  { n: "03", title: "Collect", body: "Customers collect food during the selected pickup window." },
];

export function HowItWorks({ className }: { className?: string }) {
  return (
    <section id="how-it-works" className={cn("py-16 md:py-24", className)}>
      <div className="container">
        <h2 className="text-heading text-forest font-semibold text-center mb-12 md:mb-16">
          How it works
        </h2>
        <div className="grid gap-10 md:grid-cols-3 md:gap-8 relative">
          {steps.map((step, i) => (
            <div key={step.n} className="relative flex flex-col items-start">
              <span className="text-display-sm font-bold text-sage leading-none select-none">
                {step.n}
              </span>
              <h3 className="mt-3 text-heading-sm text-forest font-semibold">
                {step.title}
              </h3>
              <p className="mt-2 text-body-sm text-muted leading-relaxed max-w-xs">
                {step.body}
              </p>
              {i < steps.length - 1 && (
                <div
                  className="hidden md:block absolute top-6 left-[calc(100%+0.5rem)] w-[calc(100%-2rem)] h-px bg-border"
                  aria-hidden="true"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
