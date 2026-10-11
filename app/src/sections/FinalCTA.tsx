"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui";
import { cn } from "@/lib/utils";

export function FinalCTA({ className }: { className?: string }) {
  const router = useRouter();

  return (
    <section className={cn("bg-forest-deep text-ivory py-20 md:py-28", className)}>
      <div className="container text-center max-w-2xl">
        <h2 className="text-heading md:text-display-sm font-semibold leading-tight">
          Make your next meal matter.
        </h2>
        <p className="mt-4 text-body-sm text-ivory/70">
          Reserve surplus food from campus. Simple, affordable, and good for the
          community.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button size="lg" onClick={() => router.push("/discover")}>
            Explore Available Food
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => router.push("/owner/login")}
            className="border-ivory/30 text-ivory hover:bg-ivory/10"
          >
            For Mess Owners
          </Button>
        </div>
      </div>
    </section>
  );
}
