import { brand } from "@/lib/tokens";
import { cn } from "@/lib/utils";

export function Mission({ className }: { className?: string }) {
  return (
    <section className={cn("py-20 md:py-28", className)}>
      <div className="container max-w-2xl text-center">
        <h2 className="text-heading md:text-display-sm text-forest font-semibold leading-tight">
          {brand.mission}
        </h2>
        <p className="mt-6 text-body text-muted leading-relaxed">
          Every day, campus messes prepare more food than is eaten. MessMate
          gives that food a second life — connecting students and nearby locals
          with affordable, well-prepared meals while helping the mess reduce
          waste. Simple, respectful, and built for community.
        </p>
      </div>
    </section>
  );
}
